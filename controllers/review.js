const { validationResult } = require("express-validator"),
  db = require("../db_v2"),
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

    //checking if user already reviewed
    const userReviews = await db.query({
      query: getUserReview,
      variables: {
        restaurantsId: req.params.restaurant_id
      }
    });

    const reviewArray = userReviews.data.restaurants.userReviewses;
    console.log(req.user);
    const pastReview = reviewArray.filter(function(review) {
      if (!review || !review.user) {
        return 0;
      } else if (review.user.id == req.user.id) {
        //req.user.userId
        console.log(req.user.id);
        console.log(review.user.id);
        return 1;
      } else {
        return 0;
      }
    });

    if (pastReview.length) {
      return res.status(401).json({
        errors: [{ msg: "You Have Already Reviewed !!" }]
      });
    }

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
