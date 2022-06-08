import * as Api from "/api.js";

// const titleInput = document.getElementById("titleInput") //제목
// const manufacturerInput = document.getElementById("manufacturerInput")
// const detailDescriptionInput= document.getElementById("detailDescriptionInput")
const imageInput = document.getElementById("imageInput")
// const inventoryInput = document.getElementById("inventoryInput")
const submitButton = document.getElementById("submitButton")
// const fileNameSpan =document.getElementById("fileNameSpan")
// const priceInput =document.getElementById("priceInput")
const btn=document.getElementById("imgbutton");
console.log(btn);


submitButton.addEventListener("click",submitEvent);

    

async function submitEvent(e) {
    e.preventDefault()
    let formdata=new FormData();
    const image =  imageInput.files[0];
    console.log(image);
    formdata.append('file',image);
    console.log(JSON.stringify(formdata));
    const result=await Api.formDataPost('/api/product/uplodimg',formdata);
    console.log(result);
    }
