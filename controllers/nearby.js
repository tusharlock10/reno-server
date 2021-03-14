const db = require("../db_v2");
const axios = require("axios");
const { allRestaurants } = require("../queries/restaurant");
var distance = require("google-distance-matrix");
const { validationResult } = require("express-validator");

module.exports = {
  async nearByRestaurants(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    //time for Time Discount

    let halfHour = Date.now();
    let hour = new Date(halfHour).getHours();
    let minute = new Date(halfHour).getMinutes();
    const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;
    const response = await db.query({
      query: allRestaurants,
      variables: {
        time
      }
    });

    const restaurants = response.data.restaurantses;
    var destinations = [];
    restaurants.forEach(res => {
      destinations.push(res.address);
    });
    var nbRestaurants = [];
    //google-matrix-code
    var origins = [`${latitude},${longitude}`]; //["28.455484,76.987664"]; //user log,lat
    distance.key(process.env.googleMatrixApi);
    distance.units("imperial");

    distance.matrix(origins, destinations, function(err, distances) {
      console.log("NEARBY RESULT : ", {err, distances})
      if (err) {
        return res.status(404).json({ errors: [{ msg: `${err}` }] });
      }
      if (!distances) {
        return res.status(404).json({ errors: [{ msg: "No Distances" }] });
      }
      if (distances.status == "OK") {
        for (var j = 0; j < destinations.length; j++) {
          //var origin = distances.origin_addresses[0];
          //var destination = distances.destination_addresses[j];

          if (distances.rows[0].elements[j].status == "OK") {
            var distance = distances.rows[0].elements[j].distance.value;
            var duration = distances.rows[0].elements[j].duration.value;
            restaurants[j].distance = distance;
            restaurants[j].duration = duration;
            //console.log(restaurants[j]);
            if (distance < 100000) {
              nbRestaurants.push(restaurants[j]);
            }
          } else {
            console.log(" is not reachable by land from ");
          }
          if (j == destinations.length - 1) {
            console.log(nbRestaurants.length);
          }
        }
      }
      //compare function
      function compare(a, b) {
        const genreA = a.distance;
        const genreB = b.distance;
        if (genreA > genreB) {
          return 1;
        } else if (genreA < genreB) {
          return -1;
        }
        return 0;
      }
      //console.log(nbRestaurants.sort(compare));
      res.json(nbRestaurants.sort(compare));

      // res.json(response.data.restaurantses);
    });
  }
};
