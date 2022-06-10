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
const submitButton = document.getElementById("submitButton");
const fileNameSpan = document.getElementById("fileNameSpan");
const priceInput = document.getElementById("priceInput");
const categorySelectBox = document.getElementById("categorySelectBox");
const inventorySubmit = document.getElementById("inventorySubmit");
const outputdata = document.getElementById("outputdata");
const categories = await Api.get("/api/category");
let category = "";

categories.map((data) => {
  const select = document.createElement("option");
  select.value = data.name;
  select.innerText = data.name;
  categorySelectBox.appendChild(select);
});

categorySelectBox.addEventListener("change", () => {
  category = categorySelectBox.value;
});
submitButton.addEventListener("click", submitEvent);
imageInput.addEventListener("change", imageNameChange);
inventorySubmit.addEventListener("click", sizeSubmitEvent);

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
  const deleteDiv = $("div.mt-5");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "제품 삭제하기";
  deleteBtn.addEventListener("click", deleteProduct);
  deleteDiv.appendChild(deleteBtn);
}

function sizeSubmitEvent(e) {
  e.preventDefault();

  const list = document.createElement("li");
  const liEl = `사이즈<input class='sizeField' type="text"/>&nbsp&nbsp&nbsp&nbsp&nbsp수량<input type="Number" class='quantityField'/>`;
  list.innerHTML = liEl;
  list.classList.add("sizeList");
  outputdata.appendChild(list);
}

function imageNameChange(e) {
  fileNameSpan.innerHTML = e.target.value;
}

async function deleteProduct(e) {
  e.preventDefault();
  try {
    const result = await Api.delete("/api/product", id);
    swal("삭제되었습니다").then(() => (location.href = "/inventory"));
    return;
  } catch (e) {
    console.error(e.stack);
    swal(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
  }
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
  if (
    !titleInput.value ||
    !priceInput.value ||
    !detailDescriptionInput.value ||
    !manufacturerInput.value ||
    !category ||
    size.length < 1
  ) {
    swal("빈 칸이 있습니다");
    return;
  }
  formdata.append("name", titleInput.value);
  formdata.append("price", priceInput.value);
  formdata.append("content", detailDescriptionInput.value);
  formdata.append("brand", manufacturerInput.value);
  formdata.append("category", category);
  formdata.append("size", JSON.stringify(size));

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
