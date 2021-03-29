const sha = require('crypto-js/hmac-sha256');
const axios = require('axios');
const { getRenoCommission } = require('../../queries/purchase');
const db = require('../../db');
const { validationResult } = require('express-validator');
const Razorpay = require('razorpay');
const { getUser } = require('../../queries/user');

module.exports = {
  async getRenoPay(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var instance = new Razorpay({
      key_id: process.env.razorpayKeyId,
      key_secret: process.env.razorpayKeySecret
    });

    //Data recieved
    var totalAmount = req.body.totalAmount;
    var restaurant_id = req.body.restaurant_id; 
    var restaurantRazorpayAccount = req.body.restaurantRazorpayAccount; 

   // get user info
    const user = await db.query({
      query: getUser,
      variables: { facebookID: req.user.facebookID }
    });

    const userName = user.data.users[0].firstname;
    const userEmail = user.data.users[0].email;
    const mobile = user.data.users[0].mobile;

    amount = Math.round(totalAmount * 100);
    var options = {
      amount, // amount in the smallest currency unit
      currency: 'INR',
      receipt: 'order_rcptid_11',
      payment_capture: '0'
    };
    instance.orders.create(options, function(err, order) {
      const orderId = order.id;
      res.render('purchase/showPurchase.ejs', {
        orderId,
        totalAmount,
        restaurantRazorpayAccount,
        restaurant_id,
        userName,
        userEmail,
        mobile
      });
    });
  },

  async postRenoPay(req, res, next) {
    //prettier-ignore
    const razorpay_payment_id=req.body.razorpay_payment_id;
    const razorpay_order_id = req.body.razorpay_order_id;
    const restaurant_id = req.body.restaurant_id;
    const restaurantRazorpayAccount = req.body.restaurantRazorpayAccount;
    const totalAmount = req.body.totalAmount;

    // Authentication
    generated_signature = sha(
      razorpay_order_id + '|' + razorpay_payment_id,
      process.env.razorpayKeySecret
    );
    if (generated_signature != req.body.razorpay_signature) {
      var success = false;
      return res.status(400).json({
        errors: [{ msg: 'Bad request!!' }]
      });
    }

    //Get renoPayCommission
    const restaurant = await db.query({
      query: getRenoCommission,
      variables: { id: restaurant_id }
    });

    //TODO->REPLACE
    const renoCommission = 10; //restaurant.data.Restaurants.renoCommision;

    //calculating merchant Amount
    const adminAmount = (totalAmount * renoCommission) / 100;
    const merchantAmount = Math.round((totalAmount - adminAmount) * 100);

    //Giving Merchant it's share
    let merchantSuccess = true;

    //Giving Merchant it's share

    const response = await axios({
      method: 'POST',
      url: `https://api.razorpay.com/v1/payments/${razorpay_payment_id}/transfers`,
      auth: {
        username: process.env.razorpayKeyId,
        password: process.env.razorpayKeySecret
      },
      params: {
        'transfers[0][account]': restaurantRazorpayAccount,
        'transfers[0][amount]': merchantAmount,
        'transfers[0][currency]': 'INR'
      }
    });

    if (response.status == 200) {
      merchantSuccess = true;
    } else {
      merchantSuccess = false;
    }

    req.body.success = true;
    req.body.merchantSuccess = merchantSuccess;
    res.send(req.body);
  }
};
