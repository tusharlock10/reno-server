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
      id
      review
      rating
    }
  }
`;

const updateUserReview = gql`
  mutation updateUserReview($reviewId: ID!, $review: String!, $rating: Int!) {
    updateUserReviews(
      data: { review: $review, rating: $rating }
      where: { id: $reviewId }
    ) {
      id
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

const getUserRestaurantReview = gql`
  query getUserReview($userId: ID!, $restaurantId: ID!) {
    userReviewses(
      where: { user: { id: $userId }, restaurants: { id: $restaurantId } }
    ) {
      id
      review
      rating
    }
  }
`;

module.exports = {
  createUserReview,
  updateUserReview,
  getUserReview,
  getUserRestaurantReview,
};
