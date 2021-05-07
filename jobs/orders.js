const CronJob = require("cron").CronJob;
const db = require("../db");
const {
  getAllOrders,
  updateDisputeOrder,
  updateDisputeOrderUser,
} = require("../queries/order");
const moment = require("moment");

const _disputeOrder = async (order, index) => {
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
  const disputeExpiry = expiryTime.add(6, "hour");

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

checkPaymentDisputeOrders();

module.exports = {
  // every 30th minute
  checkPaymentDisputeOrders: new CronJob(
    "*/30 * * * *",
    checkPaymentDisputeOrders
  ),
};
