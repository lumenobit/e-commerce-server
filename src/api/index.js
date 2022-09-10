const express = require('express');
const productsRouter = require('./route/products');
const usersRouter = require('./route/users');

const apiRouter = express.Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;