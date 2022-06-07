import * as Api from "/api.js";
import dom from "/dom.js";

// api에서 상품리스트 데이터와 카테고리 데이터 받아오기 
const productData =await Api.get('/api/product');
const categoryData = await Api.get('/category');

// 상품 리스트 섹션
const productSection = dom('.section');
// 카테고리 섹션 - 메뉴 리스트
const categorySection = dom('.header-category-list');


// 상품 목록에 넣을 데이터 변수
let productInnerData = "";
// 카테고리목록에 넣을 데이터 변수 
let categoryInnerData = "";

// 카테고리 넣을 함수 구현
function addCategoryListData(categoryData){
    categoryInnerData += `<li><a>${categoryData.name}</a></li>`
}
// 상품 넣을 함수 구현
function addProductsListData(productData){
    //"/product-detail?id="
    productInnerData +=  `
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
    `
}

productData.map((productData) => addProductsListData(productData));
categoryData.map((categoryData) => addCategoryListData(categoryData));

productSection.innerHTML = productInnerData;
categorySection.innerHTML = categoryInnerData;
