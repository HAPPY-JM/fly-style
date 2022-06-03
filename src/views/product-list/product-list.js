const productSection = document.querySelector('.section');

// mock data 생성하여(./product.json) 가져온 데이터를 화면에 뿌려준다. 
const url = './products.json';
const response = await fetch(url);
const data = await response.json();

const productsObj = data.products;

// 상품 목록에 넣을 데이터 변수
let productInnerData = "";

function getProductsListData(e){
    productInnerData +=  `
    <div class="card product-item">
    <a href="#">
        <div class="card-image">
            <figure class="image is-square">
                <img src="${e.imgSrc}" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">${e.name}</p>
                    <p class="subtitle is-7">${e.content}</p>
                    <p class="title is-6">${e.price}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
    `
}

productsObj.map(e => getProductsListData(e));

productSection.innerHTML = productInnerData;





    