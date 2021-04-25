const { validationResult } = require("express-validator");
const moment = require("moment");
const db = require("../db");
const {
  getBrandTiles,
  showBrandTile,
  searchRestaurant,

  sundayTypeRestaurants,
  mondayTypeRestaurants,
  tuesdayTypeRestaurants,
  wednesdayTypeRestaurants,
  thursdayTypeRestaurants,
  fridayTypeRestaurants,
  saturdayTypeRestaurants,

  orderses,
  cities,
  getMisc,
} = require("../queries/index");

module.exports = {
  async indexBrandTiles(req, res, next) {
    const typeName = req.query.city;
    if (!typeName) {
      return res.status(401).json({
        errors: [{ msg: "City is not passed headers !!" }],
      });
    }

    const response = await db.query({
      query: getBrandTiles,
      variables: {
        typeName,
      },
    });

    res.json(response.data.restaurantTypes);
  },

  async showBrandTiles(req, res, next) {
    const restaurantTypeId = req.params.restaurantTypeId;
    const time = String(Date.now());
    const response = await db.query({
      query: showBrandTile,
      variables: {
        restaurantTypeId,
        time,
      },
    });

    res.json(response.data.restaurantTypes[0].restaurantses);
  },

  async searchRestaurant(req, res, next) {
    const response = await db.query({
      query: searchRestaurant,
    });
    res.json(response.data.restaurantses);
  },

  async userOrders(req, res, next) {
    const user = await db.query({
      query: orderses,
      variables: { facebookID: req.user.facebookID },
    });

    res.json(user.data.users[0].orderses);
  },

  async typeRestaurants(req, res, next) {
    const typeId = req.params.type_Restaurants_id;
    const city = req.header("city");
    if (!city) {
      return res.status(400).json({
        errors: [{ msg: "City is not passed headers !!" }],
      });
    }

    let halfHour = Date.now() + 60000;
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

    let date = new Date();
    date = date.getDay(date);
    let today = setDay(date);

    const dayQueries = {
      sunday: sundayTypeRestaurants,
      monday: mondayTypeRestaurants,
      tuesday: tuesdayTypeRestaurants,
      wednesday: wednesdayTypeRestaurants,
      thursday: thursdayTypeRestaurants,
      friday: fridayTypeRestaurants,
      saturday: saturdayTypeRestaurants,
    };

    const response = await db.query({
      query: dayQueries[today],
      variables: {
        typeId,
        city,
        time,
      },
    });
    res.json(response.data.restaurantTypes[0].restaurantses);
  },

  async city(req, res, next) {
    const city = await db.query({
      query: cities,
    });
    res.json(city.data.cities);
  },

  async getMisc(req, res, next) {
    const misc = await db.query({
      query: getMisc,
    });
    res.json(misc.data.miscs[0]);
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
