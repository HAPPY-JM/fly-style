// import * as Api from "/api.js";
import header from "/header.js";
import { $ } from "/utils.js";

// 요소(element), input 혹은 상수
const headerParent = $("body");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

// 삭제 버튼 다 들고오기
const deleteBtn = document.querySelectorAll('.user-order-data td:last-child button');
const tbody = $('.table tbody');

for(let i = 0 ; i < deleteBtn.length; i ++){
  deleteBtn[i].setAttribute('id',`deleteBtnId_${i+1}`);
}
let innerTrData = "";
for(let i = 0 ; i < 10 ; i ++){
  innerTrData += 
  `<tr>
  <td>admin</td>
  <td>2022-06-0${i+1}</td>
  <td>
    <ul>
      <li>남자옷</li>
      <li>남자옷</li>
      <li>남자옷</li>
      <li>남자옷</li>
    </ul>

  </td>
  <td>10개</td>
  <td>배송중</td>
  <td>
    <button class="button is-danger is-light" onclick="deleteRow(this)">삭제</button>
  </td>
</tr>`
}

tbody.innerHTML = innerTrData;

function deleteRow(o) {
  const rowIndex = o.parentNode.parentNode.rowIndex;
  document.querySelector('#mainTable').deleteRow(rowIndex);

}


  