import * as Api from "/api.js";

const titleInput = document.getElementById("titleInput") //제목
const manufacturerInput = document.getElementById("manufacturerInput")
const detailDescriptionInput= document.getElementById("detailDescriptionInput")
const imageInput = document.getElementById("imageInput")
const inventoryInput = document.getElementById("inventoryInput")
const submitButton = document.getElementById("submitButton")
const fileNameSpan =document.getElementById("fileNameSpan")
const priceInput =document.getElementById("priceInput")
const categorySelectBox =  document.getElementById("categorySelectBox")
const btn=document.getElementById("imgbutton");
const inventorySubmit = document.getElementById("inventorySubmit")
const outputdata = document.getElementById("outputdata")
const sizeInput = document.getElementById("sizeInput")
const sizeList = document.getElementsByClassName('sizeList')
// function sizeListChange(a) {
//     for(let i = 0; i < a.length; i++){
//         const stock = []
//         stock.push(a[i].innerText)
//         return stock
//     }
    
// } 
// console.log(sizeListChange(sizeList.classlist))
console.log(sizeList)
submitButton.addEventListener("click",submitEvent);
imageInput.addEventListener('change', imageNameChange);
inventorySubmit.addEventListener("click",sizeSubmitEvent)
console.log()
function sizeSubmitEvent(e) {
    e.preventDefault();
    const size = [];
    size.push(JSON.stringify({name :sizeInput.value , stock : Number(inventoryInput.value) }))
    console.log(size)
    const list =document.createElement("li");
    list.classList.add("sizeList");
    const newSize = document.createTextNode(size)
    list.appendChild(newSize)
    outputdata.appendChild(list)    
    console.log(outputdata)
    // const sizeresult = sizeList.innerHTML
    // for (const values of sizeList.values()) {
    //     console.log(values)
    //   }
    // console.log(...sizeList)
}




  
function imageNameChange(e) {
    fileNameSpan.innerHTML = e.target.value
}

async function submitEvent(e) {
    e.preventDefault()

    const image =  imageInput.files[0];
    let formdata=new FormData();
    // let sizeresult = []
    formdata.append('image-file',image);
    formdata.append('name',titleInput.value);
    formdata.append('price',priceInput.value);
    formdata.append('content',detailDescriptionInput.value);
    formdata.append('brand',manufacturerInput.value);
    formdata.append('category',categorySelectBox.value);
    formdata.append('size',sizeList);
    // formdata.append('',sizeInput.value)
    // formdata.append('',inventoryInput.value)
    // formdata.append('productQuantity',inventoryInput.value);
    
    // console.log(image);
    // console.log(JSON.stringify(formdata));
    const result=await Api.formDataPost('/api/product/uplodimg',formdata);
    console.log(result);

}
