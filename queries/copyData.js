const gql = require("graphql-tag");

// ADS
const updateAds = gql`
  mutation updateAds(
    $id: ID
    $city: String
    $imageurl: String
    $visible: Boolean
  ) {
    updateAds(
      where: { id: $id }
      data: { city: $city, imageurl: $imageurl, visible: $visible }
    ) {
      id
    }
  }
`;

// BLOGS
const updateBlog = gql`
  mutation updateBlog(
    $authorImg: String
    $authorName: String
    $content: String
    $createdon: DateTime
    $id: ID
    $summary: String
    $title: String
    $titleImg: String
  ) {
    updateBlog(
      where: { id: $id }
      data: {
        authorImg: $authorImg
        authorName: $authorName
        content: $content
        createdon: $createdon
        summary: $summary
        title: $title
        titleImg: $titleImg
      }
    ) {
      id
    }
  }
`;

// BRAND_TILE
const updateBrandTile = gql`
  mutation updateBrandTile(
    $id: ID
    $type: String
    $imageurl: String
    $order: Int
    $restaurantses: RestaurantsUpdateManyWithoutBrandTileInput
    $brandTileName: String
  ) {
    updateBrandTile(
      where: { id: $id }
      data: {
        type: $type
        imageurl: $imageurl
        order: $order
        restaurantses: $restaurantses
        brandTileName: $brandTileName
      }
    ) {
      id
    }
  }
`;

// CITY
const updatecity = gql`
  mutation updatecity(
    $city: String
    $isPremium: Boolean
    $id: ID
    $premiumAmmount90: Int
    $premiumAmmount180: Int
    $premiumAmmount360: Int
    $imageUrl: String
  ) {
    updatecity(
      where: { id: $id }
      data: {
        city: $city
        isPremium: $isPremium
        premiumAmmount90: $premiumAmmount90
        premiumAmmount180: $premiumAmmount180
        premiumAmmount360: $premiumAmmount360
        imageUrl: $imageUrl
      }
    ) {
      id
    }
  }
`;

// FRIDAY
const updateFriday = gql`
  mutation updateFriday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutFridayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutFridayInput
    $order: Int
  ) {
    updateFriday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// HOT_DEALS
const updateHotDeals = gql`
  mutation updateHotDeals(
    $id: ID
    $type: String
    $restaurantses: RestaurantsUpdateManyWithoutHotDealsesInput
    $imageurl: String
  ) {
    updateHotDeals(
      where: { id: $id }
      data: { type: $type, restaurantses: $restaurantses, imageurl: $imageurl }
    ) {
      id
    }
  }
`;

// MISC
const updateMisc = gql`
  mutation updateMisc($faq: String, $fup: String, $id: ID) {
    updateMisc(where: { id: $id }, data: { faq: $faq, fup: $fup }) {
      id
    }
  }
`;

// MONDAY
const updateMonday = gql`
  mutation updateMonday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutMondayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutMondayInput
    $order: Int
  ) {
    updateMonday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// TUESDAY
const updateTuesday = gql`
  mutation updateTuesday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutTuesdayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutTuesdayInput
    $order: Int
  ) {
    updateTuesday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// WEDNEDSAY
const updateWednesday = gql`
  mutation updateWednesday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutWednesdayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutWednesdayInput
    $order: Int
  ) {
    updateWednesday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// THURSDAY
const updateThursday = gql`
  mutation updateThursday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutThursdayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutThursdayInput
    $order: Int
  ) {
    updateThursday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// SATURDAY
const updateSaturday = gql`
  mutation updateThursday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutSaturdayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutSaturdayInput
    $order: Int
  ) {
    updateSaturday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// SUNDAY
const updateSunday = gql`
  mutation updateSunday(
    $exhausted: Boolean
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutSundayInput
    $timeDiscounts: TimeDiscountUpdateManyWithoutSundayInput
    $order: Int
  ) {
    updateSunday(
      where: { id: $id }
      data: {
        exhausted: $exhausted
        restaurants: $restaurants
        timeDiscounts: $timeDiscounts
        order: $order
      }
    ) {
      id
    }
  }
`;

// ORDERS
const updateOrders = gql`
  mutation updateOrders(
    $id: ID
    $restaurants: RestaurantsUpdateOneWithoutOrdersesInput
    $timeDiscount: TimeDiscountUpdateOneWithoutOrdersesInput
    $user: UserUpdateOneRequiredWithoutOrdersesInput
    $date: String
    $totalDiscount: Int
    $people: Int
    $bookingid: String
    $mobile: String
    $unlockActive: Boolean
    $name: String
    $confirmed: Boolean
    $geolocation: String
    $referrer: String
    $cancelled: Boolean
    $amount: Int
    $receipt: String
    $paymentId: String
    $paymentOrderId: String
    $paymentDescription: String
  ) {
    updateOrders(
      where: { id: $id }
      data: {
        restaurants: $restaurants
        timeDiscount: $timeDiscount
        user: $user
        date: $date
        totalDiscount: $totalDiscount
        people: $people
        bookingid: $bookingid
        mobile: $mobile
        unlockActive: $unlockActive
        name: $name
        confirmed: $confirmed
        geolocation: $geolocation
        referrer: $referrer
        cancelled: $cancelled
        amount: $amount
        receipt: $receipt
        paymentId: $paymentId
        paymentOrderId: $paymentOrderId
        paymentDescription: $paymentDescription
      }
    ) {
      id
    }
  }
`;

// RESTAURANT_TYPE
const updateRestaurantType = gql`
  mutation updateRestaurantType(
    $id: ID
    $restaurantses: RestaurantsUpdateManyWithoutRestaurantTypesInput
    $type: String
    $imageurl: String
    $order: Int
    $typeName: String
    $cityImage: String
    $activatePremium: Boolean
    $premiumPrice: Int
  ) {
    updateRestaurantType(
      where: { id: $id }
      data: {
        restaurantses: $restaurantses
        type: $type
        imageurl: $imageurl
        order: $order
        typeName: $typeName
        cityImage: $cityImage
        activatePremium: $activatePremium
        premiumPrice: $premiumPrice
      }
    ) {
      id
    }
  }
`;

// RESTAURANT
const updateRestaurants = gql`
  mutation updateRestaurants(
    $city: String
    $id: ID!
    $enableLoginAccess: Boolean
    $name: String!
    $email: String
    $password: String
    $orderses: OrdersUpdateManyWithoutRestaurantsInput
    $rating: Float
    $imageurl: String
    $googlemapsurl: String
    $restaurantTypes: RestaurantTypeUpdateManyWithoutRestaurantsesInput
    $state: String!
    $timeDiscounts: TimeDiscountUpdateManyWithoutRestaurantsInput
    $about: String
    $address: String
    $userReviewses: UserReviewsUpdateManyWithoutRestaurantsInput
    $hotDealses: HotDealsUpdateManyWithoutRestaurantsesInput
    $conditions: String
    $remail: String
    $rphone: RestaurantsUpdaterphoneInput
    $friday: FridayUpdateOneWithoutRestaurantsInput
    $monday: MondayUpdateOneWithoutRestaurantsInput
    $saturday: SaturdayUpdateOneWithoutRestaurantsInput
    $sunday: SundayUpdateOneWithoutRestaurantsInput
    $thursday: ThursdayUpdateOneWithoutRestaurantsInput
    $tuesday: TuesdayUpdateOneWithoutRestaurantsInput
    $wednesday: WednesdayUpdateOneWithoutRestaurantsInput
    $latitude: Float
    $longitude: Float
    $acceptsRenoPay: Boolean
    $renoCommision: Int
    $menu: RestaurantsUpdatemenuInput
    $brandTile: BrandTileUpdateOneWithoutRestaurantsesInput
    $restaurantImages: RestaurantsUpdaterestaurantImagesInput
  ) {
    updateRestaurants(
      where: { id: $id }
      data: {
        city: $city
        enableLoginAccess: $enableLoginAccess
        name: $name
        email: $email
        password: $password
        orderses: $orderses
        rating: $rating
        imageurl: $imageurl
        googlemapsurl: $googlemapsurl
        restaurantTypes: $restaurantTypes
        state: $state
        timeDiscounts: $timeDiscounts
        about: $about
        address: $address
        userReviewses: $userReviewses
        hotDealses: $hotDealses
        conditions: $conditions
        remail: $remail
        rphone: $rphone
        friday: $friday
        monday: $monday
        saturday: $saturday
        sunday: $sunday
        thursday: $thursday
        tuesday: $tuesday
        wednesday: $wednesday
        latitude: $latitude
        longitude: $longitude
        acceptsRenoPay: $acceptsRenoPay
        renoCommision: $renoCommision
        menu: $menu
        brandTile: $brandTile
        restaurantImages: $restaurantImages
      }
    ) {
      id
    }
  }
`;

// TIME_DISCOUNTS
const updateTimeDiscount = gql`
  mutation updateTimeDiscount(
    $discount: Float
    $id: ID
    $orderses: OrdersUpdateManyWithoutTimeDiscountInput
    $restaurants: RestaurantsUpdateOneWithoutTimeDiscountsInput
    $time: String
    $daychange: Boolean
    $day: Boolean
    $newtime: String
    $newdiscount: String
    $friday: FridayUpdateOneWithoutTimeDiscountsInput
    $monday: MondayUpdateOneWithoutTimeDiscountsInput
    $saturday: SaturdayUpdateOneWithoutTimeDiscountsInput
    $sunday: SundayUpdateOneWithoutTimeDiscountsInput
    $thursday: ThursdayUpdateOneWithoutTimeDiscountsInput
    $tuesday: TuesdayUpdateOneWithoutTimeDiscountsInput
    $wednesday: WednesdayUpdateOneWithoutTimeDiscountsInput
    $exhausted: Boolean
    $tueExhaust: Boolean
    $monExhaust: Boolean
    $wedExhaust: Boolean
    $thuExhaust: Boolean
    $friExhaust: Boolean
    $satExhaust: Boolean
    $sunExhaust: Boolean
    $monDiscount: Float
    $tueDiscount: Float
    $wedDiscount: Float
    $thuDiscount: Float
    $friDiscount: Float
    $satDiscount: Float
    $sunDiscount: Float
  ) {
    updateTimeDiscount(
      where: { id: $id }
      data: {
        discount: $discount
        orderses: $orderses
        restaurants: $restaurants
        time: $time
        daychange: $daychange
        day: $day
        newtime: $newtime
        newdiscount: $newdiscount
        friday: $friday
        monday: $monday
        saturday: $saturday
        sunday: $sunday
        thursday: $thursday
        tuesday: $tuesday
        wednesday: $wednesday
        exhausted: $exhausted
        tueExhaust: $tueExhaust
        monExhaust: $monExhaust
        wedExhaust: $wedExhaust
        thuExhaust: $thuExhaust
        friExhaust: $friExhaust
        satExhaust: $satExhaust
        sunExhaust: $sunExhaust
        monDiscount: $monDiscount
        tueDiscount: $tueDiscount
        wedDiscount: $wedDiscount
        thuDiscount: $thuDiscount
        friDiscount: $friDiscount
        satDiscount: $satDiscount
        sunDiscount: $sunDiscount
      }
    ) {
      id
    }
  }
`;

// USER
const updateUser = gql`
  mutation updateUser(
    $email: String
    $firstname: String
    $id: ID
    $facebookID: String
    $lastname: String
    $mobile: String
    $totalOrders: Int
    $orderses: OrdersUpdateManyWithoutUserInput
    $contactSync: Boolean
    $userReviewses: UserReviewsUpdateManyWithoutUserInput
    $isBlocked: Boolean
    $promoCode: String
    $userPromoCount: Int
    $typeAccess: String
    $password: String
    $installLocation: String
    $isPremiumUser: String
    $currentLocation: String
    $profileImage: String
    $bookingOtp: String
    $otpExpires: DateTime
    $premiumStartDate: DateTime
    $premiumExpireDate: DateTime
  ) {
    updateUser(
      where: { id: $id }
      data: {
        email: $email
        firstname: $firstname
        facebookID: $facebookID
        lastname: $lastname
        mobile: $mobile
        totalOrders: $totalOrders
        orderses: $orderses
        contactSync: $contactSync
        userReviewses: $userReviewses
        isBlocked: $isBlocked
        promoCode: $promoCode
        userPromoCount: $userPromoCount
        typeAccess: $typeAccess
        password: $password
        installLocation: $installLocation
        isPremiumUser: $isPremiumUser
        currentLocation: $currentLocation
        profileImage: $profileImage
        bookingOtp: $bookingOtp
        otpExpires: $otpExpires
        premiumStartDate: $premiumStartDate
        premiumExpireDate: $premiumExpireDate
      }
    ) {
      id
    }
  }
`;

// USER_REVIEWS
const updateUserReviews = gql`
  mutation updateUserReviews(
    $id: ID
    $review: String
    $rating: Int
    $restaurants: RestaurantsUpdateOneWithoutUserReviewsesInput
    $user: UserUpdateOneWithoutUserReviewsesInput
  ) {
    updateUserReviews(
      where: { id: $id }
      data: {
        review: $review
        rating: $rating
        restaurants: $restaurants
        user: $user
      }
    ) {
      id
    }
  }
`;

module.exports = {
  updateAds,
  updateBlog,
  updateBrandTile,
  updatecity,
  updateHotDeals,
  updateMisc,

  updateMonday,
  updateTuesday,
  updateWednesday,
  updateThursday,
  updateFriday,
  updateSaturday,
  updateSunday,

  updateOrders,
  updateRestaurantType,
  updateRestaurants,
  updateTimeDiscount,
  updateUser,
  updateUserReviews
};
