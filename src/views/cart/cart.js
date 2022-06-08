import header from "/header.js";
import { $ } from "/utils.js";
import * as Cart from "/cart_fnc.js";
import * as Fnc from "/useful-functions.js";

// 요소(element), input 혹은 상수
const headerParent = $("body");
const table = $("table");
const productCount = $("#productsCount");
const productTotal = $("#productsTotal");
const deliveryFee = $("#deliveryFee");
const totalPrice = $("#orderTotal");
let tableInnerData = "";
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  header(headerParent);
  getCartDatas();
  addButtonEvents();
  setOrderDatas();
}

function setOrderDatas() {
  setProductCount();
  setProductTotal();
  setDeliveryFee();
  setTotalPrice();
}

function setProductCount() {
  const quantitys = document.querySelectorAll(".quantityinput");
  let total = 0;
  for (let j = 0; j < quantitys.length; j++) {
    total += Number(quantitys[j].value);
  }
  productCount.innerHTML = `${Fnc.addCommas(total)}개`;
}

function setProductTotal() {
  const productPrice = document.querySelectorAll(".product-price");
  let total = 0;
  for (let j = 0; j < productPrice.length; j++) {
    total += Fnc.convertToNumber(productPrice[j].innerText);
  }
  productTotal.innerHTML = `${Fnc.addCommas(total)}원`;
}

function setDeliveryFee() {
  if (Fnc.convertToNumber(productTotal.innerText) >= 50000) {
    deliveryFee.innerHTML = `0원`;
  } else {
    deliveryFee.innerHTML = `3,000원`;
  }
}

function setTotalPrice() {
  const total =
    Fnc.convertToNumber(productTotal.innerHTML) +
    Fnc.convertToNumber(deliveryFee.innerHTML);
  totalPrice.innerHTML = `${Fnc.addCommas(total)}원`;
}

function addtableTrData(data) {
  tableInnerData += `
    <tr class="cart-items">
                <td class="cart-items-checkbox">
                  <label class="checkbox">
                    <input type="checkbox" />
                  </label>
                </td>
                <td class="cart-products-info">
                  <figure>
                    <img
                      src="https://kream-phinf.pstatic.net/MjAyMTA3MjhfMjIg/MDAxNjI3NDQxMDA1NjE5.HOgIYywGZaaBJDqUzx2OnX9HAxoOWPvuWHqUn_LZGcgg.VYIuOfA5_GgjBGRowv6dmQuAOPtUvmAxbGpOyUCOCtYg.PNG/p_9d8ed1a74d2540ab9842e63363607bf4.png?type=m_webp"
                      alt="상품이미지"
                    />
                  </figure>
                </td>
                <td class="is-vcentered">
                  <div class="product-info">
                    <div class="product-name title is-5">${data.name}</div>
                    <div class="product-description subtitle is-7">
                      ${data.content}
                    </div>
                  </div>
                </td>
                <td class="product-price is-vcentered">${
                  data.price * data.quantity
                }</td>
                <td class="is-vcentered">
                  <div class="product-count">
                    <button class="minus-btn">-</button>
                    <input
                      class="quantityinput"
                      type="number"
                      min="1"
                      max="99"
                      value=${data.quantity}
                    />
                    <button class="plus-btn">+</button>
                  </div>
                </td>
                <td class="is-vcentered">
                  <button class="delete-btn">삭제</button>
                </td>
              </tr>
    `;
}

function getCartDatas() {
  const tbody = document.createElement("tbody");
  const lists = Cart.list();
  lists.map((data) => {
    addtableTrData(data);
  });
  tbody.innerHTML = tableInnerData;
  table.appendChild(tbody);
}

function addButtonEvents() {
  const lists = Cart.list();
  const minusBtns = document.querySelectorAll(".minus-btn");
  const plusBtns = document.querySelectorAll(".plus-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const quantityField = document.querySelectorAll(".quantityinput");
  const productPrice = document.querySelectorAll(".product-price");
  for (let i = 0; i < lists.length; i++) {
    minusBtns[i].addEventListener("click", () => {
      const product = Cart.get(lists[i]._id);
      if (product.quantity <= 1) {
        return;
      }
      Cart.update(product._id, "quantity", product.quantity - 1);
      quantityField[i].value = product.quantity - 1;
      productPrice[i].innerText = product.price * (product.quantity - 1);
      setOrderDatas();
    });
    plusBtns[i].addEventListener("click", () => {
      const product = Cart.get(lists[i]._id);
      if (product.quantity >= 99) {
        return;
      }
      Cart.update(product._id, "quantity", product.quantity + 1);
      quantityField[i].value = product.quantity + 1;
      productPrice[i].innerText = product.price * (product.quantity + 1);
      setOrderDatas();
    });
    deleteBtns[i].addEventListener("click", () => {
      alert(`삭제하시겠습니까?`);
      Cart.remove(lists[i]._id);
      location.reload();
      return;
    });
  }
}
