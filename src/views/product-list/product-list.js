import * as Api from "/api.js";
import dom from "/dom.js";

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
const productData =await Api.get('/api/product');
const categoryData = await Api.get('/api/category');

// 상품 리스트 섹션
const productSection = dom('.section');
// 카테고리 섹션 - 메뉴 리스트
const categorySection = dom('.header-category-list');

//페이지네이션
const paginationClass = document.querySelector('.pagination');



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
    <div class="card product-item" id="${productData.productsPerPage._id}">
    <a href="/product?_id=${productData.productsPerPage._id}">
        <div class="card-image">
            <figure class="image is-square">
                <img src="${productData.productsPerPage.imgSrc}" alt="Placeholder image">
            </figure> 
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">${productData.productsPerPage.name}</p>
                    <p class="subtitle is-7">${productData.productsPerPage.content}</p>
                    <p class="title is-6">${productData.productsPerPage.price}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
    `
}

function pagination(productData){
    for(let i = 1; i <= totalPage; i++){
        document.write("<td>");
        document.write("<a href=" + `/api/product?page=${i}&perPage=${productData.perPage}` + ">" + i + "</a>");
        document.write("</td>");
    }
}

productData.map((productData) => addProductsListData(productData));
categoryData.map((categoryData) => addCategoryListData(categoryData));

productSection.innerHTML = productInnerData;
categorySection.innerHTML = categoryInnerData;
paginationClass.innerHTML = pagination(productData);
