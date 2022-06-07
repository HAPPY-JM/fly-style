import * as Api from "/api.js";
import * as fnc from "/useful-functions.js";
import { $, getToken } from "/utils.js";

// 요소(element), input 혹은 상수

const buyButton = $("#buyButton");

getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  //  const data = await getDataFromApi();
  landingRender();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  buyButton.addEventListener("click", orderComplete);
}

function landingRender() {
  const URLSearch = new URLSearchParams(location.search);
  const id = URLSearch.get("direct");
  if (id) {
    const products = JSON.parse(sessionStorage.getItem(`order`));
    sessionStorage.removeItem("order");
    const { productId, quantity, size, price } = products;
    $("#productName").innerText = productId;
    $("#PriceTotal").innerText = size;
    $("#deliveryFee").innerText = quantity;
    $("#orderPriceTotal").innerText = price;
  }
}

async function orderComplete() {
  const name = $("#orderName").value;
  const phoneNumber = $("#orderPhoneNumber").value;
  const zoneCode = $("#zoneCode").value;
  const address1 = $("#orderAddress").value;
  const address2 = $("#addressDetail").value;
  const totalPrice = fnc.convertToNumber($("#orderPriceTotal").innerText);
  const comment = $("#orderRequest").value;
  const products = [
    {
      quantity: 2,
      productId: "629880390b9398828a062283",
    },
  ];
  console.log(
    name,
    phoneNumber,
    zoneCode,
    address1,
    address2,
    products,
    totalPrice,
    comment
  );

  try {
    const result = await Api.post("/api/order", {
      name,
      phoneNumber,
      Address: {
        zoneCode,
        address1,
        address2,
      },
      products,
      totalPrice,
      comment,
    });
    console.log(result);
  } catch (e) {
    console.error(e.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
}

//'api/product/detail/:id'
//서버에 상품 디테일 요청
// async function getDataFromApi() {
//   const URLSearch = new URLSearchParams(location.search);
//   //(?id=여기부분)
//   const id = URLSearch.get("id");
//   const data = await Api.get(`/api/product`, id);
//   return data;
// }
