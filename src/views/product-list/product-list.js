import * as Api from "/api.js";
import dom from "/dom.js";

console.log(Api);
console.log('----');
console.log(Api.get());
console.log('----');
console.log(Api.post());

// 상품 리스트 섹션
const productSection = dom('.section');
// mock data 생성하여(./product.json) 가져온 데이터를 화면에 뿌려준다. 
const productsUrl = './products.json';
const productsResponse = await fetch(productsUrl);
const productsData = await productsResponse.json();
const productsObj = productsData.products;
console.log(productsObj);

// 상품 목록에 넣을 데이터 변수
let productInnerData = "";

// 카테고리 섹션 - 메뉴 리스트
const categorySection = dom('.category-list .menu-list');


// 카테고리 mock data 가져오기
const categoryUrl = './category.json';
const categoryResponse = await fetch(categoryUrl);
const categoryData = await categoryResponse.json();
const categoryObj = categoryData.category;
// console.log(categoryObj);

function addProductsListData(productData){
    //"/product-detail?id="
    productInnerData +=  `
    <div class="card product-item" id="productNum${productData._id}">
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

productsObj.map(productData => addProductsListData(productData));

productSection.innerHTML = productInnerData;
