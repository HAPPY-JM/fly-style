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

// 카테고리 섹션 - 메뉴 리스트
const categorySection = $('.header-category-list');

// 요소(element), input 혹은 상수
const headerParent = $(".hero");
addAllElements();

//카테고리 nav
const categoryNav = $(".categories");

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}


setCookie('categoryCookie', URLSearch.get("category"));

//카테고리쿠키 생성함수
function setCookie(cName, cValue){
    let cookies = cName + '=' + cValue + '; path=/ ';
    document.cookie = cookies;
}
//카테고리쿠키 가져오기
function getCookie(cName){
    cName = cName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cName);
    let cValue = '';
    if(start != -1){
        start += cName.length;
        let end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return cValue;
}


// 카테고리 넣을 함수 구현
function addCategoryListData(categoryData) {
  categoryInnerData += `<li><a href = /products?category=${categoryData.name}>${categoryData.name}</a></li>`;
}

let cookieCategory = getCookie('categoryCookie');
function pagination(productData, cookieCategory) {
    let paginationEl = ``;
    for (let i = 1; i <= productData.totalPage; i++) {
      paginationEl += `
          <td>
              <a href="/products?category=${cookieCategory}&page=${i}">
                  ${i} 
              </a>
          </td>
        `;
    }
    // console.log(paginationEl);
    // console.log(paginationClass);
    return paginationEl;
  }

  categoryData.map((categoryData) => addCategoryListData(categoryData));
  categorySection.innerHTML = categoryInnerData;
categoryData.map((categoryData) => categories(categoryData));

categoryNav.innerHTML = categoryInnerData;


