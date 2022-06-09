import header from "/header.js";
import { $ } from "/utils.js";
import * as Api from "../api.js";

// 요소(element), input 혹은 상수

const order = await Api.get('/api/admins/order/lists');
console.log('1------------------');
console.log(order[0]);
console.log('2-----------------');

const test= await Api.get('/api/product');
console.log(test);
// const URLSearch = new URLSearchParams(location.search);
//   //(?id=여기부분)
//   const id = URLSearch.get("_id");
//   const data = await Api.get(`/api/product`, id);


const headerParent = $("body");
//const headerParent = $(".hero");
addAllElements();



const orderId = sessionStorage.getItem('orderId');
// console.log(orderId);
let products= await Api.get(`/api/product/${orderId}`);
console.log(products);


// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

// 삭제 버튼 다 들고오기
const deleteBtn = document.querySelectorAll('.user-order-data td:last-child button');

const tbody = $('.table tbody');

let innerTrData ="";
let productList = "";

function deleteOrder(data) {
  const res =  data;
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

for(let i = 0 ; i < order.length ; i ++){
  innerTrData += 
  `<tr>
  <td>${order[i].userId.email}</td>
  <td>${order[i].createdAt.substring(0,10)}</td>
  <td>
    <ul>
      ${productList}
    </ul>
  </td>
  <td>${order[i].products[i].quantity}</td>
  <td>${order[i].orderStatus}</td>
  <td>
    <button class="button is-danger is-light" onclick="deleteOrder(this)" id=${order[i]._id}>삭제</button>
  </td>
</tr>
<input type='hidden' value=${order[i]._id} />
`
}

tbody.innerHTML = innerTrData;

// console.log(tbody);



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

// }