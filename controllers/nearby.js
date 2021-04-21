const db = require("../db");
const axios = require("axios");
const {
  allRestaurants,
  sundayNearbyRestaurants,
  mondayNearbyRestaurants,
  tuesdayNearbyRestaurants,
  wednesdayNearbyRestaurants,
  thursdayNearbyRestaurants,
  fridayNearbyRestaurants,
  saturdayNearbyRestaurants,
} = require("../queries/restaurant");
var distance = require("google-distance-matrix");
const { validationResult } = require("express-validator");

const haversineDistance = (coords1, coords2) => {
  // haversine formula : calc the distance between two geographic coords
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371;

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
};

const getRestaurantsByDistances = (restaurants, long, lat) => {
  // restaurants = list of the restaurants returned by db
  // new list to return = [{distance, restaurant}]
  return restaurants
    .map((restaurant) => {
      const coords1 = [restaurant.longitude, restaurant.latitude];
      const coords2 = [long, lat];
      const distance = haversineDistance(coords1, coords2);
      const duration = distance / 40; // 60 km/h, duration in hours
      return { ...restaurant, distance, duration };
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    });
};

module.exports = {
  async nearByRestaurants(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { longitude, latitude, city } = req.body;
    //time for Time Discount

    let halfHour = Date.now();
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

    let date = new Date();
    date = date.getDay(date);
    let today = setDay(date);

    const nearbyQueries = {
      sunday: sundayNearbyRestaurants,
      monday: mondayNearbyRestaurants,
      tuesday: tuesdayNearbyRestaurants,
      wednesday: wednesdayNearbyRestaurants,
      thursday: thursdayNearbyRestaurants,
      friday: fridayNearbyRestaurants,
      saturday: saturdayNearbyRestaurants,
    };

    const response = await db.query({
      query: nearbyQueries[today],
      variables: {
        time,
        city,
      },
    });

    const restaurants = response.data.restaurantses;
    const result = getRestaurantsByDistances(restaurants, longitude, latitude);
    res.json(result);
  },
};

const setDay = function getDay(date) {
  let day;
  if (date == 0) {
    day = "sunday";
  }
  if (date == 1) {
    day = "monday";
  }
  if (date == 2) {
    day = "tuesday";
  }
  if (date == 3) {
    day = "wednesday";
  }
  if (date == 4) {
    day = "thursday";
  }
  if (date == 5) {
    day = "friday";
  }
  if (date == 6) {
    day = "saturday";
  }

  return day;
};