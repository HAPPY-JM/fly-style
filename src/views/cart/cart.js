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
const lists = Cart.list("cart");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  header(headerParent);
  getCartDatas();
  addButtonEvents();
  setOrderDatas();
}

// function setOrderDatas() {
//   setProductCount();
//   setProductTotal();
//   setDeliveryFee();
//   setTotalPrice();
// }

// function checkBox() {}

function setOrderDatas() {
  const checkBoxs = document.querySelectorAll(".checkBoxs");
  const quantitys = document.querySelectorAll("#quantityinput");
  const productPrice = document.querySelectorAll(".cart-product-price");
  let totalCount = 0;
  let productsPrice = 0;
  for (let j = 0; j < lists.length; j++) {
    if (checkBoxs[j].checked) {
      totalCount += Number(quantitys[j].value);
      productsPrice += Fnc.convertToNumber(productPrice[j].innerText);
    }
  }
  productCount.innerHTML = `${Fnc.addCommas(totalCount)}개`;
  productTotal.innerHTML = `${Fnc.addCommas(productsPrice)}원`;
  if (productsPrice >= 50000) {
    deliveryFee.innerHTML = `0원`;
  } else {
    deliveryFee.innerHTML = `3,000원`;
  }
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
            <input class='checkBoxs' type="checkbox" checked>
        </label>
    </td>
    <td class="cart-imgs-info">
        <figure>
            <img src="https://kream-phinf.pstatic.net/MjAyMTA3MjhfMjIg/MDAxNjI3NDQxMDA1NjE5.HOgIYywGZaaBJDqUzx2OnX9HAxoOWPvuWHqUn_LZGcgg.VYIuOfA5_GgjBGRowv6dmQuAOPtUvmAxbGpOyUCOCtYg.PNG/p_9d8ed1a74d2540ab9842e63363607bf4.png?type=m_webp"
                alt="신발">
        </figure>
        
    </td>
    <td class="cart-product-info is-vcentered">
        <div class="product-info">
            <div class="product-name title is-5">${data.name}</div>
            <div class="product-description subtitle is-7">${data.content}</div>
        </div>
    </td>
    <td class="cart-product-size">
        <div>${data.size}</div>
    </td>
    <td class="cart-product-price">
        <div>${data.price * data.quantity}</div>
    </td>
    <td class="cart-products-count">
        <div class="product-count">
            <button class="minus-btn">-</button>
            <input id="quantityinput" class="input" type="number" min="1" max="99" value=${
              data.quantity
            } />
            <button class="plus-btn">+</button>
        </div>
    </td>
    <td class="cart-delete-btn">
        <div>
            <button class="delete-btn button is-text">삭제</button>
        </div>
    </td>
  </tr>


    `;
}

function getCartDatas() {
  const tbody = document.createElement("tbody");
  lists.map((data) => {
    addtableTrData(data);
  });
  tbody.innerHTML = tableInnerData;
  table.appendChild(tbody);
}

function addButtonEvents() {
  const minusBtns = document.querySelectorAll(".minus-btn");
  const plusBtns = document.querySelectorAll(".plus-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const quantityField = document.querySelectorAll("#quantityinput");
  const productPrice = document.querySelectorAll(".cart-product-price");
  const checkBoxs = document.querySelectorAll(".checkBoxs");
  const purchaseButton = $("#purchaseButton");
  purchaseButton.addEventListener("click", purchase);
  for (let i = 0; i < lists.length; i++) {
    checkBoxs[i].addEventListener("click", () => {
      setOrderDatas();
    });
    minusBtns[i].addEventListener("click", () => {
      const product = Cart.get(lists[i]._id, lists[i].size, "cart");
      if (product.quantity <= 1) {
        return;
      }
      Cart.update(
        product._id,
        product.size,
        "quantity",
        product.quantity - 1,
        "cart"
      );
      quantityField[i].value = product.quantity - 1;
      productPrice[i].innerText = product.price * (product.quantity - 1);
      setOrderDatas();
    });
    plusBtns[i].addEventListener("click", () => {
      const product = Cart.get(lists[i]._id, lists[i].size, "cart");
      if (product.quantity >= 99) {
        return;
      }
      Cart.update(
        product._id,
        product.size,
        "quantity",
        product.quantity + 1,
        "cart"
      );
      quantityField[i].value = product.quantity + 1;
      productPrice[i].innerText = product.price * (product.quantity + 1);
      setOrderDatas();
    });
    deleteBtns[i].addEventListener("click", () => {
      swal({
        icon: "warning",
        text: "삭제하시겠습니까?",
      });
      Cart.remove(lists[i]._id, lists[i].size, "cart");
      location.reload();
      return;
    });
  }
}

async function purchase() {
  const checkBoxs = document.querySelectorAll(".checkBoxs");
  const orderlists = Cart.list("cart");
  Cart.clear("order");
  for (let j = 0; j < lists.length; j++) {
    if (checkBoxs[j].checked) {
      Cart.add(
        orderlists[j],
        orderlists[j].size,
        orderlists[j].quantity,
        "order"
      );
    }
  }
  location.href = `/order?cart=true`;
}
