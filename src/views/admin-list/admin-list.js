import header from "/header.js";
import { $ } from "/utils.js";
import * as Api from "../api.js";

// 요소(element), input 혹은 상수
const headerParent = $("body");
//const headerParent = $(".hero");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

const orderList = await Api.get("/api/admins/order/lists");

// const URLSearch = new URLSearchParams(location.search);
//   //(?id=여기부분)
//   const id = URLSearch.get("_id");
//   const data = await Api.get(`/api/product`, id);

const table = $("table");

//   console.log('---------orderId--------------------------------');
//   console.log(orderId);
//   const orderData= await Api.get(`/api/order/detail/${orderId}`);
//   console.log('----await Api.get(`/api/order/detail/오더아이디-------------------------------------');
//   console.log(orderData);
//   const result = await Api.delete('/api/admins/order',orderId);
//   console.log('-----await Api.del-------------------------------------------')
//   console.log(result);
// console.log(orderId);
//let products= await Api.get(`/api/product/${orderId}`);
//console.log(products);

const tbody = $(".table tbody");

let innerTrData = "";
let productList = "";

function deleteOrder(data) {
  const res = data;
  console.log(res);
  //e.id;
  // swal({
  //   title: "해당 주문 내역을 삭제하시겠습니까?",
  //   text: "삭제하면 복구할 수 없습니다!",
  //   icon: "warning",
  //   buttons: true,
  //   dangerMode: true,
  // })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       swal("삭제 완료되었습니다.", {
  //         icon: "success",
  //       });

  //       //let i = o.parentNode.parentNode.rowIndex;
  //       //document.querySelector('#mainTable').deleteRow(i);
  //     } else {
  //       swal("Good!");
  //     }
  //   });
}

function addTableTrData(data) {
  innerTrData += `<tr>
  <td>${data.userId.email}</td>
  <td>${data.createdAt.substring(0, 10)}</td>
  <td>
  <script>
    <ul>
     
    </ul>
  <script>
  </td>
  <td>${data.products.quantity}개</td>
  <td>${data.orderStatus}</td>
  <td>
    <button class="button is-danger is-light" id=${data._id}>삭제</button>
  </td>
</tr>
<input type='hidden' value=${data._id} />
`;
}

getOrderDatas();

function getOrderDatas() {
  // const tbody = document.createElement("tbody");
  // orderList.map((data)=> {
  //   addTableTrData(data);
  // });
  // tbody.innerHTML = innerTrData;
  // table.appendChild(tbody);

  orderList.map((item) => {
    addTableTrData(item);
  });

  tbody.innerHTML = innerTrData;
  table.appendChild(tbody);
}

//const table
//console.log(table);

const tr = document.querySelectorAll("tbody tr");
console.log("-------------------------------------");
console.log(tr);

const deleteBtns = document.querySelectorAll(".button");

for (let i = 0; i < orderList.length; i++) {
  deleteBtns[i].addEventListener("click", () =>
    swal({
      title: "해당 주문 내역을 삭제하시겠습니까?",
      text: "삭제하면 복구할 수 없습니다!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log(i);
        console.log(orderList[i]);
        const result = await Api.delete("/api/admins/order", orderList[i]._id);
        console.log(result);
        swal("삭제 완료되었습니다.", {
          icon: "success",
        }).then(location.reload());
      } else {
        swal("Good!");
      }
    })
  );
}

function deleteRow() {}

// let button = "";
// for(let i = 0 ; i < tr.length ; i++){
//   button = document.querySelector(`${tr}:nth-child(${i+1}) button`);
//   console.log(button);
// }
// for(let i = 0 ; i < order.length ; i ++){
//   innerTrData +=
//   `<tr>
//   <td>${order[i].userId.email}</td>
//   <td>${order[i].createdAt.substring(0,10)}</td>
//   <td>
//     <ul>
//       ${productList}
//     </ul>
//   </td>
//   <td>${order[i].products[i].quantity}</td>
//   <td>${order[i].orderStatus}</td>
//   <td>
//     <button class="button is-danger is-light" onclick="deleteOrder(this)" id=${order[i]._id}>삭제</button>
//   </td>
// </tr>
// <input type='hidden' value=${order[i]._id} />
// `
// }

//tbody.innerHTML = innerTrData;

//console.log(innerTrData);

// function deleteRow(o) {
//   swal({
//     title: "해당 주문 내역을 삭제하시겠습니까?",
//     text: "삭제하면 복구할 수 없습니다!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//     .then((willDelete) => {
//       if (willDelete) {
//         swal("삭제 완료되었습니다.", {
//           icon: "success",
//         });

//         //let i = o.parentNode.parentNode.rowIndex;
//         //document.querySelector('#mainTable').deleteRow(i);
//       } else {
//         swal("Good!");
//       }
//     });
