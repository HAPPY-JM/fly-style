import * as Api from "/api.js";
import { $, getToken } from "/utils.js";
import * as Cart from "/cart_fnc.js";
import header from "/header.js";
import * as fnc from "/useful-functions.js";
const URLSearch = new URLSearchParams(location.search);
const category = URLSearch.get("category");
console.log(category);

// 요소(element), input 혹은 상수

const buttonBuy = $("#buttonBuy");
const productPrice = $("#productPrice");
const productName = $("#productName");
const productDetail = $("#productDetail");
const buttonBasket = $("#buttonBasket");
const headerParent = $("body");
const data = await getDataFromApi();
const productSize = $("#productSize");
const productImage = $("#productImage");
let quantity = Number($("#quantity").value);
const quantityField = $("#quantity");
const categorySection = $(".header-category-list");
let size = productSize.value;
// console.log(size);
getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  header(headerParent);
  landingRender(data);
  // header(headerParent);
}
// 카테고리 섹션 - 메뉴 리스트

const categoryData = await Api.get("/api/category");
console.log(categoryData);
// 카테고리목록에 넣을 데이터 변수
let categoryInnerData = "";
// 카테고리 넣을 함수 구현
function addCategoryListData(categoryData) {
  categoryInnerData += `<li><a href = /products?category=${categoryData.name}>${categoryData.name}</a></li>`;
}

categoryData.map((categoryData) => addCategoryListData(categoryData));
categorySection.innerHTML = categoryInnerData;
console.log(categorySection);

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
  productDetail.innerHTML = data.content;
  productPrice.innerHTML = `${fnc.addCommas(data.price)}원`;
  productName.innerHTML = data.name;

  // productSize

  for (let i = 0; i < data.size.length; i++) {
    let sizeSelect = document.createElement("option");
    sizeSelect.innerText = data.size[i].name;
    productSize.appendChild(sizeSelect);
  }
  productImage.innerHTML = `<img src="${data.Img}" alt="제품사진">`;
}

function order() {
  if (getToken() === "null" || !getToken()) {
    swal({
      icon: "warning",
      text: "유저만 주문할 수 있습니다. 로그인 해주세요.",
    });
    window.location.href = "/login";
    return;
  }
  if (size === "null") {
    swal({
      icon: "warning",
      text: "사이즈를 선택해 주세요.",
    });
    return;
  }
  if (Cart.list("order")) {
    Cart.clear("order");
  }
  Cart.add(data, size, quantity, "order");

  location.href = "/order ";
}

function addCart() {
  if (size === "null") {
    swal({
      icon: "warning",
      text: "사이즈를 선택해 주세요.",
    });
    return;
  }
  if (Cart.exists(data._id)) {
    swal({
      icon: "warning",
      text: "이미존재합니다. 추가하시겠습니까?",
    });
  }
  // 시연을 위한 임시 코드 추가 
  else if(!Cart.exists(data._id)){
    swal({
      icon: "success",
      text: "장바구니에 추가되었습니다.",
    });
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
