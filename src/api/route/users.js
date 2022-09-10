const express = require('express');
const AppFileUtil = require('../util/file.util');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
    const search = req.query.s;
    let result = null;
    const products = AppFileUtil.getData('products');
    if (search) {
        result = products.filter((pd) => { return pd.name.toLowerCase().startsWith(search.toLowerCase()) })
    } else {
        result = products;
    }
    res.send(result);
})

usersRouter.get('/:id', (req, res) => {
    const productID = req.params.id;
    const products = AppFileUtil.getData('products');
    let product = products.find((st) => { return pd.id == productId });
    if (!product) {
        res.status(404).send({ message: 'Product Not Found!' });
    } else {
        res.send(product);
    }

    res.send(params);
})

usersRouter.post('/', (req, res) => {
    const product = req.body;
    const products = AppFileUtil.getData('products');
    const lastId = products[products.length - 1].id;
    product.id = lastId + 1;
    products.push(product);
    AppFileUtil.writeData('products', products);
    res.send({ message: 'New product information saved!' });
})

module.exports = usersRouter