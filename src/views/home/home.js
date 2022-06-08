// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import header from "/header.js";
import { $ } from "/utils.js";
const URLSearch = new URLSearchParams(location.search);
const category = Number(URLSearch.get("category")) ;

//카테고리 데이터 가져오기
const categoryData = await Api.get(`/api/category`);
console.log(categoryData);

// 카테고리목록에 넣을 데이터 변수
let categoryInnerData = "";

// 요소(element), input 혹은 상수
const headerParent = $(".hero");
addAllElements();

//카테고리 nav
const categoryNav = $(".categories");

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

// 카테고리 넣을 함수 구현
function categories(categoryData) {
  categoryInnerData += `<li><a>${categoryData.name}</a></li>`;
}

categoryData.map((categoryData) => categories(categoryData));

categoryNav.innerHTML = categoryInnerData;


