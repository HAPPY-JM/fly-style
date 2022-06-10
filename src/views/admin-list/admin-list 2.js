import header from "/header.js";
import { $ } from "/utils.js";

// 요소(element), input 혹은 상수

const order = await Api.get('/api/admins/order/lists');

console.log(order);
console.log('----------------------------------------');
console.log(order[0]);
console.log('----------------------------------------');
// console.log(order[0]._id);
console.log('----------------------------------------');

//const headerParent = $("body");
const headerParent = $(".hero");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

// 삭제 버튼 다 들고오기
const deleteBtn = document.querySelectorAll('.user-order-data td:last-child button');
const tbody = $('.table tbody');

// for(let i = 0 ; i < deleteBtn.length; i ++){
//   deleteBtn[i].setAttribute('id',`deleteBtnId_${i+1}`);
// }
let innerTrData = "";


tbody.innerHTML = innerTrData;

function deleteRow(o) {
  const rowIndex = o.parentNode.parentNode.rowIndex;
  document.querySelector('#mainTable').deleteRow(rowIndex);

}


