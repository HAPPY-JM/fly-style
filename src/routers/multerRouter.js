// import express, { Router } from "express";
// import multer from "multer";
// import path from "path";
// import aws from "aws-sdk"
// import multerS3 from "multer-s3"
// const multerRouter = express.Router();

// // multer-s3 모듈 이용 기능 구현중
// /* aws.config.loadFromPath(path.join(__dirname + "../../config/s3.json"))

// const s3 = new aws.S3();

// const upload = multer({
//     storage : multerS3({
//         s3 :s3,
//         bucket : 'product imges',
//         acl : 'public-read',
//         contentType : multerS3.AUTO_CONTENT_TYPE,
//         key : function (req,file ,cb ) {
//             cb(null ,`${Date.now}_${file.originalname}`)
//         }
//     })
// })
// multerRouter.get('/read',(req,res)=>{
//     res.sendFile(path.join(__dirname,"form-data.html"))
// })

// multerRouter.post('/single' , upload.single('image'),async(req,res)=>{
//     const img = req.imges;
//     await img.save()
//     res.staus(200).json({img : req.file.location})
// })
//  */

// // multer 모듈이용 기능 구현
// /*
// const multerRouter = express.Router();

// // const uploads = multer({
// //     dest :  path.join(__dirname, `../uploads`) ,
// // })
// //disk에 비해서 diskStorage 옵션을 좀더 추가가 가능하다
// //disk => diskStorage 로 변경

// const fileStorage = multer.diskStorage({
//     destination : (req,file,cb) =>{
//         cb(null ,path.join(__dirname, `../uploads`))
//     },
//     filename : (req,file,cb)=>{
//         // cb(null ,Date.now() +"__"+file.originalname)
//         // 데이터의 중복성 방지
//         cb(null,file.originalname)
//     },
// })
// // 파일 사이즈 제한 단위 계산 후 지정예정
// const upload = multer({storage :fileStorage,limits : {fileSize :1024 * 1024 * 1024 } })

// // multerRouter.get('/uploading',express.static('../uploads'),(req,res)=>{
// //         // const {originalname} = req.files
// //         console.log(req.body)
// //     res.json({succes : true})
// // })
// multerRouter.get('/read',(req,res)=>{
//     res.sendFile(path.join(__dirname,"form-data.html"))
// })
// multerRouter.get('/read',(req,res)=>{
//     res.sendFile("../uploads/:path")
// })
// multerRouter.post('/multiple', upload.array("files",4),async(req,res)=>{
//     console.log(req.files)
//     const data = req.files;
//     const pathImage = data.map(el=>el,path)
//     console.log(pathImage)
//     res.send('success')
// })
//  */

// export { multerRouter }
