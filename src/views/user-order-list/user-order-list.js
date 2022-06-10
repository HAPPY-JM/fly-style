import header from "/header.js";
import { $ } from "/utils.js";
import * as Api from "/api.js";
import * as fnc from "/useful-functions.js";

// 요소(element), input 혹은 상수
const headerParent = $("body");
const tbody = $(".table tbody");
const orderList = await Api.get("/api/order/user");
console.log(orderList);

addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
  getOrderDatas();
}

function addTableTrData(data) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${data.createdAt.substring(0, 10)}</td>
  <td id='products${data._id}'>
  </td>
  <td>${fnc.addCommas(data.totalPrice)}원</td>
  <td>
      ${data.orderStatus}
  </td>
  <td>
    <button class="button is-danger is-light" id=${data._id}>취소</button>
  </td>
`;
  tbody.appendChild(tr);
  const products = $(`#products${data._id}`);
  for (let i = 0; i < data.products.length; i++) {
    const ul = document.createElement("ul");
    console.log(data.products[i]);
    ul.innerText = `${data.products[i].productId.name} / ${data.products[i].size} / ${data.products[i].quantity}개`;
    products.append(ul);
  }
}

function getOrderDatas() {
  orderList.map((item) => {
    addTableTrData(item);
  });
}

const deleteBtns = document.querySelectorAll(".button");

for (let i = 0; i < orderList.length; i++) {
  deleteBtns[i].addEventListener("click", () =>
    swal({
      title: "해당 주문 내역을 취소하시겠습니까?",
      text: "상품 준비중일때만 취소 가능합니다!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log(orderList[i].orderStatus !== "상품준비중");
        if (orderList[i].orderStatus !== "상품준비중") {
          swal("삭제 할 수 없습니다.", {
            icon: "warning",
          }).then(() => location.reload());
          return;
        }
        const result = await Api.delete("/api/order", orderList[i]._id);
        console.log(result);
        swal("삭제 완료되었습니다.", {
          icon: "success",
        }).then(() => location.reload());
      } else {
        swal("Good!");
      }
    })
  );
}
