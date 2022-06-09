import header from "/header.js";
import { $, getRole } from "/utils.js";

// 요소(element), input 혹은 상수
const headerParent = $(".hero");
checkAdmin();
addAllElements();

function checkAdmin() {
  if (!getRole() || getRole === "null") {
    swal({
      icon: "error",
      text: "관리자가 아닙니다.",
      type: "success",
    }).then(function () {
      window.location.href = "/";
    });
  }
}
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}
