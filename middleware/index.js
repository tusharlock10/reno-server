const jwt = require("jsonwebtoken");
const { getCity } = require("../queries/purchase");
const { getUser } = require("../queries/user");
const db = require("../db/index");
const { GetRestaurant } = require("../queries/restaurant");
const { validationResult } = require("express-validator");
const middleware = {
  logRequest(req, _, next) {
    console.log(req.url);
    next();
  },

  asyncErrorHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  },

  // isClient(req, res, next) {
  //   let token = req.body.jwtUserToken;
  //   if (!token) {
  //     return res.status(401).json({
  //       errors: [{ msg: 'No Token, auth denied !!' }]
  //     });
  //   }
  //   try {
  //     const decoded = jwt.verify(token, process.env.jwtSecret);
  //     req.body = decoded.user;
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({
  //       errors: [{ msg: 'Token not valid !!' }]
  //     });
  //   }
  // },

  isLoggedIn(req, res, next) {
    const token = req.header("jwtToken");
    if (!token) {
      return res.status(401).json({
        errors: [{ msg: "No Token, auth denied !!" }],
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({
        errors: [{ msg: "Token not valid !!" }],
      });
    }
  },

  isLoggedInRazorpay(req, res, next) {
    console.log(req.body);
    const token = req.body.authToken;
    if (!token) {
      return res.status(401).json({
        errors: [{ msg: "No Token, auth denied !!" }],
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({
        errors: [{ msg: "Token not valid !!" }],
      });
    }
  },

  async isPremium(req, res, next) {
    const errors = validationResult(req);
    if (!req.body.restaurantId) {
      return res.status(400).json({ errors: "restaurantId is required !!" });
    }
    const time = String(Date.now());
    const id = req.body.restaurantId;
    const response = await db.query({
      query: GetRestaurant,
      variables: {
        id,
        time,
      },
    });

    let city = response.data.restaurants.city;
    //split using multiple seprator(, and " ")
    city = city.split(/[\s,]+/);

    //get city
    let cityData = await db.query({
      query: getCity,
      variables: { city },
    });

    console.log(cityData.data);

    //get user info
    const user = await db.query({
      query: getUser,
      variables: { facebookID: req.user.facebookID },
    });

    const expireDate = user.data.users[0].premiumExpireDate;
    let currentTime = Date.now();
    currentTime = new Date(currentTime);
    currentTime = currentTime.toISOString();

    cityData = cityData.data.cities[0];

    if (!cityData.isPremium) {
      return next();
    } else if (currentTime < expireDate) {
      return next();
    } else if (user.data.users[0].orderses.length < 1) {
      return next();
    }

    if (expireDate == null) {
      return res.status(403).json({
        errors: [{ msg: "You have not bought premium membership buy now!!" }],
      });
    }

    if (expireDate == null && user.data.users[0].orderses.length == 1) {
      return res.status(403).json({
        errors: [
          {
            msg:
              "You have used your first free booking please buy premium membership!!",
          },
        ],
      });
    }

    return res.status(403).json({
      errors: [{ msg: `Your premium membership has been expired!!` }],
    });
  },
};

module.exports = middleware;
