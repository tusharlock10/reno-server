const db = require("../db");
const {
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
} = require("../queries/copyData");

// const adses = require("../db/data/adses.json");
// const blogs = require("../db/data/blogs.json");
// const brandTiles = require("../db/data/brandTiles.json");
// const cities = require("../db/data/cities.json");
// const hotDealses = require("../db/data/hotDealses.json");
// const miscs = require("../db/data/miscs.json");

// const mondays = require("../db/data/mondays.json");
// const tuesdays = require("../db/data/tuesdays.json");
// const wednesdays = require("../db/data/wednesdays.json");
// const thursdays = require("../db/data/thursdays.json");
// const fridays = require("../db/data/fridays.json");
// const saturdays = require("../db/data/saturdays.json");
// const sundays = require("../db/data/sundays.json");

// const orderses = require("../db/data/orderses.json");
// const restaurantTypes = require("../db/data/restaurantTypes.json");
// const restaurantses = require("../db/data/restaurantses.json");
// const timeDiscounts = require("../db/data/timeDiscounts.json");
// const users = require("../db/data/users.json");
// const userReviewses = require("../db/data/userReviewses.json");

const updateAdsInDB = async () => {
  const results = [];
  for (let i = 0; i < adses.data.adses.length; i++) {
    const item = adses.data.adses[i];
    const result = await db.mutate({
      mutation: updateAds,
      variables: { ...item },
    });
    console.log(
      `UPDATE ORDERS : ${result.data.updateAds.id} ${i + 1}/${
        adses.data.adses.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED ADS \n");
  return results;
};

const updateBlogInDB = async () => {
  const results = [];
  for (let i = 0; i < blogs.data.blogs.length; i++) {
    const item = blogs.data.blogs[i];
    const result = await db.mutate({
      mutation: updateBlog,
      variables: { ...item, createdon: new Date(item.createdon) },
    });
    console.log(
      `UPDATE BLOGS : ${result.data.updateBlog.id} ${i + 1}/${
        blogs.data.blogs.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED BLOGS \n");
  return results;
};

const updateBrandTileInDB = async () => {
  const results = [];
  for (let i = 0; i < brandTiles.data.brandTiles.length; i++) {
    const item = brandTiles.data.brandTiles[i];
    const result = await db.mutate({
      mutation: updateBrandTile,
      variables: {
        ...item,
        restaurantses: { connect: item.restaurantses },
      },
    });
    console.log(
      `UPDATE BRAND_TILE : ${result.data.updateBrandTile.id} ${i + 1}/${
        brandTiles.data.brandTiles.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED BRAND_TILES \n");
  return results;
};

const updatecityInDB = async () => {
  const results = [];
  for (let i = 0; i < cities.data.cities.length; i++) {
    const item = cities.data.cities[i];
    const result = await db.mutate({
      mutation: updatecity,
      variables: { ...item },
    });
    console.log(
      `UPDATE CITY : ${result.data.updatecity.id} ${i + 1}/${
        cities.data.cities.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED CITIES \n");
  return results;
};

const updateHotDealsInDB = async () => {
  const results = [];
  for (let i = 0; i < hotDealses.data.hotDealses.length; i++) {
    const item = hotDealses.data.hotDealses[i];
    const result = await db.mutate({
      mutation: updateHotDeals,
      variables: {
        ...item,
        restaurantses: { connect: item.restaurantses },
      },
    });
    console.log(
      `UPDATE HOT_DEAL : ${result.data.updateHotDeals.id} ${i + 1}/${
        hotDealses.data.hotDealses.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED HOT_DEALS \n");
  return results;
};

const updateMiscInDB = async () => {
  const results = [];
  for (let i = 0; i < miscs.data.miscs.length; i++) {
    const item = miscs.data.miscs[i];
    const result = await db.mutate({
      mutation: updateMisc,
      variables: { ...item },
    });
    console.log(
      `UPDATE MISC : ${result.data.updateMisc.id} ${i + 1}/${
        miscs.data.miscs.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED MISCS \n");
  return results;
};

const updateMondayInDB = async () => {
  const results = [];
  for (let i = 0; i < mondays.data.mondays.length; i++) {
    const item = mondays.data.mondays[i];
    const result = await db.mutate({
      mutation: updateMonday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE MONDAY : ${result.data.updateMonday.id} ${i + 1}/${
        mondays.data.mondays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED MONDAYS \n");
  return results;
};

const updateTuesdayInDB = async () => {
  const results = [];
  for (let i = 0; i < tuesdays.data.tuesdays.length; i++) {
    const item = tuesdays.data.tuesdays[i];
    const result = await db.mutate({
      mutation: updateTuesday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE TUESDAY : ${result.data.updateTuesday.id} ${i + 1}/${
        tuesdays.data.tuesdays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED TUESDAYS \n");
  return results;
};

const updateWednesdayInDB = async () => {
  const results = [];
  for (let i = 0; i < wednesdays.data.wednesdays.length; i++) {
    const item = wednesdays.data.wednesdays[i];
    const result = await db.mutate({
      mutation: updateWednesday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE WEDNESDAY : ${result.data.updateWednesday.id} ${i + 1}/${
        wednesdays.data.wednesdays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED WEDNESDAYS \n");
  return results;
};

const updateThursdayInDB = async () => {
  const results = [];
  for (let i = 0; i < thursdays.data.thursdays.length; i++) {
    const item = thursdays.data.thursdays[i];
    const result = await db.mutate({
      mutation: updateThursday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE THURSDAY : ${result.data.updateThursday.id} ${i + 1}/${
        thursdays.data.thursdays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED THURSDAYS \n");
  return results;
};

const updateFridayInDB = async () => {
  const results = [];
  for (let i = 0; i < fridays.data.fridays.length; i++) {
    const item = fridays.data.fridays[i];
    const result = await db.mutate({
      mutation: updateFriday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE FRIDAY : ${result.data.updateFriday.id} ${i + 1}/${
        fridays.data.fridays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED FRIDAYS \n");
  return results;
};

const updateSaturdayInDB = async () => {
  const results = [];
  for (let i = 0; i < saturdays.data.saturdays.length; i++) {
    const item = saturdays.data.saturdays[i];
    const result = await db.mutate({
      mutation: updateSaturday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE SATURDAY : ${result.data.updateSaturday.id} ${i + 1}/${
        saturdays.data.saturdays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED SATURDAYS \n");
  return results;
};

const updateSundayInDB = async () => {
  const results = [];
  for (let i = 0; i < sundays.data.sundays.length; i++) {
    const item = sundays.data.sundays[i];
    const result = await db.mutate({
      mutation: updateSunday,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        timeDiscounts: { connect: item.timeDiscounts },
      },
    });
    console.log(
      `UPDATE SUNDAY : ${result.data.updateSunday.id} ${i + 1}/${
        sundays.data.sundays.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED SUNDAYS \n");
  return results;
};

const updateOrdersInDB = async () => {
  const results = [];
  for (let i = 0; i < orderses.data.orderses.length; i++) {
    const item = orderses.data.orderses[i];
    if (!item.user.id) {
      continue;
    }
    const result = await db.mutate({
      mutation: updateOrders,
      variables: {
        ...item,
        restaurants: item.restaurants?.id
          ? { connect: item.restaurants }
          : null,
        timeDiscount: item.timeDiscount?.id
          ? { connect: item.timeDiscount }
          : null,
        user: { connect: item.user },
      },
    });
    console.log(
      `UPDATE ORDERS : ${result.data.updateOrders.id} ${i + 1}/${
        orderses.data.orderses.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED ORDERS \n");
  return results;
};

const updateRestaurantTypeInDB = async () => {
  const results = [];
  for (let i = 0; i < restaurantTypes.data.restaurantTypes.length; i++) {
    const item = restaurantTypes.data.restaurantTypes[i];
    const result = await db.mutate({
      mutation: updateRestaurantType,
      variables: {
        ...item,
        restaurantses: { connect: item.restaurantses },
      },
    });
    console.log(
      `UPDATE RESTAURANT_TYPE : ${result.data.updateRestaurantType.id} ${i +
        1}/${restaurantTypes.data.restaurantTypes.length}`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED RESTAURANT_TYPES \n");
  return results;
};

const updateRestaurantsInDB = async () => {
  const results = [];
  for (let i = 0; i < restaurantses.data.restaurantses.length; i++) {
    const item = restaurantses.data.restaurantses[i];
    const result = await db.mutate({
      mutation: updateRestaurants,
      variables: {
        ...item,
        orderses: { connect: item.orderses },
        restaurantTypes: { connect: item.restaurantTypes },
        timeDiscounts: { connect: item.timeDiscounts },
        userReviewses: { connect: item.userReviewses },
        hotDealses: { connect: item.hotDealses },
        rphone: { set: item.rphone },
        friday: { connect: item.friday },
        monday: { connect: item.monday },
        saturday: { connect: item.saturday },
        sunday: { connect: item.sunday },
        thursday: { connect: item.thursday },
        tuesday: { connect: item.tuesday },
        wednesday: { connect: item.wednesday },
        menu: { set: item.menu },
        brandTile: { connect: item.brandTile },
        restaurantImages: { set: item.restaurantImages },
      },
    });
    console.log(
      `UPDATE RESTAURANTS : ${result.data.updateRestaurants.id} ${i + 1}/${
        restaurantses.data.restaurantses.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED RESTAURANTSES \n");
  return results;
};

const updateTimeDiscountInDB = async () => {
  const results = [];
  for (let i = 0; i < timeDiscounts.data.timeDiscounts.length; i++) {
    const item = timeDiscounts.data.timeDiscounts[i];
    const result = await db.mutate({
      mutation: updateTimeDiscount,
      variables: {
        ...item,
        orderses: { connect: item.orderses },
        restaurants: { connect: item.restaurants },
        friday: { connect: item.friday },
        monday: { connect: item.monday },
        saturday: { connect: item.saturday },
        sunday: { connect: item.sunday },
        thursday: { connect: item.thursday },
        tuesday: { connect: item.tuesday },
        wednesday: { connect: item.wednesday },
      },
    });
    console.log(
      `UPDATE TIME_DISCOUNT : ${result.data.updateTimeDiscount.id} ${i + 1}/${
        timeDiscounts.data.timeDiscounts.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED TIME_DISCOUNTS \n");
  return results;
};

const updateUserInDB = async () => {
  const results = [];
  for (let i = 0; i < users.data.users.length; i++) {
    const item = users.data.users[i];
    const result = await db.mutate({
      mutation: updateUser,
      variables: {
        ...item,
        orderses: { connect: item.orderses },
        userReviewses: { connect: item.userReviewses },
      },
    });
    console.log(
      `UPDATE USER : ${result.data.updateUser.id} ${i + 1}/${
        users.data.users.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED USERS \n");
  return results;
};

const updateUserReviewsInDB = async () => {
  const results = [];
  for (let i = 0; i < userReviewses.data.userReviewses.length; i++) {
    const item = userReviewses.data.userReviewses[i];
    const result = await db.mutate({
      mutation: updateUserReviews,
      variables: {
        ...item,
        restaurants: { connect: item.restaurants },
        user: { connect: item.user },
      },
    });
    console.log(
      `UPDATE USER_REVIEW : ${result.data.updateUserReviews.id} ${i + 1}/${
        userReviewses.data.userReviewses.length
      }`
    );
    results.push(result);
  }
  console.log("\nCOMPLETED USER_REVIEWS \n");
  return results;
};

module.exports = {
  async copyData(_, res, __) {
    let results = [];
    results.push(await updateAdsInDB());
    results.push(await updateBlogInDB());
    results.push(await updateBrandTileInDB());
    results.push(await updatecityInDB());
    results.push(await updateHotDealsInDB());
    results.push(await updateMiscInDB());

    results.push(await updateMondayInDB());
    results.push(await updateTuesdayInDB());
    results.push(await updateWednesdayInDB());
    results.push(await updateThursdayInDB());
    results.push(await updateFridayInDB());
    results.push(await updateSaturdayInDB());
    results.push(await updateSundayInDB());

    results.push(await updateOrdersInDB());
    results.push(await updateRestaurantTypeInDB());
    results.push(await updateRestaurantsInDB());
    results.push(await updateTimeDiscountInDB());
    results.push(await updateUserInDB());
    results.push(await updateUserReviewsInDB());

    res.json(results);
  },
};
