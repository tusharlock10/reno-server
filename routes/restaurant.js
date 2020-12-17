const express = require("express"),
  router = express.Router(),
  { asyncErrorHandler, isLoggedIn } = require("../middleware"),
  { check } = require("express-validator"),
  {
    indexRestaurant,
    showRestaurant,
    restaurantTypes,
    updateGeocode
  } = require("../controllers/restaurant");

//@Route    GET '/api/v1/restaurant/types'
//@desc     Get all rest types
//@access   Public

router.get("/types", asyncErrorHandler(restaurantTypes));

//@Route    GET '/api/v1/restaurant/:restaurant_id'
//@desc     Restaurant Show Page
//@access   Public

router.get("/:restaurant_id", asyncErrorHandler(showRestaurant));

//@Route    GET '/api/v1/restaurant'
//@desc     Show all Restaurants  (city->passed in headers)
//@access   Public

router.get("/", asyncErrorHandler(indexRestaurant));

//@Route    GET '/api/v1/restaurant/update/RestaurantGeocode'
//@desc     update geocode(latitude and logitude)
//@access   Public

router.get('/update/RestaurantGeocode', asyncErrorHandler(updateGeocode));

module.exports = router;
