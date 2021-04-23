const axios = require("axios");

module.exports = {
  //send otp for booking
  async sendOtp(otp, number) {
    // if (process.env.__DEV__) {
    //   return null;
    // }
    await axios.default.get("https://api.msg91.com/api/v5/otp", {
      params: {
        mobile: `+91${number}`,
        template_id: process.env.msg91OTPTemplate,
        authkey: process.env.msg91Key,
      },
      data: { otp },
    });
  },

  //send otp for login
  async bookingConfirmation(userData, bookingData) {
    // if (process.env.__DEV__) {
    //   return null;
    // }
    const { restaurants, timeDiscount } = bookingData;
    const { people, mobile, name, date } = userData;
    await axios({
      method: "POST",
      url: "https://api.msg91.com/api/sendhttp.php",
      params: {
        sender: "RENOIN",
        message: `Thank you for booking with Reno! Your booking has been placed  successfully.
        Booking details: Name: ${name}.
        Restaurant: ${restaurants.name}. 
        Date: ${date}.
        Time slot: ${timeDiscount.time}.
        Discount: ${timeDiscount.discount}.
        People: ${people} people.
        Note: Failing to show up without prior cancellation might get you into trouble as you will get blocked by our app after 2 such incidents. Thank you for your cooperation`,
        mobiles: `91${mobile}`,
        authkey: process.env.msg91Key,
      },
    });
  },
  async cancelBooking(cancelledOrder) {
    // if (process.env.__DEV__) {
    //   return null;
    // }
    const {
      name,
      mobile,
      people,
      date,
      restaurants,
      timeDiscount,
    } = cancelledOrder;
    await axios({
      method: "POST",
      url: "https://api.msg91.com/api/sendhttp.php",
      params: {
        sender: "RENOIN",
        message: `
        Your booking has been cancelled.
         Booking details: Name: ${name}.
         Restaurant: ${restaurants.name}. 
         Date: ${date}.
         Time slot: ${timeDiscount.time}.
         Discount: ${timeDiscount.discount}.
         People: ${people} people.
         `,
        mobiles: `91${mobile}`,
        authkey: process.env.msg91Key,
      },
    });
  },
};
