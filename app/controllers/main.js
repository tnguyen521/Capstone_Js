var product = new SanPhamService();
var cart = [];
var ProductList = [];

function setLocalStorage() {
  localStorage.setItem("CART", JSON.stringify(cart));
}
function getLocalStorage() {
  if (localStorage.getItem("CART") != null) {
    cart = JSON.parse(localStorage.getItem("CART"));
  }
}

function getListProducts() {
  var promise = product.layDanhSachSP();
  promise.then(function (result) {
    renderProduct(result.data);
    ProductList = result.data;
    renderCart();
  });
  promise.catch(function (error) {
    console.log("error");
  })

}
getListProducts();
getLocalStorage();

function renderProduct(mangSP) {
  var content = "";
  mangSP.map(function (sp) {
    content += `
        <figure class="snip1268">
        <div class="image">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample17.jpg" alt="sq-sample17" />
          <div class="icons">
            <a href="#">${sp.screen}</i></a>
            <a href="#"> ${sp.backCamera}</i></a>
            <a href="#"> ${sp.frontCamera}</i></a>
          </div>
          <a href="#" class="add-to-cart" onclick="addToCart(${sp.id})" >Add to Cart</a>
        </div>
        <figcaption>
          <h2>${sp.name}</h2>
          <p>${sp.desc}</p></p>
          <div class="price">$ ${sp.price} </div>
        </figcaption>
      </figure>`
  });
  document.querySelector("#productsList").innerHTML = content;
}
function renderCart() {
  var sum = 0;
  var content = "";
  cart.map(function (sp, index) {
    sum = sum + sp.quantity * sp.product.price;
    content += `
    <tr>
      <td class="w-25">
        <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
          class="img-fluid img-thumbnail" alt="Sheep">
      </td>
      <td>${sp.product.name}</td>
      <td>${sp.product.price}</td>
      <td class="qty"><i class="fa-sharp fa-solid fa-minus" onclick="minusProduct(${index})"></i> ${sp.quantity} <i class="fa-solid fa-plus" onclick="addToCart(${sp.product.id})"></i></td>
      <td>${sp.total}</td>
      <td>
        <a href="#" class="btn btn-danger btn-sm">
        <i class="fa-solid fa-trash" onclick="deleteProduct(${index})"></i>
        </a>
      </td>
    </tr>`
  });
  document.querySelector("#bodycart").innerHTML = content;
  document.querySelector("#sumcart").innerHTML = sum;
}

function addToCart(id) {
  var trung = false;
  var vt = -1;
  var cartItem = {
    product: ProductList[id - 1],
    quantity: 1,
    total: 0
  }

  // vt = cart.findIndex(function(sp){
  //   return cartItem.product.id == cart[i].product.id
  // })

  for (var i = 0; i < cart.length; i++) {
    if (cartItem.product.id == cart[i].product.id) {
      trung = true;
      vt = i;
    }
  }
  if (trung) {
    cart[vt].quantity = cart[vt].quantity + 1;
    cart[vt].total = cart[vt].quantity * cart[vt].product.price;
  } else {
    cartItem.total = cartItem.product.price;
    cart.push(cartItem);
  }
  setLocalStorage();
  renderCart();
}

function minusProduct(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity = cart[index].quantity - 1;
    cart[index].total = cart[index].quantity * cart[index].product.price;
    setLocalStorage();
    renderCart();
  }
}

function deleteProduct(index) {
  cart.splice(index, 1);
  setLocalStorage();
  renderCart();
}

function clearCart() {
  cart = [];
  setLocalStorage();
  renderCart();
}
console.log(cart);