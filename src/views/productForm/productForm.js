import * as Api from "/api.js";

const titleInput = document.getElementById("titleInput") //제목
const manufacturerInput = document.getElementById("manufacturerInput")
const detailDescriptionInput= document.getElementById("detailDescriptionInput")
const imageInput = document.getElementById("imageInput")
const inventoryInput = document.getElementById("inventoryInput")
const submitButton = document.getElementById("submitButton")
const fileNameSpan =document.getElementById("fileNameSpan")
const priceInput =document.getElementById("priceInput")
const btn=document.getElementById("imgbutton");
console.log(btn);


submitButton.addEventListener("click",submitEvent);

    

async function submitEvent(e) {
    e.preventDefault()
    const image =  imageInput.files[0];
    
    let formdata=new FormData();
        formdata.append('image-file',image);
        formdata.append('name',titleInput.value);
        formdata.append('price',priceInput.value);
        formdata.append('content',detailDescriptionInput.value);
        formdata.append('brand',manufacturerInput.value);
        // formdata.append('category',);
        // formdata.append('size',);

    // console.log(image);
    // console.log(JSON.stringify(formdata));
    const result=await Api.formDataPost('/api/product/uplodimg',formdata);
    console.log(result);
    }
