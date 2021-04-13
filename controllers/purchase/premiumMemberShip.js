const Razorpay = require('razorpay');
const { validationResult } = require('express-validator');
const { getUser } = require('../../queries/user');
const { updateUserPremiumDetails } = require('../../queries/purchase');
const { getCity } = require('../../queries/purchase');
const sha = require('crypto-js/hmac-sha256');
const db = require('../../db');

module.exports = {
  async getPremiumMembership(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const city = req.header('city');
    if (!city) {
      return res.json({
        errors: [{ msg: 'City is not passed headers !!' }]
      });
    }

    const days = req.body.days;

    //get city
    let cityData = await db.query({
      query: getCity,
      variables: { city }
    });

    cityData = cityData.data.cities[0];

    if (!cityData.isPremium) {
      return res.json({
        errors: [{ msg: 'No need to buy premium membership in your area!!' }]
      });
    }

    var instance = new Razorpay({
      key_id: process.env.razorpayKeyId,
      key_secret: process.env.razorpayKeySecret
    });

    //get user info
    const user = await db.query({
      query: getUser,
      variables: { facebookID: req.user.facebookID }
    });
    const userName = user.data.users[0].firstname;
    const userEmail = user.data.users[0].email;
    const mobile = user.data.users[0].mobile;

    let totalAmount;

    if (days == '90') {
      totalAmount = cityData.premiumAmmount90;
    }
    if (days == '180') {
      totalAmount = cityData.premiumAmmount180;
    }
    if (days == '360') {
      totalAmount = cityData.premiumAmmount360;
    }

    amount = Math.round(totalAmount * 100);

    var options = {
      amount, // ammount in the smallest currency unit
      currency: 'INR',
      receipt: 'order_rcptid_11',
      payment_capture: '0'
    };
    const token = req.header('jwtToken');
    var host = req.protocol + '://' + req.get('host');

    instance.orders.create(options, function(err, order) {
      const orderId = order.id;
      res.render('purchase/getPremiumMembership.ejs', {
        orderId,
        amount,
        userName,
        userEmail,
        mobile,
        token,
        days,
        host
      });
    });
  },

  async postPremiumMembership(req, res, next) {
    //check for razorpay signature->m.i.p
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_order_id = req.body.razorpay_order_id;
    const generated_signature = sha(
      razorpay_order_id + '|' + razorpay_payment_id,
      process.env.razorpayKeySecret
    );

    if (generated_signature != req.body.razorpay_signature) {
      return res.json({
        errors: [{ msg: 'Bad request!!' }]
      });
    }

    const days = req.body.days;

    let premiumStartDate = new Date(Date.now());
    premiumStartDate = premiumStartDate.toISOString();
    let premiumExpireDate;
    if (days == '90') {
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 90);
    }
    if (days == '180') {
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 180);
    }
    if (days == '360') {
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 360);
    }

    premiumExpireDate = premiumExpireDate.toISOString();

    const user = await db.mutate({
      mutation: updateUserPremiumDetails,
      variables: {
        id: req.user.id,
        premiumStartDate,
        premiumExpireDate
      }
    });

    // res.json({data:user.data.updateUser,status:1});
    // res.send({ data: user.data.updateUser, status: 1 });
    res.render('purchase/getPremiumSuccess.ejs', { title: 'Success' });
  },

  async getCityPremiumAmount(req, res, next) {
    const city = req.header('city');
    if (!city) {
      return res.json({ errors: 'city not passed in headers' });
    }

    let cityData = await db.query({
      query: getCity,
      variables: { city }
    });

    res.json(cityData.data.cities[0]);
  }
};
