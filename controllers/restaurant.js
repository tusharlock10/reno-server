const db = require("../db");
const axios = require("axios");
const {
  allRestaurantTypes,
  updateRestaurantGeoCode,
  getRestaurants,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  showSunday,
  showMonday,
  showTuesday,
  showWednesday,
  showThursday,
  showFriday,
  showSaturday,
} = require("../queries/restaurant");

module.exports = {
  async restaurantTypes(req, res, next) {
    const response = await db.query({
      query: allRestaurantTypes,
    });

    res.json(response.data.restaurantTypes);
  },

  async showRestaurant(req, res, next) {
    const id = req.params.restaurant_id;

    let halfHour = Date.now() + 60000;
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    let time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

    let date = req.header("date");
    let currentDate = new Date(Number(date)).getDate();
    if (!date || date == "undefined" || currentDate == new Date().getDate()) {
      date = new Date();
      date = date.getDay(date);
    } else {
      date = Number(date);
      date = new Date(date);
      date = date.getDay(date);
      time = "00:00";
    }

    var today = setDay(date);

    const dayQueries = {
      sunday: showSunday,
      monday: showMonday,
      tuesday: showTuesday,
      wednesday: showWednesday,
      thursday: showThursday,
      friday: showFriday,
      saturday: showSaturday,
    };

    const response = await db.query({
      query: dayQueries[today],
      variables: { id, time },
    });

    response.data.restaurants.timeDiscounts =
      response.data.restaurants[today].timeDiscounts;

    res.json(response.data.restaurants);
  },

  async indexRestaurant(req, res, next) {
    const city = req.header("city");
    if (!city) {
      return res.status(400).json({
        errors: [{ msg: "City is not passed headers !!" }],
      });
    }
    let halfHour = Date.now() + 60000; //increase time by 1 minute
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

    let date = new Date();
    date = date.getDay(date);
    let today = setDay(date);

    const dayQueries = {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    };

    const response = await db.query({
      query: dayQueries[today],
      variables: { city, time },
    });

    res.json(response.data.restaurantses);
  },

  async updateGeocode(req, res, next) {
    let halfHour = Date.now();
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

    const resp = await db.query({
      query: getRestaurants,
    });

    const restaurants = resp.data.restaurantses;
    for (i = 0; i < restaurants.length; i++) {
      const response = await axios({
        method: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        params: {
          address: restaurants[i].address,
          key: "AIzaSyBw5ApBzhVY6udXQ8s7C8oQsNmXnoToGxw",
        },
      });

      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;
      db.mutate({
        mutation: updateRestaurantGeoCode,
        variables: { latitude, longitude, id: restaurants[i].id },
      });
    }

    res.send("done");
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
