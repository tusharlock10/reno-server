"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Ads",
    embedded: false
  },
  {
    name: "Blog",
    embedded: false
  },
  {
    name: "BrandTile",
    embedded: false
  },
  {
    name: "Contacts",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "Friday",
    embedded: false
  },
  {
    name: "HotDeals",
    embedded: false
  },
  {
    name: "Misc",
    embedded: false
  },
  {
    name: "Monday",
    embedded: false
  },
  {
    name: "Orders",
    embedded: false
  },
  {
    name: "RestaurantType",
    embedded: false
  },
  {
    name: "Restaurants",
    embedded: false
  },
  {
    name: "Saturday",
    embedded: false
  },
  {
    name: "Sunday",
    embedded: false
  },
  {
    name: "Thursday",
    embedded: false
  },
  {
    name: "TimeDiscount",
    embedded: false
  },
  {
    name: "Tuesday",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserReviews",
    embedded: false
  },
  {
    name: "Wednesday",
    embedded: false
  },
  {
    name: "city",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://65.1.155.16:4466`
});
exports.prisma = new exports.Prisma();
