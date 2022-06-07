import header from "/header.js";
import { $ } from "/utils.js";

// 요소(element), input 혹은 상수
const headerParent = $(".hero");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}
