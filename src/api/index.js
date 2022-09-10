const express = require('express');
const productsRouter = require('./route/products');
const usersRouter = require('./route/users');

const apiRouter = express.Router();

// /api/products
apiRouter.use('/products', productsRouter);
// /api/users
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;