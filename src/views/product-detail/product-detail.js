import * as Api from "/api.js";
import { $, getToken } from "/utils.js";
import * as Cart from "/cart_fnc.js";
import header from "/header.js";

// 요소(element), input 혹은 상수
const token = sessionStorage.getItem("token");

const buttonBuy = $("#buttonBuy");
const productPrice = $("#productPrice");
const productName = $("#productName");
const productDetail = $("#productDetail");
const buttonBasket = $("#buttonBasket");
const headerParent = $("body");
const data = await getDataFromApi();
const productSize = $("#productSize");
const Img = $("#productImg");
const sizeOption = $("#sizeOption");
let quantity = Number($("#quantity").value);
const quantityField = $("#quantity");
let size = productSize.value;
// console.log(size);
getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  header(headerParent);
  landingRender(data);
  header(headerParent);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  buttonBuy.addEventListener("click", order);
  buttonBasket.addEventListener("click", addCart);
  quantityField.addEventListener("change", () => {
    quantity = Number(quantityField.value);
    console.log(quantity);
  });
  productSize.addEventListener("change", () => {
    size = productSize.value;
    console.log(size);
  });
}

function landingRender(data) {
  // if (token === "null" || !token) {
  //   login.innerHTML = "로그인";
  // } else {
  //   login.innerHTML = "로그아웃";
  // }
  // console.log(data.size)
  productDetail.innerHTML = data.content;
  productPrice.innerHTML = `${data.price}원`;
  productName.innerHTML = data.name;
  Img.src = data.Img;
  // productSize

  for (let i = 0; i < data.size.length; i++) {
    let sizeSelect = document.createElement("option");
    sizeSelect.innerText = data.size[i].name;
    productSize.appendChild(sizeSelect);
  }
}

function order() {
  if (localStorage.getItem("order")) {
    return alert("오류가 있습니다");
  }
  if (getToken() === "null" || !getToken()) {
    alert("유저만 주문할 수 있습니다. 로그인 해주세요.");
    window.location.href = "/login";
    return;
  }
  if (size === "null") {
    alert("사이즈를 선택해 주세요.");
    return;
  }
  Cart.add(data, size, quantity, "order");
  //   sessionStorage.setItem(
  //     `order`,
  //     JSON.stringify({
  //       productId: data._id,
  //       quantity,
  //       size,
  //       price: Number(data.price) * quantity,
  //     })
  //   );
  //   location.href = "/order?direct=true ";
  //   console.log(JSON.parse(sessionStorage.getItem(`order`)));
  // }
  location.href = "/order ";
}

function addCart() {
  if (size === "null") {
    alert("사이즈를 선택해 주세요.");
    return;
  }
  if (Cart.exists(data._id)) {
    alert(`이미존재합니다. 추가하시겠습니까?`);
  }
  Cart.add(data, size, quantity, "cart");
}
//'api/product/detail/:id'
//서버에 상품 디테일 요청
async function getDataFromApi() {
  const URLSearch = new URLSearchParams(location.search);
  //(?id=여기부분)
  const id = URLSearch.get("_id");
  const data = await Api.get(`/api/product/detail`, id);
  console.log(data);
  return data;
}

// const test = await Api.get("/api/category");
// console.log('------------')
// console.log(test);
// console.log('------------')
