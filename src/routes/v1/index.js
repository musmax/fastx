const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const articleRoute = require('./article.route');
const mediaRoute = require('./media.route');
const uploadRoute = require('./upload.route');
const productRoute = require('./product.route');
const deliveryAddressRoute = require('./deliveryAddress.route');
const pickupAddressRoute = require('./pickupAddress.route');
const orderRoute = require('./order.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/articles',
    route: articleRoute,
  },
  {
    path: '/medias',
    route: mediaRoute,
  },
  {
    path: '/uploads',
    route: uploadRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/pickup-address',
    route: pickupAddressRoute,
  },
  {
    path: '/delivery-address',
    route: deliveryAddressRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
