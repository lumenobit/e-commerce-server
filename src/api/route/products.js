const express = require('express');
const AppFileUtil = require('../util/file.util');

const productsRouter = express.Router();

// /api/users
// GET ALL PRODUCTS
productsRouter.get('/', (req, res) => {
    const search = req.query.s;
    let result = null;
    const products = AppFileUtil.getData('products');
    if (search) {
        result = products.filter(pd => { return pd.name.toLowerCase().startsWith(search.toLowerCase()) })
    } else {
        result = products;
    }
    res.send(result);
})

// /api/users/:id
// GET PRODUCTS BY ID
productsRouter.get('/:id', (req, res) => {
    const productId = req.params.id;
    const products = AppFileUtil.getData('products');
    let product = products.find((pd) => { return pd.id == productId });
    if (!product) {
        res.status(404).send({ message: 'Product Not Found!' });
    } else {
        res.send(product);
    }
})

// /api/users
// CREATE PRODUCT
productsRouter.post('/', (req, res) => {
    const product = req.body;
    const products = AppFileUtil.getData('products');
    const lastId = products[products.length - 1].id;
    product.id = lastId + 1;
    products.push(product);
    AppFileUtil.writeData('products', products);
    res.send({ message: 'New product information saved!' });
})

// UPDATE A PRODUCT
// DELETE A PRODUCT

productsRouter.delete('/:id', (req, res) => {
    const products = AppFileUtil.getData('products');
    const product = products.splice(products.findIndex((st) => { return st.id == req.params.id }), 1);
    AppFileUtil.writeData('products', products);
    res.send({ message: 'Updating information for - ' + product.name });
})

module.exports = productsRouter