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
      city
      isPremium
      premiumAmmount90
      premiumAmmount180
      premiumAmmount360
    }
  }
`;

const updateUserPremiumDetails = gql`
  mutation updateUser(
    $premiumStartDate: DateTime!
    $premiumExpireDate: DateTime!
    $id: ID!
  ) {
    updateUser(
      data: {
        premiumStartDate: $premiumStartDate
        premiumExpireDate: $premiumExpireDate
      }
      where: { id: $id }
    ) {
      premiumExpireDate
      premiumStartDate
    }
  }
`;


module.exports = { getRenoCommission, getCity, updateUserPremiumDetails };
