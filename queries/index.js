const gql = require("graphql-tag");

const getBrandTiles = gql`
  query getBrandTiles($typeName: String!) {
    restaurantTypes(where: { typeName_contains: $typeName }) {
      imageurl
      type
      id
      restaurantses {
        id
      }
    }
  }
`;

const showBrandTile = gql`
  query getBrandTile($restaurantTypeId: ID!, $time: String!) {
    restaurantTypes(where: { id: $restaurantTypeId }) {
      restaurantses {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
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
  }
`;

const searchRestaurant = gql`
  query searchRestaurant {
    restaurantses {
      id
      name
    }
  }
`;

const sundayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
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
  }
`;

const mondayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        monday {
          id
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
  }
`;

const tuesdayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        tuesday {
          id
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
  }
`;

const wednesdayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        wednesday {
          id
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
  }
`;

const thursdayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        thursday {
          id
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
  }
`;

const fridayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        friday {
          id
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
  }
`;

const saturdayTypeRestaurants = gql`
  query Restaurants($typeId: ID!, $city: String!, $time: String!) {
    restaurantTypes(where: { id: $typeId }) {
      restaurantses(where: { city_contains: $city }) {
        id
        name
        city
        rating
        state
        imageurl
        googlemapsurl
        address
        saturday {
          id
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
  }
`;

const orderses = gql`
  query orderses($facebookID: String!) {
    users(where: { facebookID: $facebookID }, orderBy: updatedAt_DESC) {
      orderses {
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
          acceptsRenoPay
        }
      }
    }
  }
`;

const cities = gql`
  query {
    cities {
      id
      city
      isPremium
      premiumAmmount90
      premiumAmmount180
      premiumAmmount360
      imageUrl
    }
  }
`;

const getMisc = gql`
  {
    miscs {
      id
      faq
      fup
      id
    }
  }
`;

module.exports = {
  getBrandTiles,
  showBrandTile,
  searchRestaurant,

  sundayTypeRestaurants,
  mondayTypeRestaurants,
  tuesdayTypeRestaurants,
  wednesdayTypeRestaurants,
  thursdayTypeRestaurants,
  fridayTypeRestaurants,
  saturdayTypeRestaurants,
  
  orderses,
  cities,
  getMisc,
};
