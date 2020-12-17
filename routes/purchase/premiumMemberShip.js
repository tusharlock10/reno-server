const express = require('express'),
  router = express.Router(),
  {
    asyncErrorHandler,
    isLoggedIn,
    isLoggedInRazorpay
  } = require('../../middleware'),
  { check } = require('express-validator'),
  {
    getPremiumMembership,
    postPremiumMembership,
    getCityPremiumAmount
  } = require('../../controllers/purchase/premiumMemberShip');

//@Route    POST '/api/v1/reno/get-premium-membership'
//@desc     Show premium membership buy page
//@access   Private

router.post(
  '/reno/get-premium-membership',
  check('days', 'days are required !!').exists(),
  isLoggedIn,
  asyncErrorHandler(getPremiumMembership)
);

//@Route    POST '/api/v1/get-premium-membership'
//@desc     make the user premium member
//@access   Private

router.post(
  '/get-premium-membership',
  isLoggedInRazorpay,
  asyncErrorHandler(postPremiumMembership)
);

//@Route    GET '/api/v1/city/premiumAmount'
//@desc     Show premium ammount of city
//@access   Private

router.get(
  '/city/premiumAmount',
  check('city', 'city is required in headers !!').exists(),
  asyncErrorHandler(getCityPremiumAmount)
);

module.exports = router;
