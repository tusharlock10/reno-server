const { validationResult } = require("express-validator"),
  db = require("../db"),
  { createUserReview, getUserReview } = require("../queries/review"),
  { GetRestaurant, updateRestaurantRating } = require("../queries/restaurant");

module.exports = {
  //Reviews Create
  async reviewCreate(req, res, next) {
    //form validation check point
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.restaurant_id;
    //avg rating
    let reviews = await db.query({
      query: getUserReview,
      variables: {
        restaurantsId: id
      }
    });

    let { review, rating } = req.body;
    rating = Number(rating);

    //creating review
    const response = await db.mutate({
      mutation: createUserReview,
      variables: {
        review,
        rating,
        userId: req.user.id, //req.user.userId
        restaurantsId: req.params.restaurant_id
      }
    });

    //Avg Rating Calculation
    reviews = reviews.data.restaurants.userReviewses;
    var avgRating = 0;
    var totalRating = 0;
    var totalNoOfRating = 0;

    reviews.forEach(review => {
      totalRating = totalRating + review.rating;
      totalNoOfRating++;
    });
    totalRating = totalRating + response.data.createUserReviews.rating;
    totalNoOfRating++;
    if (totalRating) {
      avgRating = totalRating / totalNoOfRating;
    }

    avgRating = Math.round(avgRating.toFixed(1));
    console.log(avgRating);
    //updateRating
    const updateRating = await db.mutate({
      mutation: updateRestaurantRating,
      variables: {
        id,
        rating: avgRating
      }
    });

    res.json(response.data.createUserReviews);
  },
  //Reviews Show
  async reviewShow(req, res, next) {
    const response = await db.query({
      query: getUserReview,
      variables: {
        restaurantsId: req.params.restaurant_id
      }
    });

    res.json(response.data.restaurants.userReviewses);
  }
  //Reviews Update
  //async reviewUpdate(req, res, next) {},
  // Reviews Destroy
  //   async reviewDestroy(req, res, next) {
  //     await Coupon.findByIdAndUpdate(req.params.id, {
  //       $pull: { reviews: req.params.review_id }
  //     });
  //     await Review.findByIdAndRemove(req.params.review_id);
  //     req.session.success = "Review deleted successfully!";
  //     res.redirect(`/coupons/${req.params.id}`);
  //   }
};
