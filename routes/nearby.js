const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");
const { isLoggedIn, asyncErrorHandler } = require("../middleware/index");
const { nearByRestaurants } = require("../controllers/nearby");

// @Route    POST '/api/v1/nearby'
// @desc     Finding the restaunts which ranges in 100Km to user
// @access   Public
router.post(
  "/",
  [
    check("longitude", "longitude is required !!").exists(),
    check("latitude", "latitude is required !!").exists()
  ],
  asyncErrorHandler(nearByRestaurants)
);

module.exports = router;
