import { Router } from "express";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService, categoryService } from "../services";
import path from "path";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";

aws.config.loadFromPath(path.join(__dirname + "../../config/s3.json"));

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "fiystyle",
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
const productRouter = Router();

productRouter.post(
  "/uplodimg",
  upload.single("image-file"),
  async (req, res, next) => {
    const { name, price, content, brand, size, category } = req.body;
    const sizeobj = JSON.parse(size);
    console.log(sizeobj);
    const { location } = req.file;

    const productInfo = {
      name,
      price,
      content,
      brand,
      size: sizeobj,
      category,
      Img: location,
    };
    try {
      const result = await productService.addProduct(productInfo);
      console.log(result);
      // console.log(URL)
      // res.status(201).json({URL})
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
);

//상품 목록
productRouter.get("/", async (req, res) => {
  const productList = await productService.findAll();

  res.json(productList);
});

//상품 수정 (login 확인, admin 확인)
productRouter.patch("/:id", upload.single("image-file"), async (req, res) => {
  const { id } = req.params;
  const { name, price, content, brand, size, category } = req.body;
  const sizeobj = JSON.parse(size);
  console.log(sizeobj);

  let productInfo = {
    name,
    price,
    content,
    brand,
    size: sizeobj,
    category,
  };
  if (!!req.file) {
    const { location } = req.file;
    productInfo.append("Img", location);
  }
  try {
    const result = await productService.editProduct(id, productInfo);
    console.log(result);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

productRouter.patch("/quantity/:id", async (req, res, next) => {
  const _id = req.params.id;
  const { size } = req.body;
  const quantity = Number(req.body.quantity);
  try {
    const updatedProduct = await productService.updateQuantity({
      _id,
      quantity,
      size,
    });
    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
});

//상품 삭제 (login 확인, admin 확인)
productRouter.delete("/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const result = await productService.deleteProduct(productId);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

///api/product/shirts
//카테고리별 상품
productRouter.get("/:category", async (req, res) => {
  const page = Number(req.query.page || 1); // 현재 페이지 번호
  const perPage = 12; // 한 페이지당 표시할 상품 수
  const categoryName = req.params.category;
  // const category = await categoryService.findByName(categoryName);

  const productList = await productService.productList(categoryName);

  const [total, productsPerPage] = await Promise.all([
    productList.length,
    productService.pagination(productList, page, perPage),
  ]);
  const totalPage = Math.ceil(total / perPage);

  res.send({ productsPerPage, totalPage, categoryName });
});

//상품 상세 보기
productRouter.get("/detail/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = await productService.viewProductData(productId);
  res.json(productData);
});

export { productRouter };
