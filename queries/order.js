const gql = require("graphql-tag");

const createOrder = gql`
  mutation createOrders(
    $restaurantsId: ID!
    $timeDiscountId: ID!
    $userId: ID!
    $bookingid: String!
    $people: Int!
    $date: String!
    $mobile: String!
    $name: String!
    $referrer: String
  ) {
    createOrders(
      data: {
        restaurants: { connect: { id: $restaurantsId } }
        timeDiscount: { connect: { id: $timeDiscountId } }
        user: { connect: { id: $userId } }
        bookingid: $bookingid
        people: $people
        date: $date
        mobile: $mobile
        name: $name
        referrer: $referrer
      }
    ) {
      id
      date
      people
      restaurants {
        name
        city
        state
        imageurl
        rphone
        googlemapsurl
      }
      timeDiscount {
        time
        discount
      }
      bookingid
      mobile
      referrer
      name
      confirmed
      geolocation
    }
  }
`;

const deleteOrder = gql`
  mutation deleteOrders($id: ID!) {
    deleteOrders(where: { id: $id }) {
      id
      restaurants {
        name
      }
      timeDiscount {
        time
        discount
      }
      mobile
      name
      people
      date
    }
  }
`;

const bookingOtps = gql`
  mutation userOtp(
    $mobile: String!
    $id: ID!
    $bookingOtp: String!
    $otpExpires: DateTime!
  ) {
    updateUser(
      data: {
        mobile: $mobile
        bookingOtp: $bookingOtp
        otpExpires: $otpExpires
      }
      where: { id: $id }
    ) {
      mobile
    }
  }
`;

const checkOtp = gql`
  query getUser($id: ID!, $currentTime: DateTime!) {
    users(where: { id: $id, otpExpires_gt: $currentTime }) {
      otpExpires
      bookingOtp
    }
  }
`;

const updateUserOtpField = gql`
  mutation updateUser($id: ID!) {
    updateUser(
      data: { otpExpires: null, bookingOtp: null }
      where: { id: $id }
    ) {
      otpExpires
      bookingOtp
    }
  }
`;

const updateOrderUnlocked = gql`
  mutation updateOrder($orderId: ID!, $geolocation: String!) {
    updateOrders(
      where: { id: $orderId }
      data: { geolocation: $geolocation, unlockActive: true }
    ) {
      id
      name
      mobile
      people
      date
      unlockActive
      timeDiscount {
        time
        discount
      }
      restaurants {
        googlemapsurl
        name
        rating
        imageurl
        city
      }
    }
  }
`;

const updateOrderPaymentConfirmed = gql`
  mutation updateOrder(
    $orderId: ID!
    $amount: Int!
    $receipt: String!
    $paymentOrderId: String!
    $paymentDescription: String!
    $paymentId: String!
  ) {
    updateOrders(
      where: { id: $orderId }
      data: {
        amount: $amount
        receipt: $receipt
        paymentOrderId: $paymentOrderId
        paymentDescription: $paymentDescription
        paymentId: $paymentId
        confirmed: true
      }
    ) {
      id
      confirmed
      amount
      receipt
      paymentOrderId
      paymentDescription
      paymentId
      confirmed
    }
  }
`;

module.exports = {
  createOrder,
  deleteOrder,
  bookingOtps,
  checkOtp,
  updateUserOtpField,
  updateOrderUnlocked,
  updateOrderPaymentConfirmed,
};
