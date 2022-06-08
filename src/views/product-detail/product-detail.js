import * as Api from "/api.js";
import { $, getToken } from "/utils.js";
import * as Cart from "/cart.js";

// 요소(element), input 혹은 상수
const token = sessionStorage.getItem("token");
const buttonBuy = $("#buttonBuy");
const login = $("#login");
const productPrice = $("#productPrice");
const productName = $("#productName");
const productDetail = $("#productDetail");
const buttonBasket = $("#buttonBasket");
const data = await getDataFromApi();
const productSize = $("#productSize");
const sizeOption=$("#sizeOption");
getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  landingRender(data);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  login.addEventListener("click", loginout);
  buttonBuy.addEventListener("click", order);
  buttonBasket.addEventListener("click", addCart);
}

function landingRender(data) {
  if (token === "null" || !token) {
    login.innerHTML = "로그인";
  } else {
    login.innerHTML = "로그아웃";
  }
  console.log(data.size)
  productDetail.innerHTML = data.content;
  productPrice.innerHTML = `${data.price}원`;
  productName.innerHTML = data.name;
  // productSize
  
  for(let i=0;i<data.size.length;i++){
    let sizeSelect=document.createElement("option");
    sizeSelect.innerText=data.size[i];
    productSize.appendChild(sizeSelect);
  }
}

function loginout() {
  if (token === "null" || !token) {
    location.href = "/login";
  } else {
    sessionStorage.removeItem("token");
    location.reload();
  }
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
  sessionStorage.setItem(
    `order`,
    JSON.stringify({
      productId: data._id,
      quantity,
      size,
      price: Number(data.price) * quantity,
    })
  );
  location.href = "/order?direct=true ";
  console.log(JSON.parse(sessionStorage.getItem(`order`)));
}

function addCart() {
  if (Cart.exists(data._id)) {
    alert(`이미존재합니다. 추가하시겠습니까?`);
    Cart.add(data, 2);
    Cart.add(data, 2);
    return;
  }
  Cart.add(data, 2);
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



const test = await Api.get("/api/category");
console.log('------------')
console.log(test);
console.log('------------')