const express = require('express'),
  router = express.Router(),
  {
    asyncErrorHandler,
    isLoggedIn,
    isLoggedInRazorpay
  } = require('../../middleware'),
  { check } = require('express-validator'),
  {
    createPremiumMembershipOrder,
    confirmPremiumMembershipOrder,
    getCityPremiumAmount
  } = require('../../controllers/purchase/premiumMemberShip');

//@Route    POST '/api/v1/createPremiumMembershipOrder'
//@desc     Show premium membership buy page
//@access   Private

router.post(
  '/createPremiumMembershipOrder',
  check('days', 'days are required !!').exists(),
  isLoggedIn,
  asyncErrorHandler(createPremiumMembershipOrder)
);

//@Route    POST '/api/v1/confirmPremiumMembershipOrder'
//@desc     make the user premium member
//@access   Private

router.post(
  '/confirmPremiumMembershipOrder',
  isLoggedIn,
  asyncErrorHandler(confirmPremiumMembershipOrder)
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
