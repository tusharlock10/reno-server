const gql = require("graphql-tag");

const createOrder = gql`
  mutation createOrders(
    $restaurantsId: ID!
    $timeDiscountId: ID!
    $userId: ID!
    $bookingid: String!
    $people: Int!
    $date: DateTime!
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
        id
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

const cancelOrder = gql`
  mutation cancelOrder($id: ID!) {
    updateOrders(where: { id: $id }, data: { cancelled: true }) {
      id
      name
      mobile
      people
      date
      unlockActive
      confirmed
      cancelled
      timeDiscount {
        id
        time
        discount
      }
      restaurants {
        id
        googlemapsurl
        name
        rating
        imageurl
        city
      }
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
      id
      mobile
    }
  }
`;

const checkOtp = gql`
  query getUser($id: ID!) {
    users(where: { id: $id }) {
      id
      otpExpires
      bookingOtp
    }
  }
`;

const updateUserOtpField = gql`
  mutation updateUser($id: ID!) {
    updateUser(
      data: { otpExpires: null, bookingOtp: null, hasActiveOrder: true }
      where: { id: $id }
    ) {
      id
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
        id
        time
        discount
      }
      restaurants {
        id
        googlemapsurl
        name
        rating
        imageurl
        city
        acceptsRenoPay
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

const updateUserActiveOrders = gql`
  mutation changeHasActiveOrder($id: ID!, $value: Boolean) {
    updateUser(where: { id: $id }, data: { hasActiveOrder: $value }) {
      id
    }
  }
`;

const getAllOrders = gql`
  query getAllOrders {
    orderses {
      id
      user {
        id
        hasPaymentDispute
      }
      confirmed
      unlockActive
      hasPaymentDispute
      date
      cancelled
      timeDiscount {
        time
      }
    }
  }
`;

const updateDisputeOrder = gql`
  mutation updateDisputeOrder($id: ID!) {
    updateOrders(where: { id: $id }, data: { hasPaymentDispute: true }) {
      id
    }
  }
`;

const updateDisputeOrderUser = gql`
  mutation updateDisputeOrderUser($id: ID!) {
    updateUser(where: { id: $id }, data: { hasPaymentDispute: true }) {
      id
    }
  }
`;

module.exports = {
  createOrder,
  cancelOrder,
  bookingOtps,
  checkOtp,
  updateUserOtpField,
  updateOrderUnlocked,
  updateOrderPaymentConfirmed,
  updateUserActiveOrders,
  getAllOrders,
  updateDisputeOrder,
  updateDisputeOrderUser,
};
