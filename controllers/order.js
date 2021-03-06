const { validationResult } = require("express-validator");
const moment = require("moment");
const Razorpay = require("razorpay");
const uuid = require("uuid");
const db = require("../db");
const { sendOtp, bookingConfirmation, cancelBooking } = require("../msg91");
const {
  createOrder,
  cancelOrder,
  bookingOtps,
  checkOtp,
  updateUserOtpField,
  updateOrderUnlocked,
  updateOrderPaymentConfirmed,
  updateUserActiveOrders,
} = require("../queries/order");
const { razorpayKeyId, razorpayKeySecret } = process.env;

module.exports = {
  async restaurantBooking(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    //check otp validity

    const otp = req.body.otp;

    const getUser = await db.query({
      query: checkOtp,
      variables: {
        id: req.user.id,
      },
    });

    if (getUser.data.users.length <= 0) {
      // return res
      //   .status(404)
      //   .json({ errors: [{ msg: "Otp is invalid or Expired" }] });
      return res.send({ errors });
    }

    const isOtpMatched = otp === getUser.data.users[0].bookingOtp;

    if (!isOtpMatched) {
      return res.send({ confirmed: false, message: "Invalid Otp" });
    }

    await db.mutate({
      mutation: updateUserOtpField,
      variables: { id: req.user.id },
    });

    const bookingid = Math.floor(Math.random() * 100000000 + 1).toString();
    let { restaurantsId, timeDiscountId, people, mobile, name } = req.body;
    let userId = req.user.id;
    people = Number(people);

    const response = await db.mutate({
      mutation: createOrder,
      variables: {
        restaurantsId,
        timeDiscountId,
        userId,
        bookingid,
        people,
        date: moment().toISOString(),
        mobile,
        name,
      },
    });

    const bookingData = response.data.createOrders;
    await bookingConfirmation(req.body, bookingData);
    res.json({ confirmed: true, bookingData });
  },

  async cancelRestaurantBooking(req, res, next) {
    //cancelling order
    const response = await db.mutate({
      mutation: cancelOrder,
      variables: {
        id: req.params.order_id,
      },
    });

    // change has active orders to false
    await db.mutate({
      mutation: updateUserActiveOrders,
      variables: {
        id: req.user.id,
        value: false,
      },
    });

    const cancelledOrder = response.data.updateOrders;
    await cancelBooking(cancelledOrder);
    res.json(cancelledOrder);
  },

  async bookingOtp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { mobile } = req.body;
    const id = req.user.id;

    let bookingOtp = "";
    if (process.env.__DEV__) {
      // in dev mode, otp is 0000 for convenience
      bookingOtp = "0000";
    } else {
      bookingOtp = Math.floor(Math.random() * 10000 + 1).toString();
    }

    let otpExpires = Date.now() + 300000;
    otpExpires = new Date(otpExpires);
    otpExpires = otpExpires.toISOString();

    const response = await db.mutate({
      mutation: bookingOtps,
      variables: {
        id,
        bookingOtp,
        otpExpires,
        mobile,
      },
    });

    await sendOtp(bookingOtp, mobile);
    res.json(response.data.updateUser);
  },

  async unlockDeal(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    // get the orderId
    const { orderId, longitude, latitude } = req.body;
    const geolocation = `${latitude},${longitude}`;

    // check if that orders has the deal unlocked
    // check if the date has passed

    let variables = { orderId, geolocation };
    const mutation = updateOrderUnlocked;

    const response = await db.mutate({ mutation, variables });

    res.send(response.data.updateOrders);
  },

  async createPaymentOrder(req, res, next) {
    // creates a payment order for razorpay
    const { amount, name, email, mobile } = req.body;

    const instance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const options = {
      amount: amount * 100, // give amount here in Paisa not Rupees
      currency: "INR",
      receipt: uuid.v4(),
      payment_capture: true,
    };

    instance.orders.create(options, (_, response) => {
      const result = {
        ...response,
        ...options,
        name,
        email,
        phoneNumber: mobile,
      };
      res.send(result);
    });
  },

  async confirmPayment(req, res) {
    // procedure for completing payment
    const {
      orderId,
      amount,
      receipt,
      paymentOrderId,
      paymentDescription,
      paymentId,
    } = req.body;

    // change the hasActiveOrders of the user to false
    await db.mutate({
      mutation: updateUserActiveOrders,
      variables: {
        id: req.user.id,
        value: false,
      },
    });

    // save the payment in db and mark order as confirmed
    const response = await db.mutate({
      mutation: updateOrderPaymentConfirmed,
      variables: {
        orderId,
        amount,
        receipt,
        paymentOrderId,
        paymentDescription,
        paymentId,
      },
    });

    res.send(response);
  },
};
