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
const size = "free";

getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  landingRender(data);
  header(headerParent);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  buttonBuy.addEventListener("click", order);
  buttonBasket.addEventListener("click", addCart);
}

function landingRender(data) {
  productDetail.innerHTML = data.content;
  productPrice.innerHTML = `${data.price}원`;
  productName.innerHTML = data.name;
}

function order() {
  if (sessionStorage.getItem("order")) {
    return alert("오류가 있습니다");
  }
  if (getToken() === "null" || !getToken()) {
    alert("유저만 주문할 수 있습니다. 로그인 해주세요.");
    window.location.href = "/login";
    return;
  }
  const quantity = 2;
  Cart.add(data, quantity, "order");
  location.href = "/order ";
}

function addCart() {
  if (Cart.exists(data._id, "cart")) {
    alert(`이미존재합니다. 추가하시겠습니까?`);
    Cart.add(data, 2, "cart");
    console.log(Cart.list("cart"));
    return;
  }
  Cart.add(data, 2, "cart");
  console.log(Cart.list("cart"));
  alert("장바구니에 추가되었습니다.");
}
//'api/product/detail/:id'
//서버에 상품 디테일 요청
async function getDataFromApi() {
  const URLSearch = new URLSearchParams(location.search);
  //(?id=여기부분)
  const id = URLSearch.get("_id");
  const data = await Api.get(`/api/product`, id);
  console.log(data);
  return data;
}
