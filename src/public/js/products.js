(async function () {
    console.log('Page loaded 1');
    console.log('Page loaded 2');
    console.log('Page loaded 3');
    console.log('Page loaded 4');

    await getProducts();
}())

async function getProducts() {

    const productsLoaderDOM = document.getElementById('products-loader');
    const productListDOM = document.getElementById('product-list');
    productsLoaderDOM.classList.remove('d-none');
    productListDOM.classList.add('d-none');

    const productsRaw = await fetch('/api/products');
    const products = await productsRaw.json();

    // for (let i = 0; i < products.length; i++) {
    //     const product = products[i];
    // }
    let productList = '';
    products.forEach(product => {
        const discount = ((product.price - product.discountedPrice) / product.price) * 100;
        const template = `<div class="col-sm-6 col-lg-3 d-flex justify-content-center position-relative">
            <a href="product-detail.html?id=${product.id}">
                <figure>
                    <div class="img-wrapper">
                        <img src="./assets/img/${product.imageURL}" class="img-thumbnail category-img" alt="Men's Clothings">
                    </div>
                    <figcaption>
                        <div>${product.name}</div>
                        <span>₹${product.price}/-</span>
                        <span class="text-decoration-line-through text-muted">₹${product.discountedPrice}/-</span>
                        <span class="text-danger">(${discount}% OFF)</span>
                    </figcaption>
                </figure>
            </a>
            <button class="btn btn-danger btn-icon position-top-right" onclick="deleteProduct(${product.id})">
                <i class="bi bi-dash-circle"></i>
            </button>
        </div>`;
        productList += template;
    });

    productsLoaderDOM.classList.add('d-none');

    productListDOM.innerHTML = productList;
    productListDOM.classList.remove('d-none');
}

async function deleteProduct(productId) {
    const productsLoaderDOM = document.getElementById('products-loader');
    const productListDOM = document.getElementById('product-list');
    productsLoaderDOM.classList.remove('d-none');
    productListDOM.classList.add('d-none');

    await fetch(`/api/products/${productId}`, {
        method: 'delete'
    });
    await getProducts();
}