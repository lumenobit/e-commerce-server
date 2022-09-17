(async function () {
    const productsLoaderDOM = document.getElementById('product-detail-loader');
    const productDetailDOM = document.getElementById('product-detail');
    productsLoaderDOM.classList.remove('d-none');
    productDetailDOM.classList.add('d-none');


    const productId = location.search.substring(4);
    const productDetailRaw = await fetch(`/api/products/${productId}`);
    console.log(productDetailRaw);
    const productDetail = await productDetailRaw.json();

    const template = `
            <div class="col-md-4">
                <figure>
                    <div class="product-img-wrapper">
                        <img src="./assets/img/${productDetail.imageURL}" class="img-thumbnail" alt="Men's Clothings">
                    </div>
                </figure>
            </div>
            <div class="col-md-8">
                <div class="mb-5">
                    <h1 class="h2">${productDetail.name}</h1>
                    <p class="mb-1">${productDetail.description}</p>
                    <div class="d-inline-block border px-2">
                        ${productDetail.ratingCount} <i class="bi bi-star-fill text-success"></i>
                        <div class="divider-rating"></div> 233 Ratings
                    </div>
                    <hr>
                    <div class="h3 mb-0">
                        <span>₹${productDetail.price}/-</span>
                        <span class="text-decoration-line-through fw-normal text-muted">₹3000/-</span>
                        <span class="text-danger fw-normal">(20% OFF)</span>
                    </div>
                    <div class="text-success">inclusive of all taxes</div>
                    <div class="h5 mt-4">Select Size</div>
                    <div class="btn-list">
                        <button class="btn btn-outline-primary btn-round">S</button>
                        <button class="btn btn-outline-primary btn-round">M</button>
                        <button class="btn btn-outline-primary btn-round">L</button>
                        <button class="btn btn-outline-primary btn-round">XL</button>
                    </div>
                    <div class="btn-list mt-4">
                        <button class="btn btn-danger btn-lg px-5 mb-3 btn-responsive">
                            <i class="bi bi-bag-fill"></i> ADD TO BAG
                        </button>
                        <button class="btn btn-outline-dark btn-lg mb-3 btn-responsive">
                            <i class="bi bi-heart"></i> WISHLIST
                        </button>
                    </div>
                </div>
            </div>
        `;

    productDetailDOM.innerHTML = template;

    productsLoaderDOM.classList.add('d-none');
    productDetailDOM.classList.remove('d-none');
}())