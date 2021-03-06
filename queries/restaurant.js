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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      sunday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      monday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      tuesday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      wednesday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      thursday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      friday {
        id
        exhausted
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
      restaurantImages
      googlemapsurl
      about
      conditions
      restaurantMenu
      userReviewses {
        id
        review
        rating
        user {
          id
          firstname
          profileImage
        }
      }
      saturday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      sunday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      monday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      tuesday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      wednesday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      thursday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      friday {
        id
        exhausted
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
      conditions
      hasPickup
      acceptsRenoPay
      saturday {
        id
        exhausted
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
      conditions
      hasPickup
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

const sundayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      sunday {
        id
        exhausted
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

const mondayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      monday {
        id
        exhausted
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

const tuesdayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      tuesday {
        id
        exhausted
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

const wednesdayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      wednesday {
        id
        exhausted
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

const thursdayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      thursday {
        id
        exhausted
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

const fridayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      friday {
        id
        exhausted
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

const saturdayNearbyRestaurants = gql`
  query allRestaurants($time: String!, $city: String!) {
    restaurantses(where: { city_contains: $city }) {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      conditions
      hasPickup
      address
      latitude
      longitude
      saturday {
        id
        exhausted
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
      id
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
      id
      longitude
      latitude
    }
  }
`;

module.exports = {
  allRestaurantTypes,
  updateRestaurantRating,
  allRestaurants,
  sundayNearbyRestaurants,
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
  sundayNearbyRestaurants,
  mondayNearbyRestaurants,
  tuesdayNearbyRestaurants,
  wednesdayNearbyRestaurants,
  thursdayNearbyRestaurants,
  fridayNearbyRestaurants,
  saturdayNearbyRestaurants,
};
