
const productSection = document.querySelector('.section');

// mock data 생성하여(./product.json) 가져온 데이터를 화면에 뿌려준다. 
const url = './products.json';
const response = await fetch(url);
//location.search(쿼리만 받아오기)
//카테고리로 find 요청
// {
//     "_id": "1",
//     "name": "Nike",
//     "price": "347,000원",
//     "content": "나이키 x 트래비스 스캇 에어맥스 1 캑터스 브라운",
//     "imgSrc" : "https://kream-phinf.pstatic.net/MjAyMTA3MjhfMjIg/MDAxNjI3NDQxMDA1NjE5.HOgIYywGZaaBJDqUzx2OnX9HAxoOWPvuWHqUn_LZGcgg.VYIuOfA5_GgjBGRowv6dmQuAOPtUvmAxbGpOyUCOCtYg.PNG/p_9d8ed1a74d2540ab9842e63363607bf4.png?type=m_webp"
//   },
const data = await response.json();

const productsObj = data.products;

// 상품 목록에 넣을 데이터 변수
let productInnerData = "";

// get API로 데이터 불러옴
// const data = {_id, name }

// '/product-detail/:_id'
// /<a href="/product-detail/${_id}">
// 상세페이지
// const id = _id
// Api.get('/Api/product-detail/', id)

/* 
1. 각자 목록에 아이디  설정
2. a href=''

const data = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);
*/ 


function getProductsListData(data){
    //"/product-detail?id="
    productInnerData +=  `
    <div class="card product-item" id="productNum${data.id}">
    <a href="/product-detail?id=${data.id}">
        <div class="card-image">
            <figure class="image is-square">
                <img src="${data.imgSrc}" alt="Placeholder image">
            </figure> 
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">${data.name}</p>
                    <p class="subtitle is-7">${data.content}</p>
                    <p class="title is-6">${data.price}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
    `
}

productsObj.map(data => getProductsListData(data));

productSection.innerHTML = productInnerData;

    