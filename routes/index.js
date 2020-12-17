const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, asyncErrorHandler } = require('../middleware/index');
const {
  indexBrandTiles,
  showBrandTiles,
  searchRestaurant,
  typeRestaurants,
  userOrders,
  city
} = require('../controllers/index');

// @Route    GET '/api/v1/brandTiles'
// @desc     Show all brandTiles
// @access   Public

router.get('/brandTiles', asyncErrorHandler(indexBrandTiles));

// @Route    GET '/api/v1/brandTiles/:restaurantTypeId'
// @desc     Show  restaurants of particular brandTile
// @access   Public
router.get('/brandTiles/:restaurantTypeId', asyncErrorHandler(showBrandTiles));

// @Route    GET '/api/v1/search'
// @desc     Getting all restaurant names and id's for search purpose
// @access   Public

router.get('/search', asyncErrorHandler(searchRestaurant));

// @Route    GET '/api/v1/orders'
// @desc    show user order(i.e upcoming and past reservations)
// @access   PRIVATE


router.get('/orders', isLoggedIn, asyncErrorHandler(userOrders));

// @Route    GET '/api/v1/type/:type_Restaurants_id'
// @desc     Show all the restaurants of particular restaurant_type
// @access   PUBLIC


router.get("/type/:type_Restaurants_id", asyncErrorHandler(typeRestaurants));

// @Route    GET '/api/v1/city'
// @desc     Show all the city and premium price
// @access   PUBLIC

router.get('/city', asyncErrorHandler(city));

module.exports = router;
