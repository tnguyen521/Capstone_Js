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
    ProductList = result.data;
    var a = document.getElementById("hang").value;
    if (a == 0) {
      renderProduct(result.data);
    } else if (a == 1) {
      var mangKQ = [];
      ProductList.map(function (sp) {
        var hangsp = sp.type.toLowerCase().replace(/\s/g, "");
        var viTri = hangsp.indexOf("iphone");
        if (viTri > -1) {
          mangKQ.push(sp);
        }
      });
      renderProduct(mangKQ);
    } else {
      var mangKQ = [];
      ProductList.map(function (sp) {
        var hangsp = sp.type.toLowerCase().replace(/\s/g, "");
        var viTri = hangsp.indexOf("samsung");
        if (viTri > -1) {
          mangKQ.push(sp);
        }
      });
      renderProduct(mangKQ);
    }

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
    content += `<div class="col hp">
    <div class="card h-100 shadow-sm">
          <img src="${sp.img}" class="card-img-top"
                alt="product.title" />
        <div class="label-top shadow-sm">
            <a class="text-white" href="#" >${sp.type}</a>
        </div>
        <div class="card-body">
            <div class="clearfix mb-3">
                <span class="float-start badge rounded-pill bg-success">${sp.price} $</span>
                <span class="float-end"><a href="#"
                        class="small text-muted text-uppercase aff-link">${sp.name}</a></span>
            </div>
            <h5 class="card-title">
                <p>Sreen: ${sp.screen} ,Front-Camera : ${sp.frontCamera} , Back-Camera : ${sp.backCamera} </p>
                <p>${sp.desc}</p>
            </h5>
            <div class="d-grid gap-2 my-4">
                <button class="btn btn-warning bold-btn" onclick="addToCart(${sp.id})">add to cart</button>
            </div>
        </div>
    </div>
</div>`
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
        <img src="${sp.product.img}"
          class="img-fluid img-thumbnail" alt="Sheep">
      </td>
      <td>${sp.product.name}</td>
      <td>${sp.product.price}</td>
      <td class="qty"> <div class="icon"><i class="fa-sharp fa-solid fa-minus" onclick="minusProduct(${index})"> </i> ${sp.quantity} <i class="fa-solid fa-plus" onclick="addToCart(${sp.product.id})"></i></div></td>
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

