const gql = require("graphql-tag");

const getRenoCommission = gql`
  query Restaurants($id: ID!) {
    restaurants(where: { id: $id }) {
      id
      renoCommision
    }
  }
`;

const getCity = gql`
  query getCity($city: [String!]!) {
    cities(where: { city_in: $city }) {
      id
      city
      isPremium
      premiumAmmount90
      premiumAmmount180
      premiumAmmount360
    }
  }
`;

const createRenoPass = gql`
  mutation createRenoPass(
    $user: ID!
    $city: ID!
    $premiumStartDate: DateTime!
    $premiumExpireDate: DateTime!
    $days: String!
    $amount: Int!
    $receipt: String!
    $paymentId: String!
    $paymentOrderId: String!
    $paymentDescription: String!
  ) {
    createRenoPass(
      data: {
        user: { connect: { id: $user } }
        city: { connect: { id: $city } }
        premiumStartDate: $premiumStartDate
        premiumExpireDate: $premiumExpireDate
        days: $days
        amount: $amount
        receipt: $receipt
        paymentId: $paymentId
        paymentOrderId: $paymentOrderId
        paymentDescription: $paymentDescription
      }
    ) {
      id
      premiumExpireDate
      premiumStartDate
    }
  }
`;

const updateUserRenoPass = gql`
  mutation updateUserRenoPass($id: ID!, $renoPassId: ID!) {
    updateUser(
      where: { id: $id }
      data: { renoPass: { connect: { id: $renoPassId } } }
    ) {
      id
    }
  }
`;

const getCityById = gql`
  query getCityId($city: String!) {
    cities(where: { city_contains: $city }) {
      id
    }
  }
`;

module.exports = {
  getRenoCommission,
  getCity,
  createRenoPass,
  updateUserRenoPass,
  getCityById,
};
