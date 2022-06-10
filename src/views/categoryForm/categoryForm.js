import * as Api from "../api.js";

const URLSearch = new URLSearchParams(location.search);
const category = URLSearch.get("category");
console.log(category);

const categoryInput = document.getElementById('categoryInput');
const addCategoryBtn = document.getElementById('submitaddButton');
const editCategoryBtn = document.getElementById('submiteditButton');
const deleteCategoryBtn = document.getElementById('submitdeleteButton');

const categoryData = await Api.get(`/api/category/${category}`);
console.log(categoryData);

async function addCategory(e){
    e.preventDefault();

    console.log(categoryInput.value);

    const name = categoryInput.value;

    await Api.post(`/api/category`, {name});

    alert(`카테고리 <${name}>이(가) 등록되었습니다.`);
    window.location.href="/inventory";
    
}
addCategoryBtn.addEventListener('click', addCategory);


if(category){
    categoryInput.value = category;
}

async function editCategory(e){
    e.preventDefault();

    const name = categoryInput.value;

    await Api.patch(`/api/category/${categoryData._id}`, {name});

    alert(`<${category}> 카테고리의 카테고리명이 <${name}>(으)로 수정되었습니다.`);
    window.location.href="/inventory";
    
}
editCategoryBtn.addEventListener('click', editCategory);



async function deleteCategory(e){
    e.preventDefault();
    console.log(categoryData._id);

    await Api.delete(`/api/category/${categoryData._id}`);

    alert(`카테고리 <${categoryData.name}>이(가) 삭제되었습니다.`);
    window.location.href="/inventory";
}
deleteCategoryBtn.addEventListener('click', deleteCategory);


