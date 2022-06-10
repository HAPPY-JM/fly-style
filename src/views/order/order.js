import * as Api from "/api.js";
import * as fnc from "/useful-functions.js";
import header from "/header.js";
import { $ } from "/utils.js";
import * as Cart from "/cart_fnc.js";

// 요소(element), input 혹은 상수

const buyButton = $("#buyButton");
const headerParent = $("#contentWrap");
const orderProducts = Cart.list("order");
let tableInnerData = ``;
let productText = ``;
let totalPrice = 0;

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
    swal({
      icon: "error",
      text: "선택된 상품이 없습니다",
    });
    location.href = "/cart";
  }
  console.log(orderProducts);
  orderProducts.map(async (data) => {
    const product = await Api.get(`/api/product/detail`, data._id);
    if (!product || product == "null" || product.quantity <= 0) {
      swal(`품절이거나 삭제된 상품이 있습니다.
      주문 목록을 수정해주세요`);
      location.href = document.referrer;
    }
  });
  orderProducts.map((data) => {
    tableInnerData += `
    <tr id="orderCheck" class="cart-items">
      <td class="cart-products-info">
          <figure>
              <img src="https://kream-phinf.pstatic.net/MjAyMTA3MjhfMjIg/MDAxNjI3NDQxMDA1NjE5.HOgIYywGZaaBJDqUzx2OnX9HAxoOWPvuWHqUn_LZGcgg.VYIuOfA5_GgjBGRowv6dmQuAOPtUvmAxbGpOyUCOCtYg.PNG/p_9d8ed1a74d2540ab9842e63363607bf4.png?type=m_webp"
                  alt="신발">
          </figure>
          <div class="product-info">
              <div class="product-name title is-5">${data.name}</div>
            
          </div>
      </td>
      <td class="cart-product-size">
          <div>${data.size}</div>
      </td>
      <td class="cart-product-price">
          <div>${fnc.addCommas(data.price * data.quantity)}</div>
      </td>
      <td class="cart-products-count">
          <div class="product-count">
              <p id="productCounts">${data.quantity}</p>
          </div>
      </td>
  </tr>
  `;
    productText += `${data.name}  ${data.size} / ${data.quantity}개
    `;
    totalPrice += data.price * data.quantity;
  });
  let deliveryFee = 0;
  // const { productId, quantity, size, price } = products;
  $("tbody").innerHTML = tableInnerData;
  $("#productName").innerText = productText;
  $("#PriceTotal").innerText = `${fnc.addCommas(totalPrice)}원`;
  totalPrice > 50000 ? (deliveryFee = 0) : (deliveryFee = 3000);
  $("#deliveryFee").innerText = `${fnc.addCommas(deliveryFee)}원`;
  $("#orderPriceTotal").innerText = `${fnc.addCommas(
    totalPrice + deliveryFee
  )}원`;
}

async function orderComplete() {
  Cart.clear("order");
  const name = $("#orderName").value;
  const phoneNumber = $("#orderPhoneNumber").value;
  const zoneCode = $("#zoneCode").value;
  const address1 = $("#orderAddress").value;
  const address2 = $("#addressDetail").value;
  const totalPrice = fnc.convertToNumber($("#orderPriceTotal").innerText);
  const comment = $("#orderRequest").value;
  console.log(orderProducts);
  const products = orderProducts.map((data) => {
    return { quantity: data.quantity, size: data.size, productId: data._id };
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
    const updatedOrder = orderProducts.map(async (data) => {
      await Api.patch(`/api/product/quantity`, data._id, {
        size: data.size,
        quantity: data.quantity,
      });
    });
    console.log(updatedOrder);
    location.href = "/order/complete";
  } catch (e) {
    console.error(e.stack);
    swal(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
  const URLSearch = new URLSearchParams(location.search);
  //(?id=여기부분)
  const cart = URLSearch.get("cart");
  if (cart) {
    orderProducts.map((data) => {
      Cart.remove(data._id, data.size, "cart");
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
