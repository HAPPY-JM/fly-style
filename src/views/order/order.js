import * as Api from "/api.js";
import * as fnc from "/useful-functions.js";
import header from "/header.js";
import { $ } from "/utils.js";
import * as Cart from "/cart_fnc.js";

// 요소(element), input 혹은 상수

const buyButton = $("#buyButton");
const headerParent = $("#contentWrap");
const orderProducts = Cart.list("order");
Cart.clear("order");

getProductRender();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function getProductRender() {
  //  const data = await getDataFromApi();
  await landingRender();
  header(headerParent);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  buyButton.addEventListener("click", orderComplete);
}

async function landingRender() {
  if (orderProducts.length === 0) {
    alert(`선택된 상품이 없습니다.`);
    location.href = "/cart";
  }
  console.log(orderProducts);
  orderProducts.map(async (data) => {
    const product = await Api.get(`/api/product/detail`, data._id);
    if (!product || product == "null" || product.quantity <= 0) {
      alert("품절이거나 삭제된 상품이 있습니다. 주문목록을 수정해주세요");
      location.href = document.referrer;
    }
  });
  // const { productId, quantity, size, price } = products;
  // $("#productName").innerText = productId;
  // $("#PriceTotal").innerText = size;
  // $("#deliveryFee").innerText = quantity;
  $("#orderPriceTotal").innerText = 40000;
}

async function orderComplete() {
  const name = $("#orderName").value;
  const phoneNumber = $("#orderPhoneNumber").value;
  const zoneCode = $("#zoneCode").value;
  const address1 = $("#orderAddress").value;
  const address2 = $("#addressDetail").value;
  const totalPrice = fnc.convertToNumber($("#orderPriceTotal").innerText);
  const comment = $("#orderRequest").value;
  const products = orderProducts.map((data) => {
    return { quantity: data.quantity, productId: data._id };
  });
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
    swal(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
  const URLSearch = new URLSearchParams(location.search);
  //(?id=여기부분)
  const cart = URLSearch.get("cart");
  if (cart) {
    orderProducts.map((data) => {
      Cart.remove(data._id, "cart");
    });
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
