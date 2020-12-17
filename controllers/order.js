const { validationResult } = require("express-validator"),
  db = require("../db"),
  bcryptjs = require("bcryptjs"),
  { sendOtp, bookingConfirmation, cancelBooking } = require("../msg91"),
  {
    createOrder,
    deleteOrder,
    bookingOtps,
    checkOtp,
    updateUserOtpField
  } = require("../queries/order");

module.exports = {
  async restaurantBooking(req, res, next) {
    console.log(req.body);
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
        currentTime
      }
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
      variables: { id: req.user.id }
    });

    const bookingid = Math.floor(Math.random() * 100000000 + 1).toString();
    let {
      restaurantsId,
      timeDiscountId,
      people,
      mobile,
      name,
      date
    } = req.body;
    let userId = req.user.id;
    people = Number(people);

     var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateIso = new Date().toLocaleDateString('en-US', options); 
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
        date:dateIso,
        mobile,
        name
      }
    });

    const bookingData = response.data.createOrders;
    await bookingConfirmation(req.body, bookingData);
    console.log("done",response);
    res.json({ confirmed: true, bookingData });
  },

  async cancelRestaurantBooking(req, res, next) {
    //creating order
    const response = await db.mutate({
      mutation: deleteOrder,
      variables: {
        id: req.params.order_id
      }
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

    const otp = Math.floor(Math.random() * 10000 + 1).toString();
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
        mobile
      }
    });

    await sendOtp(otp, mobile);
    console.log(otp);
    res.json(response.data.updateUser);
  }
};
