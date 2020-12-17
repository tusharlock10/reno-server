
# Reno node server 1.0

> Server for mobile app

This is node.js application using prisma database and graphql queries. 

## Quick Start

```
# Prisma d.b file in db folder
# this file is located in db/index.js(prisma end point)

 
```

```bash
# Install server dependencies
npm install

# Run Express from root
node index.js

```

## All Api

```
# Premium membership(use web view in mobile app to show razorpay html form wil be returned by server)

# reno pay(use web view in mobile app to show razorpay html form wil be returned by server)

# Authentication(login,signup->server will send email at signup,getUser profile)

# Nearby restaurant

# Confirm Booking and Cancel Booking

# show user order

# All restaurant of particular city(Index restaurant)

# Show restaurant

# Restaurant Types (eg. North indian,Continental)

# Show all the restaurants according to restaurant_type

# Show all the city and premium price

# Show all brandTiles(index brandtile)

# show restaurant of particular brandtile

# Get all restaurant names and id's for search purpose

## For more details goto route directory.................
 
```
## Api description

```
# Example of routes in (routes directory)

// @Route    GET '/api/v1/search'
// @desc     Getting all restaurant names and id's for search purpose
// @access   Public
router.get('/search', asyncErrorHandler(searchRestaurant));

// @Route    GET '/api/v1/orders'
// @desc    show user order
// @access   PRIVATE
router.get('/orders', isLoggedIn, asyncErrorHandler(userOrders));


# @access means is jsonweb Token(jwt) required in headers or not.

# Public means jwt not required

# Private means jwt is required in headers


 
```




## App Info

### Author

Vikram Singh,Vineet


### Version

1.0.0
