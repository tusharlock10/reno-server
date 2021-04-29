const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");
const { isLoggedIn, asyncErrorHandler } = require("../middleware/index");
const {
  reviewCreate,
  reviewShow,
  userRestaurantReview
} = require("../controllers/review");

// @Route    GET '/api/v1/restaurant/:restaurant_id/review'
// @desc     Show Review of retsaurant
// @access   Public
router.get("/", asyncErrorHandler(reviewShow));

// @Route    POST '/api/v1/restaurant/:restaurant_id/review'
// @desc     Create Review for a Restaurant
// @access   Private

router.post(
  "/",
  [
    check("review", "review is required !!").exists(),
    check("rating", "rating is required !!").exists()
  ],
  isLoggedIn,
  asyncErrorHandler(reviewCreate)
);

// @Route    GET '/api/v1/restaurant/:restaurant_id/review/user'
// @desc     Gets the review made by the user for that restaurant
// @access   Private

router.get(
  "/user",
  isLoggedIn,
  asyncErrorHandler(userRestaurantReview)
);

module.exports = router;
