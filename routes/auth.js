const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler,  isLoggedIn } = require('../middleware'),
  {
    userValidation,
    getUserProfile,
    updateUserInstallLocation,
    updateUserCurrentLocation
  } = require('../controllers/auth'),
  { check } = require('express-validator');

//@Route    POST '/api/v1/auth'
//@desc     login and signup(if facebookID doesn't exist in db) the user
//@access   Public

//facebookID -> (google,fb,guest id)
router.post(
  '/auth',
  
  [check('facebookID', 'facebookID is required !!').exists()],
  asyncErrorHandler(userValidation)
);

//@Route    GET '/api/v1/user-profile'
//@desc     Get the user
//@access   Private

router.get('/user-profile', isLoggedIn, asyncErrorHandler(getUserProfile));

//@Route    PUT '/api/v1/user-installLocation'
//@desc     Update user install location
//@access   Private

router.put(
  '/user-installLocation',
  isLoggedIn,
  [check('installLocation', 'installLocation is required !!').exists()],
  asyncErrorHandler(updateUserInstallLocation)
);


//@Route    PUT '/api/v1/user-currentLocation'
//@desc     update user current location
//@access   Private

router.put(
  '/user-currentLocation',
  isLoggedIn,
  [check('currentLocation', 'currentLocation is required !!').exists()],
  asyncErrorHandler(updateUserCurrentLocation)
);

module.exports = router;
