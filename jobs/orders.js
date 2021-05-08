const CronJob = require("cron").CronJob;
const db = require("../db");
const {
  getAllOrders,
  updateDisputeOrder,
  updateDisputeOrderUser,
  getAllUserOrders,
  updateActiveOrder,
} = require("../queries/order");
const moment = require("moment");

const _disputeOrder = async (order) => {
  // if order is confirmed or not unlocked or cancelled, then skip
  if (order.confirmed || order.cancelled || !order.unlockActive) return false;

  // if the deal is not unlocked within the expiry time, then dispute the order
  if (
    !order?.timeDiscount ||
    !order?.id ||
    !order?.user?.id ||
    !order?.date ||
    !order.hasOwnProperty("unlockActive")
  ) {
    return false;
  }

  const [hour, minute] = order.timeDiscount.time.split("-")[1].split(":");
  const expiryTime = moment(order.date)
    .set("hour", hour)
    .set("minute", minute);
  const disputeExpiry = moment(expiryTime).add(6, "hour");

  let isDisputed = false;

  if (moment() > disputeExpiry && order.unlockActive) {
    // means if the user has unlocked the deal and has not paid within 6 hours
    // the the order has dispute
    isDisputed = true;
  }

  if (isDisputed) {
    try {
      await db.mutate({
        mutation: updateDisputeOrder,
        variables: { id: order.id },
      });

      await db.mutate({
        mutation: updateDisputeOrderUser,
        variables: { id: order.user.id },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

const checkPaymentDisputeOrders = async () => {
  // runs every 30th minute and checks for all payment dispute orders
  // marks the orders disputed and changes the user's hasPaymentDispute to true

  // fetch all orders
  const orders = (await db.query({ query: getAllOrders })).data.orderses;

  // check if the order is expired
  const promises = orders.map(_disputeOrder);

  const results = await Promise.all(promises);
  const ordersModified = results.filter((result) => result).length;
  console.log("ORDERS MODIFIED : ", ordersModified);

  console.log("Completed checkPaymentDisputeOrders");
};

const _userHasActiveOrders = (orders) => {
  // return true/false based on if the user has upcoming orders
  let upcomingOrders = 0;

  orders.forEach((order) => {
    if (!order?.timeDiscount || !order?.date) {
      return;
    }

    const orderTime = order.timeDiscount.time.split("-")[1];
    const hours = orderTime.split(":")[0];
    const minutes = orderTime.split(":")[1];
    const orderExpiry = moment(order.date)
      .set("hours", hours)
      .set("minutes", minutes);

    const disputeExpiry = moment(orderExpiry).add(6, "hour");

    if (order.confirmed) {
    } else if (order.cancelled) {
    } else {
      // check if order is unlocked, is yes then add it in upcoming orders
      if (order.unlockActive) {
        // if order is unlocked and not paid within 6 hours, send to completedOrders
        if (disputeExpiry < moment()) {
        } else {
          upcomingOrders++;
          console.log("1", order);
        }
      } else if (orderExpiry < moment()) {
        // means the order date has passed and the user have not unlocked/ cancelled the order
      } else {
        upcomingOrders++;
      }
    }
  });

  return !!upcomingOrders;
};

const checkUserActiveOrders = async () => {
  // checks and updates if a user has active orders or not

  const { users } = (await db.query({ query: getAllUserOrders })).data;

  const promises = users.map(async (user) => {
    // check if the user has active order
    const hasActiveOrder = _userHasActiveOrders(user.orderses);
    if (user.hasActiveOrder !== hasActiveOrder) {
      // update the user's has active order
      await db.mutate({
        mutation: updateActiveOrder,
        variables: { id: user.id, hasActiveOrder },
      });
      return true;
    } else {
      return false;
    }
  });

  const results = await Promise.all(promises);
  const usersModified = results.filter((result) => result).length;
  console.log("USERS MODIFIED : ", usersModified);

  console.log("Completed checkPaymentDisputeOrders");
};

checkUserActiveOrders();

module.exports = {
  // every 30th minute
  checkPaymentDisputeOrders: new CronJob(
    "*/30 * * * *",
    checkPaymentDisputeOrders
  ),

  // every 30th minute
  checkUserActiveOrders: new CronJob("*/30 * * * *", checkUserActiveOrders),
};
