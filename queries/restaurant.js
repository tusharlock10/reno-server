const gql = require("graphql-tag");

const allRestaurantTypes = gql`
  query {
    restaurantTypes {
      type
      imageurl
      order
      id
      typeName
    }
  }
`;

const showSunday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      sunday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          sunExhaust
          sunDiscount
          day
          id
        }
      }
    }
  }
`;

const showMonday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      monday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          monExhaust
          monDiscount
          day
          id
        }
      }
    }
  }
`;

const showTuesday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      tuesday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          tueExhaust
          tueDiscount
          day
          id
        }
      }
    }
  }
`;

const showWednesday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      wednesday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          wedExhaust
          wedDiscount
          day
          id
        }
      }
    }
  }
`;

const showThursday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      thursday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          thuExhaust
          thuDiscount
          day
          id
        }
      }
    }
  }
`;

const showFriday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      friday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          friExhaust
          friDiscount
          day
          id
        }
      }
    }
  }
`;

const showSaturday = gql`
  query Restaurants($id: ID!, $time: String!) {
    restaurants(where: { id: $id }) {
      id
      name
      city
      rating
      state
      imageurl
      remail
      rphone
      googlemapsurl
      about
      conditions
      menu
      userReviewses {
        review
        rating
        user {
          firstname
          profileImage
        }
      }
      saturday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          satExhaust
          satDiscount
          day
          id
        }
      }
    }
  }
`;

const sunday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      sunday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          sunExhaust
          sunDiscount
          day
          id
        }
      }
    }
  }
`;

const monday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      monday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          monExhaust
          monDiscount
          day
          id
        }
      }
    }
  }
`;

const tuesday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      tuesday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          tueExhaust
          tueDiscount
          day
          id
        }
      }
    }
  }
`;

const wednesday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      wednesday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          wedExhaust
          wedDiscount
          day
          id
        }
      }
    }
  }
`;

const thursday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      thursday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          thuExhaust
          thuDiscount
          day
          id
        }
      }
    }
  }
`;

const friday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      friday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          friExhaust
          friDiscount
          day
          id
        }
      }
    }
  }
`;

const saturday = gql`
  query getRestaurant($city: String!, $time: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      acceptsRenoPay
      saturday {
        timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
          time
          satExhaust
          satDiscount
          day
          id
        }
      }
    }
  }
`;

const allRestaurants = gql`
  query allRestaurants($time: String!) {
    restaurantses {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      address
      latitude
      longitude
      timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
        id
        time
        day
        newdiscount
        exhausted
        discount
        daychange
      }
    }
  }
`;

const allRestaurantsInCity = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      address
      latitude
      longitude
      timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
        id
        time
        day
        newdiscount
        exhausted
        discount
        daychange
      }
    }
  }
`;

const getRestaurants = gql`
  query {
    restaurantses {
      id
      address
    }
  }
`;

const updateRestaurantRating = gql`
  mutation Restaurants($id: ID!, $rating: Float!) {
    updateRestaurants(data: { rating: $rating }, where: { id: $id }) {
      rating
    }
  }
`;

const updateRestaurantGeoCode = gql`
  mutation Restaurants($id: ID!, $longitude: Float!, $latitude: Float!) {
    updateRestaurants(
      data: { latitude: $latitude, longitude: $longitude }
      where: { id: $id }
    ) {
      longitude
      latitude
    }
  }
`;

module.exports = {
  allRestaurantTypes,
  updateRestaurantRating,
  allRestaurants,
  allRestaurantsInCity,
  updateRestaurantGeoCode,
  getRestaurants,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  showSunday,
  showMonday,
  showTuesday,
  showWednesday,
  showThursday,
  showFriday,
  showSaturday,
};
