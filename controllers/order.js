const { validationResult } = require("express-validator");
const Razorpay = require("razorpay");
const uuid = require("uuid");
const db = require("../db");
const bcryptjs = require("bcryptjs");
const { sendOtp, bookingConfirmation, cancelBooking } = require("../msg91");
const {
  createOrder,
  deleteOrder,
  bookingOtps,
  checkOtp,
  updateUserOtpField,
  updateOrderUnlocked,
  updateOrderPaymentConfirmed,
} = require("../queries/order");
const { razorpayKeyId, razorpayKeySecret } = process.env;

module.exports = {
  async restaurantBooking(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    //check otp validity

    const otp = req.body.otp;
    console.log(otp);

    let currentTime = Number(req.body.date);
    currentTime = new Date(currentTime);
    currentTime = currentTime.toISOString();

    const getUser = await db.query({
      query: checkOtp,
      variables: {
        id: req.user.id,
        currentTime,
      },
    });

    if (getUser.data.users.length <= 0) {
      // return res
      //   .status(404)
      //   .json({ errors: [{ msg: "Otp is invalid or Expired" }] });
      return res.send({ errors });
    }

    const isOtpMatched = await bcryptjs.compare(
      otp,
      getUser.data.users[0].bookingOtp
    );

    if (!isOtpMatched) {
      return res.send({ confirmed: false, message: "Invalid Otp" });
    }

    await db.mutate({
      mutation: updateUserOtpField,
      variables: { id: req.user.id },
    });

    const bookingid = Math.floor(Math.random() * 100000000 + 1).toString();
    let {
      restaurantsId,
      timeDiscountId,
      people,
      mobile,
      name,
      date,
    } = req.body;
    let userId = req.user.id;
    people = Number(people);

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateIso = new Date().toLocaleDateString("en-US", options);
    // console.log(dateIso);
    // const dateIso = new Date().toDateString();
    console.log(currentTime);
    const response = await db.mutate({
      mutation: createOrder,
      variables: {
        restaurantsId,
        timeDiscountId,
        userId,
        bookingid,
        people,
        date: dateIso,
        mobile,
        name,
      },
    });

    const bookingData = response.data.createOrders;
    await bookingConfirmation(req.body, bookingData);
    console.log("done", response);
    res.json({ confirmed: true, bookingData });
  },

  async cancelRestaurantBooking(req, res, next) {
    //creating order
    const response = await db.mutate({
      mutation: deleteOrder,
      variables: {
        id: req.params.order_id,
      },
    });
    const cancelData = response.data.deleteOrders;
    await cancelBooking(cancelData);
    res.json(response.data.deleteOrders);
  },

  async bookingOtp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { mobile } = req.body;
    const id = req.user.id;

    let otp = "";
    if (process.env.__DEV__) {
      // in dev mode, otp is 0000 for convenience
      otp = "0000";
    } else {
      otp = Math.floor(Math.random() * 10000 + 1).toString();
    }
    const salt = await bcryptjs.genSalt(10);
    const bookingOtp = await bcryptjs.hashSync(otp, salt);

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

    await sendOtp(otp, mobile);
    console.log(otp);
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

    const response = await db.mutate({
      mutation: updateOrderUnlocked,
      variables: { orderId, geolocation },
    });

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
