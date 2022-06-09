import * as Api from "../api.js";
import { $ } from "../utils.js";
const URLSearch = new URLSearchParams(location.search);
const category = URLSearch.get("category");

const categoryInput = $('#categoryInput');
const addCategoryBtn = $('#submitaddButton');
const editCategoryBtn = $('#submiteditButton');
const deleteCategoryBtn = $('#submitdeleteButton');

const categoryData = await Api.get(`/api/category/:${category}`);

if(category){
    categoryInput.value = categoryData.name;
}




