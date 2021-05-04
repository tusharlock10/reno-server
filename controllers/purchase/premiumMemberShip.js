const Razorpay = require("razorpay");
const uuid = require("uuid");
const {
  createRenoPass,
  updateUserRenoPass,
  getCity,
  getCityById,
} = require("../../queries/purchase");
const db = require("../../db");
const { razorpayKeyId, razorpayKeySecret } = process.env;

module.exports = {
  async createPremiumMembershipOrder(req, res, next) {
    // creates a payment order for razorpay
    const { amount, name, email, mobile } = req.body;

    const instance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const options = {
      amount: amount * 100, // give amount here in Paisa not Rupees
      currency: "INR",
      receipt: uuid.v4(),
      payment_capture: true,
    };

    instance.orders.create(options, (_, response) => {
      const result = {
        ...response,
        ...options,
        name,
        email,
        phoneNumber: mobile,
      };
      res.send(result);
    });
  },

  async confirmPremiumMembershipOrder(req, res) {
    const {
      city,
      days,
      amount,
      receipt,
      paymentOrderId,
      paymentDescription,
      paymentId,
    } = req.body;

    let premiumStartDate = new Date(Date.now());
    premiumStartDate = premiumStartDate.toISOString();
    let premiumExpireDate;
    if (days.includes("90"))
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 90);
    if (days.includes("180"))
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 180);
    if (days.includes("360"))
      premiumExpireDate = new Date(Date.now() + 86400 * 1000 * 360);

    premiumExpireDate = premiumExpireDate.toISOString();

    const cityResponse = await db.query({
      query: getCityById,
      variables: { city },
    });

    const cityId = cityResponse.data.cities[0].id;

    // after reno pass payment is confirmed
    // create a new reno pass record with this user id
    const variables = {
      user: req.user.id,
      city: cityId,
      premiumStartDate,
      premiumExpireDate,
      days,
      amount,
      receipt,
      paymentId,
      paymentOrderId,
      paymentDescription,
    };

    const response = (await db.mutate({
      mutation: createRenoPass,
      variables,
    })).data.createRenoPass;

    const renoPassId = response.id;

    // save the reno pass id in the user
    await db.mutate({
      mutation: updateUserRenoPass,
      variables: {
        id: req.user.id,
        renoPassId,
      },
    });

    res.json(response);
  },

  async getCityPremiumAmount(req, res, next) {
    const city = req.header("city");
    if (!city) {
      return res.json({ errors: "city not passed in headers" });
    }

    let cityData = await db.query({
      query: getCity,
      variables: { city },
    });

    res.json(cityData.data.cities[0]);
  },
};
