import express from "express";
import multer from "multer";
import path from "path";

const multerRouter = express.Router();

const uploads = multer({
    dest :  path.join(__dirname, `../uploads`) ,
})


// multerRouter.post("/onec/upload", uploads.single("file"),(req, res, next)=>{
//     const { originalname } = req.file
//       console.log(originalname)    
//       res.json({파일이름 : originalname   })
//     //프론트 단에 파일 요청시 originalname 사용
// })
// 배열로 받아오고 받아온 인덱스? 
multerRouter.post("/many/upload", uploads.array("files",4),(req, res, next)=>{
    console.log(req.files)
    const { originalname } = req.files
      console.log(originalname) 
      res.json({파일이름 : [...result]   })
    //프론트 단에 파일 요청시 originalname 사용
})
export { multerRouter }