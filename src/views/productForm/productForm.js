import * as Api from "/api.js";
import { $ } from "/utils.js";

const URLSearch = new URLSearchParams(location.search);
const id = URLSearch.get("product");
const titleInput = document.getElementById("titleInput"); //제목
const manufacturerInput = document.getElementById("manufacturerInput");
const detailDescriptionInput = document.getElementById(
  "detailDescriptionInput"
);
const imageInput = document.getElementById("imageInput");
const inventoryInput = document.getElementById("inventoryInput");
const submitButton = document.getElementById("submitButton");
const fileNameSpan = document.getElementById("fileNameSpan");
const priceInput = document.getElementById("priceInput");
const categorySelectBox = document.getElementById("categorySelectBox");
const btn = document.getElementById("imgbutton");
const inventorySubmit = document.getElementById("inventorySubmit");
const outputdata = document.getElementById("outputdata");
const sizeInput = document.getElementById("sizeInput");
const sizeList = document.querySelectorAll("sizeList");
const categories = await Api.get("/api/category");
let category = "";
console.log(categories);

categories.map((data) => {
  const select = document.createElement("option");
  select.value = data.name;
  select.innerText = data.name;
  categorySelectBox.appendChild(select);
});

categorySelectBox.addEventListener("change", () => {
  category = categorySelectBox.value;
  console.log(category);
});
submitButton.addEventListener("click", submitEvent);
imageInput.addEventListener("change", imageNameChange);
inventorySubmit.addEventListener("click", sizeSubmitEvent);
console.log();

if (id) {
  try {
    const product = await Api.get("/api/product/detail", id);
    $("#titleInput").value = product.name;
    $("#categorySelectBox").value = product.category;
    category = product.category;
    $("#manufacturerInput").value = product.brand;
    $("#detailDescriptionInput").value = product.content;
    product.size.map((data) => {
      const list = document.createElement("li");
      const liEl = `사이즈<input class='sizeField' type="text" value=${data.name}>&nbsp&nbsp&nbsp&nbsp&nbsp수량<input type="Number" class='quantityField' value=${data.stock}>`;
      list.innerHTML = liEl;
      list.classList.add("sizeList");
      outputdata.appendChild(list);
    });
    priceInput.value = product.price;
  } catch (e) {
    console.error(e.stack);
    swal(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
  submitButton.innerText = "제품 수정하기";
}

function sizeSubmitEvent(e) {
  e.preventDefault();

  // const result1 = size.push({
  //   name: sizeInput.value,
  //   stock: Number(inventoryInput.value),
  // });
  const list = document.createElement("li");
  const liEl = `사이즈<input class='sizeField' type="text"/>&nbsp&nbsp&nbsp&nbsp&nbsp수량<input type="Number" class='quantityField'/>`;
  list.innerHTML = liEl;
  list.classList.add("sizeList");
  outputdata.appendChild(list);
}

function imageNameChange(e) {
  fileNameSpan.innerHTML = e.target.value;
}

async function submitEvent(e) {
  e.preventDefault();
  const sizeFields = document.querySelectorAll(".sizeField");
  const quantityFields = document.querySelectorAll(".quantityField");
  const size = [];
  for (let i = 0; i < sizeFields.length; i++) {
    size.push({ name: sizeFields[i].value, stock: quantityFields[i].value });
  }
  const image = imageInput.files[0];
  let formdata = new FormData();
  if (image) {
    formdata.append("image-file", image);
  }
  formdata.append("name", titleInput.value);
  formdata.append("price", priceInput.value);
  formdata.append("content", detailDescriptionInput.value);
  formdata.append("brand", manufacturerInput.value);
  formdata.append("category", category);
  formdata.append("size", JSON.stringify(size));
  // formdata.append('',sizeInput.value)
  // formdata.append('',inventoryInput.value)
  // formdata.append('productQuantity',inventoryInput.value);
  // console.log(image);
  //   console.log(JSON.stringify(formdata));
  try {
    if (id) {
      const result = await Api.formDataPatch("/api/product", formdata, id);
      swal("수정완료").then(() => (location.href = "/inventory"));
      return;
    }
    const result = await Api.formDataPost("/api/product/uplodimg", formdata);
    swal("업로드 완료").then(() => (location.href = "/inventory"));
  } catch (e) {
    console.error(e.stack);
    swal(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
}
