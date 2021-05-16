const { ApolloClient } = require("apollo-boost");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const { InMemoryCache } = require("apollo-cache-inmemory");

const link = createHttpLink({
  uri: "http://65.1.155.16:4466",
  fetch: fetch
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};

try {
  var client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  });

  console.log("Connected to DB");
} catch (error) {
  console.log(error);
  process.exit(1);
}

module.exports = client;
