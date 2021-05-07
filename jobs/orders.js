const CronJob = require("cron").CronJob;
const db = require("../db");
const {
  getAllOrders,
  updateDisputeOrder,
  updateDisputeOrderUser,
} = require("../queries/order");
const moment = require("moment");

let badOrders = 0;

const _disputeOrder = async (order) => {
  // if order is confirmed or already in dispute or cancelled, then skip
  if (order.confirmed || order.hasPaymentDispute || order.cancelled) return;

  // if the deal is not unlocked withing the expiry time, then dispute the order
  if (
    !order?.timeDiscount ||
    !order?.id ||
    !order?.user?.id ||
    !order?.date ||
    !order.hasOwnProperty("unlockActive")
  ) {
    badOrders++;
    return;
  }

  const [hour, minute] = order.timeDiscount.time.split("-")[1].split(":");
  const expiryTime = moment(order.date)
    .set("hour", hour)
    .set("minute", minute);
  const disputeExpiry = expiryTime.add(6, "hour");

  let isDisputed = false;

  if (moment() > expiryTime && !order.unlockActive) {
    // means the order has expired and the deal is not unlocked
    // set the order to disputed
    isDisputed = true;
  } else if (moment() > disputeExpiry && order.unlockActive) {
    // means if the user has unlocked the deal and has not paid within 6 hours
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
    } catch (e) {
      console.log(e);
      console.log("BAD ID ORDER : ", order);
      badOrders++;
    }
  }
};

const checkPaymentDisputeOrders = async () => {
  // runs every 30th minute and checks for all payment dispute orders
  // marks the orders disputed and changes the user's hasPaymentDispute to true

  // fetch all orders
  const orders = (await db.query({ query: getAllOrders })).data.orderses;

  badOrders = 0;

  // check if the order is expired
  for (let i = 0; i < orders.length; i++) {
    await _disputeOrder(orders[i]);
  }

  console.log("Completed checkPaymentDisputeOrders");
};

module.exports = {
  // every 30th minute
  checkPaymentDisputeOrders: new CronJob(
    "*/30 * * * *",
    checkPaymentDisputeOrders
  ),
};
