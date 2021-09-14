
// get data from api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
    // console.log(products);
  const allProducts = products.map((pd) => pd);

    for (const product of allProducts) {
        // console.log(product);
      const image = product.image;
    //   console.log(image);
      
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h5 class="fs-6">Average rating: <span class="fw-bold fs-5">${product.rating.rate}</span></h5>
          <h5 class="fs-6">Rated-by: <span class="fw-bold fs-5">${product.rating.count}</span> customer</h5>
          <h4 class="mt-4">Price: $ ${product.price}</h4>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-secondary" onclick="getSingleProduct(${product.id})">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// get single product by id
const getSingleProduct = id => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayProductDetail(data))
}
// display Product Detail
const displayProductDetail = product => {
    // console.log(product);

    const parentCall = document.getElementById('show-detail');
    parentCall.textContent='';
    const div = document.createElement('div');
    div.classList.add('col-6');

    div.style.border = '2px solid blue';
    div.style.borderRadius = '20px';
    div.style.paddingTop = '10px';
  
    div.innerHTML = `
        <div>
        <img class="product-image" src=${product.image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p><span class="fw-bold fs-5">Description: </span>${product.description}</p>
        <span>Rating: <span class="fw-bold fs-5">${product.rating.rate}</span></span>,
        <span>Ratedby: <span class="fw-bold fs-5">${product.rating.count}</span> customer</span>
        <h2 class="mt-3">Price: $ ${product.price}</h2>
    `
    parentCall.appendChild(div);
}

// Total Added-Products
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal();
};

// function to get price, delivery-charge & tax
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    // console.log(element);
    const converted = parseFloat(element);
    console.log('converted',converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
    const price = getInputValue("price");
    // console.log('price',price);

    const deliveryCharge = getInputValue("delivery-charge");
    // console.log('deliveryCharge',deliveryCharge);

    const tax = getInputValue("total-tax");
    // console.log('tax',tax);

    const grandTotal = price + deliveryCharge + tax;
    // console.log('grandTotal',grandTotal);

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};