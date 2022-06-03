import * as Api from "/api.js";
// import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const token = sessionStorage.getItem("token");
console.log(token);
const login = document.getElementById("login");
const userDetail = document.getElementById("userDetail");
const productPrice = document.getElementById("productPrice");
const productName = document.getElementById("productName");
const productDetail = document.getElementById("productDetail");

console.log(login);

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  const data = await getDataFromApi();
  insertTextToLanding(data);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  login.addEventListener("click", loginout);
  //   userDetail.addEventListener("click", user);
}

function insertTextToLanding(data) {
  if (token === "null" || !token) {
    userDetail.innerHTML = "회원가입";
    userDetail.href = "/register";
    login.innerHTML = "로그인";
  } else {
    userDetail.innerHTML = "계정관리";
    userDetail.href = "";
    login.innerHTML = "로그아웃";
  }

  productDetail.innerHTML = data.content;
  productPrice.innerText = `${data.price}원`;
  productName.innerHTML = data.name;
}

function loginout() {
  if (token === "null" || !token) {
    location.href = "/login";
  } else {
    sessionStorage.removeItem("token");
    location.reload();
  }
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const URLSearch = new URLSearchParams(location.search);
  const id = URLSearch.get("id");
  const data = await Api.get(`/api/product/detail`, id);
  console.log(data);
  return data;
  // console.log({ data });
}
