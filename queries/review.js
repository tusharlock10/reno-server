const gql = require("graphql-tag");

const createUserReview = gql`
  mutation createUserReview(
    $userId: ID!
    $review: String!
    $restaurantsId: ID!
    $rating: Int!
  ) {
    createUserReviews(
      data: {
        user: { connect: { id: $userId } }
        review: $review
        restaurants: { connect: { id: $restaurantsId } }
        rating: $rating
      }
    ) {
      user {
        firstname
        lastname
      }
      review
      rating
    }
  }
`;
//ID="cjiblwnkpm7pj0197c9o5diei"
const getUserReview = gql`
  query getUserReview($restaurantsId: ID!) {
    restaurants(where: { id: $restaurantsId }) {
      userReviewses {
        id
        createdAt
        user {
          id
          firstname
          lastname
        }
        review
        rating
      }
    }
  }
`;

module.exports = { createUserReview, getUserReview };
