const { validationResult } = require("express-validator"),
  db = require("../db"),
  {
    createUserReview,
    updateUserReview,
    getUserReview,
    getUserRestaurantReview,
  } = require("../queries/review"),
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
        restaurantsId: id,
      },
    });

    let { review, rating, reviewId } = req.body;
    rating = Number(rating);

    //creating/updating review
    let response = null;
    if (reviewId) {
      response = await db.mutate({
        mutation: updateUserReview,
        variables: {
          review,
          rating,
          reviewId,
        },
      });
      response = response.data.updateUserReviews;
    } else {
      response = await db.mutate({
        mutation: createUserReview,
        variables: {
          review,
          rating,
          userId: req.user.id, //req.user.userId
          restaurantsId: req.params.restaurant_id,
        },
      });
      response = response.data.createUserReviews;
    }

    //Avg Rating Calculation
    reviews = reviews.data.userReviewses;
    var avgRating = 0;
    var totalRating = 0;
    var totalNoOfRating = 0;

    reviews.forEach((review) => {
      if (review.id !== reviewId) {
        totalRating = totalRating + review.rating;
        totalNoOfRating++;
      }
    });
    totalRating = totalRating + response.rating;
    totalNoOfRating++;
    if (totalRating) {
      avgRating = totalRating / totalNoOfRating;
    }

    avgRating = Math.round(avgRating.toFixed(1));
    //updateRating
    await db.mutate({
      mutation: updateRestaurantRating,
      variables: {
        id,
        rating: avgRating,
      },
    });

    res.json(response);
  },
  //Reviews Show
  async reviewShow(req, res, next) {
    const response = await db.query({
      query: getUserReview,
      variables: {
        restaurantsId: req.params.restaurant_id,
      },
    });

    res.json(response.data.restaurants.userReviewses);
  },

  async userRestaurantReview(req, res) {
    const userId = req.user.id;
    const restaurantId = req.params.restaurant_id;


    const response = await db.query({
      query: getUserRestaurantReview,
      variables: { userId, restaurantId },
    });
    res.json(response.data.userReviewses[0]);
  },
};
