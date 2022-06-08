import * as Api from "/api.js";

import header from "/header.js";
import { $ } from "/utils.js";

// 요소(element), input 혹은 상수
const headerParent = $("body");
addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}


//localhost:5000/products/?category="slfjsalkfjalsfjl"
//const URLSearch = new URLSearchParams(location.search);
//(?id=여기부분)
// GET /api/product/slfjsalkfjalsfjl
//const id = URLSearch.get("category");

// mock data 생성하여(./product.json) 가져온 데이터를 화면에 뿌려준다.
// const url = "./products.json";
//특정 카테고리에 어떤 상품 리스트들이있는지 이걸 배열으로 받아와서 뿌려줘야겠죠?

// GET /api/product/:id
// const response = await fetch(url);
// const data = await response.json();
// api에서 상품리스트 데이터와 카테고리 데이터 받아오기
const productData = await Api.get("/api/product");
const categoryData = await Api.get("/api/category");

// 상품 리스트 섹션
const productSection = $(".section");
// 카테고리 섹션 - 메뉴 리스트
const categorySection = $(".header-category-list");

// 상품 목록에 넣을 데이터 변수
let productInnerData = "";
// 카테고리목록에 넣을 데이터 변수
let categoryInnerData = "";

// 카테고리 넣을 함수 구현
function addCategoryListData(categoryData) {
  categoryInnerData += `<li><a>${categoryData.name}</a></li>`;
}
// 상품 넣을 함수 구현
function addProductsListData(productData) {
  //"/product-detail?id="
  productInnerData += `
    <div class="card product-item" id="${productData._id}">
    <a href="/product?_id=${productData._id}">
        <div class="card-image">
            <figure class="image is-square">
                <img src="${productData.imgSrc}" alt="Placeholder image">
            </figure> 
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">${productData.name}</p>
                    <p class="subtitle is-7">${productData.content}</p>
                    <p class="title is-6">${productData.price}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
    `;
}

productData.map((productData) => addProductsListData(productData));
categoryData.map((categoryData) => addCategoryListData(categoryData));

productSection.innerHTML = productInnerData;
categorySection.innerHTML = categoryInnerData;

//scroll up button
function scrollUp(e) {
    let target = document.getElementById(e);
    target.addEventListener("click", function(){
      window.scrollTo({top:0, left:0, behavior:'smooth'});
    })
  }
  
  scrollUp("scroll-btn");

var aTags = document.querySelectorAll('header a');
for(var i = 0; i < aTags.length; i ++) {
    aTags[i].onclick = function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute("href"));

        window.scrollTo({
            'behavior': 'smooth',
            'top': target.offsetTop
        })
    }
}
