const { validationResult } = require("express-validator");
const moment = require("moment");
const db = require("../db");
const {
  getBrandTiles,
  showBrandTile,
  searchRestaurant,
  typeRestaurants,
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

    const orders = user.data.users[0].orderses;
    const upcomingOrders = [];
    const completedOrders = [];

    orders.forEach((order) => {
      const orderTime = order.timeDiscount.time.split("-")[1];
      const hours=orderTime.split(':')[0]
      const minutes=orderTime.split(':')[1]
      const orderDate = moment(order.date).set('hours', hours).set('minutes', minutes)
      
      if (order.cancelled) {
        completedOrders.unshift(order);
      } else if (orderDate < moment()) {
        if (order.unlockActive && !order.confirmed) {
          // check if order was unlocked but not paid, then its an upcoming order
          upcomingOrders.push(order);
        } else {
          completedOrders.unshift(order);
        }
        // console.log(order);
      } else {
        upcomingOrders.push(order);
        // console.log(order);
      }
    });

    res.json({ completedOrders, upcomingOrders });
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

    const response = await db.query({
      query: typeRestaurants,
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
