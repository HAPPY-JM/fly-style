import express from "express";
import multer from "multer";
import path from "path";

const multerRouter = express.Router();

// const uploads = multer({
//     dest :  path.join(__dirname, `../uploads`) ,
// })
//disk에 비해서 diskStorage 옵션을 좀더 추가가 가능하다
//disk => diskStorage 로 변경 

const fileStorage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null ,path.join(__dirname, `../uploads`))
    },
    filename : (req,file,cb)=>{
        cb(null ,Date.now() +"__"+file.originalname)
    },
    // fileFilter : (req , file ,cb) =>{
    //     if(file.size > 50000){
    //         cb(null,false)
    //     }
    // }
})
const upload = multer({storage :fileStorage ,limits : {fileSize :24 * 24 * 24 }})
// multerRouter.get('/uploading',express.static('../uploads'),(req,res)=>{
//         // const {originalname} = req.files
//         console.log(req.body)
//     res.json({succes : true})
// })
// multerRouter.post("/onec/upload", uploads.single("file"),(req, res, next)=>{
//     const { originalname } = req.file
//       console.log(originalname)    
//       res.json({파일이름 : originalname   })
//     //프론트 단에 파일 요청시 originalname 사용
// })
// // 배열로 받아오고 받아온 인덱스? 
// multerRouter.post("/many/upload", uploads.array("files",4),(req, res, next)=>{
//     console.log(req.files)
//     const { originalname } = req.files
//       console.log(originalname) 
//       res.json({succes : true })
// })
multerRouter.get('/read',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
multerRouter.post('/multiple', upload.array("files",4),(req,res)=>{
    console.log(req.files)
    res.send('success')
})
export { multerRouter }