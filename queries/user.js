const gql = require("graphql-tag");

//facebookID -> (google,fb,guest id)
const createUser = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String
    $profileImage: String
    $facebookID: String!
  ) {
    createUser(
      data: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        facebookID: $facebookID
        profileImage: $profileImage
      }
    ) {
      id
      firstname
      lastname
      email
    }
  }
`;

const getUser = gql`
  query getUser($facebookID: String!) {
    users(where: { facebookID: $facebookID }) {
      firstname
      lastname
      email
      profileImage
      createdAt
      facebookID
      id
      mobile
      contactSync
      isBlocked
      promoCode
      userPromoCount
      installLocation
      currentLocation
      renoPass {
        id
        premiumExpireDate
        premiumStartDate
      }
    }
  }
`;

const updateUserInstallLocations = gql`
  mutation updateUser($installLocation: String!, $id: ID!) {
    updateUser(
      data: { installLocation: $installLocation }
      where: { id: $id }
    ) {
      id
      installLocation
    }
  }
`;

const updateUserCurrentLocations = gql`
  mutation updateUser($currentLocation: String!, $id: ID!) {
    updateUser(
      data: { currentLocation: $currentLocation }
      where: { id: $id }
    ) {
      id
      currentLocation
    }
  }
`;

const updateUserProfileImage = gql`
  mutation updateUser($profileImage: String!, $id: ID!) {
    updateUser(data: { profileImage: $profileImage }, where: { id: $id }) {
      id
    }
  }
`;

module.exports = {
  createUser,
  getUser,
  updateUserInstallLocations,
  updateUserCurrentLocations,
  updateUserProfileImage,
};
