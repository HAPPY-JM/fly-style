import express, { Router } from "express";
import path from "path";
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import multer from "multer";

aws.config.loadFromPath(path.join(__dirname + "../../config/s3.json"))
const s3 = new aws.S3();

const upload = multer({
    storage : multerS3({
        s3 :s3,
        bucket : 'fiystyle',
        acl : 'public-read-write',
        key : function (req,file ,cb ) {
            cb(null ,Date.now()+"_"+file.originalname)
        }
    })
})


const multerRouter = express.Router();


multerRouter.post('/uplodimg', upload.single("file") , async(req,res)=>{
    console.log(req.file)
    // const {} = req.file;
    // console.log(pathImage)
    // await Post.create({})
    console.log(req.body)
    const {location} = req.file
    console.log(location);
    
    console.log(req.body);
    const URL = JSON.parse(JSON.stringify(req.body))
    // console.log(URL)
    // res.status(201).json({URL})
    res.status(201).json(location);
})


export { multerRouter }