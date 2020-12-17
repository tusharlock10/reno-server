const gql = require('graphql-tag');

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
      namef
      city
      rating
      state
      imageurl
      googlemapsurl

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
  showSaturday
};
