const axios = require('axios');

module.exports = {
  //send otp for booking
  async sendOtp(otp, number) {
    await axios({
      method: 'POST',
      url: 'https://control.msg91.com/api/sendotp.php',
      params: {
        otp,
        sender: 'RENOIN',
        message: `Your verification code for booking is : ${otp}`,
        mobile: `91${number}`,
        authkey: process.env.msg91Key
      }
    });
  },

  //send otp for login
  async bookingConfirmation(userData, bookingData) {
    const { restaurants, timeDiscount } = bookingData;
    const { people, mobile, name, date } = userData;
    await axios({
      method: 'POST',
      url: 'https://api.msg91.com/api/sendhttp.php',
      params: {
        sender: 'RENOIN',
        message: `Thank you for booking with Reno! Your booking has been placed  successfully.
        Booking details: Name: ${name}.
        Restaurant: ${restaurants.name}. 
        Date: ${date}.
        Time slot: ${timeDiscount.time}.
        Discount: ${timeDiscount.discount}.
        People: ${people} people.
        Note: Failing to show up without prior cancellation might get you into trouble as you will get blocked by our app after 2 such incidents. Thank you for your cooperation`,
        mobiles: `91${mobile}`,
        authkey: process.env.msg91Key
      }
    });
  },
  async cancelBooking(cancelData) {
    const {
      name,
      mobile,
      people,
      date,
      restaurants,
      timeDiscount
    } = cancelData;
    await axios({
      method: 'POST',
      url: 'https://api.msg91.com/api/sendhttp.php',
      params: {
        sender: 'RENOIN',
        message: `
        Your booking has been canceled successfully.
         Booking details: Name: ${name}.
         Restaurant: ${restaurants.name}. 
         Date: ${date}.
         Time slot: ${timeDiscount.time}.
         Discount: ${timeDiscount.discount}.
         People: ${people} people.
         `,
        mobiles: `91${mobile}`,
        authkey: process.env.msg91Key
      }
    });
  }
};

