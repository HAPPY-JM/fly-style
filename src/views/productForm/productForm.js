import * as Api from "/api.js";

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
const size = [];
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

function sizeSubmitEvent(e) {
  e.preventDefault();

  const result1 = size.push({
    name: sizeInput.value,
    stock: Number(inventoryInput.value),
  });
  console.log(size);
  const list = document.createElement("li");
  list.classList.add("sizeList");
  const newSize = document.createTextNode(size);
  list.appendChild(newSize);
  outputdata.appendChild(list);
  console.log(outputdata);
  const sizeresult = sizeList.innerHTML;
  console.log(...sizeList);
  console.log(result1);
}

function imageNameChange(e) {
  fileNameSpan.innerHTML = e.target.value;
}

async function submitEvent(e) {
  e.preventDefault();

  const image = imageInput.files[0];
  let formdata = new FormData();

  formdata.append("image-file", image);
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
  const result = await Api.formDataPost("/api/product/uplodimg", formdata);
  console.log(result);
}
