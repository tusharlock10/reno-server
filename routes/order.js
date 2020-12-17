const express = require('express');
const router = express.Router({ mergeParams: true });
const { check } = require('express-validator');
const {
  isLoggedIn,
  asyncErrorHandler,
  isPremium
} = require('../middleware/index');
const {
  restaurantBooking,
  cancelRestaurantBooking,
  bookingOtp
} = require('../controllers/order');

// @Route    POST '/api/v1/confirmBooking'
// @desc     Confirm booking
// @access   Private
router.post(
  '/confirmBooking',
  [
    check('people', 'people is required !!').exists(),
    check('mobile', 'mobile is required !!').exists(),
    check('timeDiscountId', 'timeDiscountId is required !!').exists(),
    check('restaurantsId', 'restaurantsId is required !!').exists(),
    check('name', 'name is required !!').exists(),
    check('date', 'date is required !!').exists(),
    check('otp', 'otp is required !!').exists()
  ],
  isLoggedIn,


  asyncErrorHandler(restaurantBooking)
);

// @Route    DELETE '/api/v1/cancelBooking/:order_id'
// @desc     Cancel booking
// @access   Private
router.delete(
  '/cancelBooking/:order_id',
  isLoggedIn,
  asyncErrorHandler(cancelRestaurantBooking)
);

// @Route    POST '/api/v1/bookingOtp'
// @desc     send otp to user mobile and save it to db
// @access   Private
router.post(
  '/bookingOtp',
  check('mobile', 'mobile is required !!').exists(),
  check('restaurantId', 'restaurantId is required !!').exists(),
  isLoggedIn,
  isPremium,
  asyncErrorHandler(bookingOtp)
);

module.exports = router;
