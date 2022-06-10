import * as Api from "../api.js";

const categoryNameList = document.getElementById('categoryNameList');
const productList = document.getElementById('productList');

const categoryData = await Api.get('/api/category');
const productData = await Api.get('/api/product');
console.log(categoryData);
console.log(productData);


let innerCategory = '';
let innerProduct = '';


function categoryInnerData(categoryData){
    innerCategory += `<li><a href = "/categoryform?category=${categoryData.name}">${categoryData.name}</li>`;
}

function productInnerData(productData){
    innerProduct += `
    
    <tr>
        <td><a href = "/productform?product=${productData._id}">${productData.name}</a></td>
        <td>${productData.category}</td>
    </tr>
    

    `
}

categoryData.map((categoryData) => categoryInnerData(categoryData));
productData.map((productData) => productInnerData(productData));

console.log(innerCategory);
console.log(innerProduct);

categoryNameList.innerHTML = innerCategory;
productList.innerHTML = innerProduct;
