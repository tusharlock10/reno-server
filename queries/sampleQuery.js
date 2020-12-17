import gql from "graphql-tag";

export const createUser = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String
    $facebookID: String!
    $installLocation: String
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      facebookID: $facebookID
      installLocation: $installLocation
    ) {
      id
      firstname
      lastname
      email
      installLocation
    }
  }
`;

export const convertGuestToUser = gql`
  mutation updateUser(
    $id: ID!
    $facebookID: String!
    $firstname: String!
    $lastname: String!
    $email: String
  ) {
    updateUser(
      id: $id
      facebookID: $facebookID
      firstname: $firstname
      lastname: $lastname
      email: $email
    ) {
      id
      firstname
      lastname
      email
    }
  }
`;

export const updatePremiumDetails = gql`
  mutation updatePremiumDetails(
    $id: ID!
    $isPremiumUser: Boolean!
    $premiumStartDate: DateTime!
  ) {
    updateUser(
      id: $id
      isPremiumUser: $isPremiumUser
      premiumStartDate: $premiumStartDate
    ) {
      id
      isPremiumUser
      premiumStartDate
    }
  }
`;

export const getUserData = gql`
  query User($id: ID!) {
    User(id: $id) {
      firstname
      lastname
      email
      createdAt
      isPremiumUser
      premiumStartDate
      totalOrders
    }
  }
`;

export const updateTotalOrders = gql`
  mutation updateUser($id: ID!, $totalOrders: Int!) {
    updateUser(id: $id, totalOrders: $totalOrders) {
      id
      totalOrders
    }
  }
`;

export const getContactSync = gql`
  query User($id: ID!) {
    User(id: $id) {
      contactSync
      firstname
      lastname
      email
    }
  }
`;

export const updateContactSync = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id, contactSync: true) {
      id
    }
  }
`;

export const updateUserInstallLocation = gql`
  mutation updateUser($id: ID!, $installLocation: String) {
    updateUser(id: $id, installLocation: $installLocation) {
      id
      installLocation
    }
  }
`;

export const updateUserCurrentLocation = gql`
  mutation updateUser($id: ID!, $currentLocation: String) {
    updateUser(id: $id, currentLocation: $currentLocation) {
      id
      currentLocation
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const deleteOrder = gql`
  mutation deleteOrders($id: ID!) {
    deleteOrders(id: $id) {
      id
    }
  }
`;

export const allRestaurants = gql`
  query {
    allRestaurantTypes {
      type
    }
  }
`;

export const showBrandtiles = gql`
  query ShowBrandtile {
    allRestaurantTypes {
      id
      imageurl
      type
      typeName
      cityImage
    }
  }
`;

export const UserDashboard = gql`
  query User($facebookID: String!) {
    User(facebookID: $facebookID) {
      firstname
      lastname
      id
      orderses {
        id
      }
    }
  }
`;

export const AllRestaurants = gql`
  query {
    allRestaurantTypes(filter: { typeName: null }) {
      id
      type
      imageurl
    }
  }
`;

export const getCityData = gql`
  query getCityData($nameOfCity: String!) {
    allRestaurantTypes(filter: { type: $nameOfCity }) {
      id
      type
      imageurl
      activatePremium
    }
  }
`;

export const ShowAds = gql`
  query ShowAds($city: String!) {
    allAdses(filter: { city: $city }) {
      visible
      imageurl
    }
  }
`;

export const AllOrders = gql`
  query Orders($id: ID!) {
    allOrderses(filter: { user: { id: $id } }) {
      createdAt
      id
      totalDiscount
      restaurants {
        id
        name
        imageurl
        address
        city
        googlemapsurl
        rphone
      }
      timeDiscount {
        time
        id
        discount
      }
      updatedAt
      user {
        firstname
        lastname
        id
      }
      date
      people
      bookingid
      mobile
      name
      confirmed
    }
  }
`;

export const GetRestaurants = gql`
  query Restaurants($id: ID!, $time: String!) {
    allRestaurantses(filter: { restaurantTypes_some: { id: $id } }) {
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
      userReviewses {
        user {
          firstname
          lastname
        }
        rating
        review
      }
      restaurantTypes {
        type
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
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
export const searchRestaurant = gql`
  query Restaurants($name: String!) {
    allRestaurantses(
      filter: {
        OR: [
          { name_contains: $name }
          { city_contains: $name }
          { state_contains: $name }
        ]
      }
    ) {
      id
      name
      city
      state
      imageurl
      googlemapsurl
      address
      rphone
      conditions
      about
      rating
      menu
      restaurantImage
    }
  }
`;

export const createOrders = gql`
  mutation createOrders(
    $restaurantsId: ID!
    $timeDiscountId: ID!
    $userId: ID!
    $bookingid: String!
    $people: Int!
    $date: String!
    $mobile: String!
    $name: String!
    $referrer: String!
    $totalDiscount: Int!
  ) {
    createOrders(
      restaurantsId: $restaurantsId
      timeDiscountId: $timeDiscountId
      userId: $userId
      bookingid: $bookingid
      people: $people
      date: $date
      mobile: $mobile
      name: $name
      referrer: $referrer
      totalDiscount: $totalDiscount
    ) {
      date
      people
      totalDiscount
      restaurants {
        name
        city
        state
      }
      timeDiscount {
        time
        discount
      }
      bookingid
    }
  }
`;

export const createUserReview = gql`
  mutation createUserReview(
    $userId: ID!
    $review: String!
    $restaurantsId: ID!
    $rating: Int!
  ) {
    createUserReviews(
      user: $userId
      review: $review
      restaurantsId: $restaurantsId
      rating: $rating
    ) {
      user {
        firstname
        lastname
      }
      review
      rating
      createdAt
    }
  }
`;

export const getUserReview = gql`
  query getUserReview($restaurantsId: ID!, $id: ID!) {
    Restaurants(id: $restaurantsId) {
      userReviewses {
        id
        user {
          firstname
          lastname
        }
        review
        rating
      }
    }
    User(id: $id) {
      isBlocked
    }
  }
`;

export const getMiscData = gql`
  query getMisc($id: ID!) {
    Misc(id: $id) {
      fup
      faq
    }
  }
`;

export const updateConfirmed = gql`
  mutation updateConfirmed(
    $id: ID!
    $geolocation: String!
    $unlockActive: Boolean!
  ) {
    updateOrders(
      id: $id
      confirmed: true
      geolocation: $geolocation
      unlockActive: $unlockActive
    ) {
      bookingid
      confirmed
      geolocation
      unlockActive
    }
  }
`;

export const FindAndDineQuery = gql`
  query($time: String!) {
    allRestaurantses {
      id
      name
      city
      rating
      state
      imageurl
      googlemapsurl
      about
      address
      conditions
      userReviewses {
        user {
          firstname
          lastname
        }
        rating
        review
      }
      restaurantTypes {
        type
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
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

export const Sunday = gql`
  query Sunday($time: String!, $id: ID, $first: Int, $after: String) {
    allSundays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Monday = gql`
  query Monday($time: String!, $id: ID, $first: Int, $after: String) {
    allMondays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Tuesday = gql`
  query Tuesday($time: String!, $id: ID, $first: Int, $after: String) {
    allTuesdays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Wednesday = gql`
  query Wednesday($time: String!, $id: ID, $first: Int, $after: String) {
    allWednesdays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Thursday = gql`
  query Thursday($time: String!, $id: ID, $first: Int, $after: String) {
    allThursdays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Friday = gql`
  query Friday($time: String!, $id: ID, $first: Int, $after: String) {
    allFridays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        time
        discount
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const Saturday = gql`
  query Saturday($time: String!, $id: ID, $first: Int, $after: String) {
    allSaturdays(
      filter: { restaurants: { restaurantTypes_some: { id: $id } } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        id
        time
        discount
        exhausted
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

/////////For Single Restaurants time slots

export const SundayOnly = gql`
  query Sunday($time: String!, $id: ID, $first: Int, $after: String) {
    allSundays(
      filter: { restaurants: { id: $id } }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const MondayOnly = gql`
  query Monday($time: String!, $id: ID) {
    allMondays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const TuesdayOnly = gql`
  query Tuesday($time: String!, $id: ID) {
    allTuesdays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const WednesdayOnly = gql`
  query Wednesday($time: String!, $id: ID) {
    allWednesdays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const ThursdayOnly = gql`
  query Thursday($time: String!, $id: ID) {
    allThursdays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const FridayOnly = gql`
  query Friday($time: String!, $id: ID) {
    allFridays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        exhausted
        time
        discount
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const SaturdayOnly = gql`
  query Saturday($time: String!, $id: ID) {
    allSaturdays(filter: { restaurants: { id: $id } }, orderBy: order_ASC) {
      restaurants {
        id
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        id
        monDiscount
        tueDiscount
        wedDiscount
        thuDiscount
        friDiscount
        satDiscount
        sunDiscount
        time
        discount
        exhausted
        monExhaust
        tueExhaust
        wedExhaust
        thuExhaust
        friExhaust
        satExhaust
        sunExhaust
      }
      exhausted
    }
  }
`;

export const getUserBlockedStatus = gql`
  query User($id: ID!) {
    User(id: $id) {
      isBlocked
    }
  }
`;

export const SundaySearch = gql`
  query Sunday($time: String, $name: String!, $first: Int, $after: String) {
    allSundays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const MondaySearch = gql`
  query Monday($time: String, $name: String!, $first: Int, $after: String) {
    allMondays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const TuesdaySearch = gql`
  query Tuesday($time: String, $name: String!, $first: Int, $after: String) {
    allTuesdays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const WednesdaySearch = gql`
  query Wednesday($time: String, $name: String!, $first: Int, $after: String) {
    allSundays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const ThursdaySearch = gql`
  query Thursday($time: String, $name: String!, $first: Int, $after: String) {
    allThursdays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const FridaySearch = gql`
  query Friday($time: String, $name: String!, $first: Int, $after: String) {
    allFridays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;

export const SaturdaySearch = gql`
  query Saturday($time: String, $name: String!, $first: Int, $after: String) {
    allSaturdays(
      filter: {
        restaurants: {
          OR: [
            { name_contains: $name }
            { city_contains: $name }
            { state_contains: $name }
          ]
        }
      }
      orderBy: order_ASC
      first: $first
      after: $after
    ) {
      id
      restaurants {
        id
        name
        city
        state
        imageurl
        googlemapsurl
        address
        rphone
        conditions
        about
        rating
        menu
        restaurantImage
      }
      timeDiscounts(orderBy: time_ASC, filter: { time_gt: $time }) {
        time
        discount
        id
        exhausted
      }
      exhausted
    }
  }
`;
