const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler, isLoggedIn } = require('../../middleware'),
  { getRenoPay, postRenoPay } = require('../../controllers/purchase/renoPay'),
  { check } = require('express-validator');

  
//@Route    GET '/api/v1/renoPay '
//@desc     Generating order id for razorpay and get restaurant details->return razorpay form
//@access   Private

router.get(
  '/',
  [
    check('totalAmount', 'totalAmount is required !!').exists(),
    check('restaurant_id', 'restaurant_id is required !!').exists(),
    check(
      'restaurantRazorpayAccount',
      'restaurantRazorpayAccount is required !!'
    ).exists()
  ],
  isLoggedIn,
  asyncErrorHandler(getRenoPay)
);


//@Route    POST '/api/v1/renoPay'
//@desc     Payment Success check and transfer money to merchant account
//@access   Private

router.post('/', isLoggedIn, asyncErrorHandler(postRenoPay));

module.exports = router;
