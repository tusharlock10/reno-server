const gql = require("graphql-tag");

const getBrandTiles = gql`
  query getBrandTiles($typeName: String!) {
    restaurantTypes(where: { typeName_contains: $typeName }) {
      imageurl
      type
      id
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

// const typeRestaurants = gql`
//   query Restaurants($type: String!, $city: String!, $time: String!) {
//     restaurantTypes(where: { type_contains: $type }) {
//       restaurantses(where: { city_contains: $city }) {
//         id
//         name
//         city
//         rating
//         state
//         imageurl
//         googlemapsurl
//         address
//         timeDiscounts(orderBy: time_ASC, where: { time_gt: $time }) {
//           id
//           time
//           day
//           newdiscount
//           exhausted
//           discount
//           daychange
//         }
//       }
//     }
//   }
// `;

const typeRestaurants = gql`
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

const orderses = gql`
  query orderses($facebookID: String!) {
    users(where: { facebookID: $facebookID }) {
      orderses {
        id
        name
        mobile
        people
        date
        unlockActive
        confirmed
        timeDiscount {
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
  }
`;

const cities = gql`
  query {
    cities {
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
  typeRestaurants,
  orderses,
  cities,
  getMisc,
};
