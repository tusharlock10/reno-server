//sunday->timediscount(12:30,monDiscount,monExhaust)<-monday


 require("dotenv").config();
 const jwt = require("jsonwebtoken");


const payload = {
  user: {
    id: 'cjgz4df2gjjnu0189b65wj1r4',
    facebookID: '1640814676035545'
  }
};

jwt.sign(
  payload,
  process.env.jwtSecret,
  { expiresIn: 360000 },
  (err, token) => {
    console.log(token)
  }
);
// require('dotenv').config();

// var nodemailer = require('nodemailer'),
//   ejs = require('ejs');

// var transporter = nodemailer.createTransport({
//   service: 'Zoho',
//   host: 'smtp.zoho.in',
//   port: 587,
//   secure: false,
//   ignoreTLS: true,
//   requireTLS: false,
//   auth: {
//     user: 'naman@goreno.in', // generated ethereal user
//     pass: 'naman@123' // generated ethereal password
//   }
// });

// ejs.renderFile(__dirname + "/views/register.ejs", { name: 'Stranger' }, (err, data) =>{
//   if (err) {
//     console.log(err);
//   } else {
//     var mainOptions = {
//       from: 'naman@goreno.in',
//       to: 'vikramsingh15j@gmail.com',
//       subject: 'Sending Email using Node.js',
//       html: data
//     };

//     transporter.sendMail(mainOptions, function(err, info) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Message sent: ' + info.response);
//       }
//     });
//   }
// });
// var request = require("request");

// var dataString = `transfers[0][account]=acc_DbTtVH7ALfwB6o&transfers[0][amount]=10000&transfers[0][currency]=INR&transfers[0][notes][name]=Vikram Kumar`;

// var options = {
//   url: `https://api.razorpay.com/v1/payments/pay_DbqxwFsai99keY/transfers`,
//   method: "POST",
//   body: dataString,
//   auth: {
//     user: "rzp_test_35LDl80yPyMiMo",
//     pass: "pLDcqBbUdjQUdbCB4C5PJ7vA"
//   }
// };

// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//   } else {
//     console.log(error, body);
//   }
// }

// request(options, callback);
//
// const axios = require("axios");

// async function transferPay() {
//   try {
//     const response = await axios({
//       method: "POST",
//       url: `https://api.razorpay.com/v1/payments/pay_DbUAOJnhV5k8L0/transfers`,
//       auth: {
//         username: "rzp_test_35LDl80yPyMiMo",
//         password: "pLDcqBbUdjQUdbCB4C5PJ7vA"
//       },
//       params: {
//         "transfers[0][account]": "acc_DbTtVH7ALfwB6o",
//         "transfers[0][amount]": 1000,
//         "transfers[0][currency]": "INR",
//         "transfers[0][notes][name]": "Vikram Kumar"
//       }
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// transferPay();
// const axios = require("axios");

// async function transferPay() {
//   const response = await axios({
//     method: "POST",
//     url: `https://api.razorpay.com/v1/payments/pay_DbUAOJnhV5k8L0/transfers`,
//     auth: {
//       username: "rzp_test_35LDl80yPyMiMo",
//       password: "pLDcqBbUdjQUdbCB4C5PJ7vA"
//     },
//     params: {
//       "transfers[0][account]": "acc_DbTtVH7ALfwB6o",
//       "transfers[0][amount]": 1000,
//       "transfers[0][currency]": "INR",
//       "transfers[0][notes][name]": "Vikram Kumar"
//     }
//   });
//   console.log(response);
// }

// transferPay();
// const axios = require("axios");

// const uri =
//   "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
//   "28.455484" +
//   "," +
//   "76.987664" +
//   "&destinations=" +
//   "Huda City Center,Gurgaon" +
//   "&key=AIzaSyBw5ApBzhVY6udXQ8s7C8oQsNmXnoToGxw";

// async function transferPay() {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: uri
//     });
//     console.log(response);
//     const data = response.data.rows[0].elements[0];
//     console.log(data);
//     const distance = data.distance.value;
//     console.log(distance);
//     const duration = data.duration.value;
//     console.log(duration);
//   } catch (error) {
//     console.log(error);
//   }
// }

// transferPay();
// "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=enc:_kjwFjtsbMt%60EgnKcqLcaOzkGari%40naPxhVg%7CJjjb%40cqLcaOzkGari%40naPxhV:&key=AIzaSyBw5ApBzhVY6udXQ8s7C8oQsNmXnoToGxw"

// var distance = require("google-distance-matrix");

// var origins = ["40.7421,-73.9914"];
// var destinations = [
//   "New York NY",
//   "Montreal",
//   "41.8337329,-87.7321554",
//   "Honolulu"
// ];

// distance.key("AIzaSyBw5ApBzhVY6udXQ8s7C8oQsNmXnoToGxw");
// distance.units("imperial");

// distance.matrix(origins, destinations, function(err, distances) {
//   if (err) {
//     return console.log(err);
//   }
//   if (!distances) {
//     return console.log("no distances");
//   }
//   if (distances.status == "OK") {
//     for (var i = 0; i < origins.length; i++) {
//       for (var j = 0; j < destinations.length; j++) {
//         var origin = distances.origin_addresses[i];
//         var destination = distances.destination_addresses[j];
//         if (distances.rows[0].elements[j].status == "OK") {
//           var distance = distances.rows[i].elements[j].distance.value;
//           console.log(
//             "Distance from " + origin + " to " + destination + " is " + distance
//           );
//         } else {
//           console.log(destination + " is not reachable by land from " + origin);
//         }
//       }
//     }
//   }
// });

// const mapboxToken =
//   'pk.eyJ1IjoidmlrcmFtLXNpbmdoIiwiYSI6ImNqeHFiOWhzdDBvMHYzYnBmNm15dzgybmsifQ.a3DkkpebAWLGrq-axr7thQ';

// const mbx = require('@mapbox/mapbox-sdk/services/geocoding');
// const geocodingClient = mbx({ accessToken: mapboxToken });

// async function test() {
//   /*geolocation sdk*/
//   response = await geocodingClient
//     .forwardGeocode({
//       query:
//         'new delhi ',
//       limit: 1
//     })
//     .send();

//    console.log(response.body.features[0].geometry);
// }
// test();

// const db = require("./db");
// const { allRestaurants } = require("./queries/restaurant");
// const { updateRestaurantGeoCode } = require("./queries/restaurant");

// let halfHour = Date.now();
// let hour = new Date(halfHour).getHours();
// let minute = new Date(halfHour).getMinutes();
// const time = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;

// async function getRest() {
//   await db.query({
//     query: allRestaurants,
//     variables: {
//       time
//     }
//   });
// }

// const res = getRest();
// console.log(getRest());

// const restaurants = res.data.restaurantses;

// for (i = 0; i < restaurants.length; i++) {
//   async function updategeoCode() {
//     try {
//       const response = await axios({
//         method: "GET",
//         url: "https://maps.googleapis.com/maps/api/geocode/json",
//         params: {
//           address: restaurant[i].address,
//           key: "AIzaSyBw5ApBzhVY6udXQ8s7C8oQsNmXnoToGxw"
//         }
//       });
//       console.log(response.data.results[0].geometry.location);

//       let latitude = response.data.results[0].geometry.location.lat;
//       let longitude = response.data.results[0].geometry.location.lng;
//       db.mutate({
//         mutation: updateRestaurantGeoCode,
//         variables: { latitude, longitude, id: restaurant[i].id }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   updategeoCode();
// }

// Generate salt for admin

 const bcryptjs=require("bcryptjs")

// const generate=async function salt(password) {
//  const salt =await bcryptjs.genSalt(10);
//  password =await bcryptjs.hashSync(password, salt);

//  console.log(password);
  
// }


// generate("terminator@15")

// const check=async function salt() {

//  x = await bcryptjs.compare(
//     'terminator@15',
//     '$2a$10$XY5jlWzcWRqzXnakucuXV.y1KruEms2tp97JOcEyYpyvOSMLpZKf'
//   )
// console.log(x)
 
// }

// check()
