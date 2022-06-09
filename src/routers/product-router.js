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
  async (req, res) => {
    const { name, price, content, brand } = req.body;
    console.log(req.file);
    // const {} = req.file;
    // console.log(pathImage)
    // await Post.create({})
    console.log(req.body);
    const { location } = req.file;
    console.log(location);

    const productInfo = {
      name,
      price,
      content,
      brand,
      Img: location,
    };
    const result = await productService.addProduct(productInfo);
    console.log(result);
    // console.log(URL)
    // res.status(201).json({URL})
    res.status(201).json(result);
  }
);

//상품 등록 (login 확인, admin 확인)/
//POST /api/product/ => 상품등록하는 라우팅
//Ajpi.post('/api/product',productinfo)=> 상품등록하는 라우팅
// <<<<<<< HEAD
// productRouter.post(
//   "/",
//   async (req, res, next) => {
//     try {
//       const { name, category, price, content, brand, size } = req.body;
//       const categorys = await categoryService.findByName(category);

//       const newProduct = await productService.addProduct({
//         name,
//         category:categorys._id,
//         price,
//         content,
//         brand,
//         size,
//       });

// productRouter.post(
//   "/",
//   async (req, res, next) => {
//     try {
//       const { name, category, price, content, brand, size } = req.body;

//       const newProduct = await productService.addProduct({
//         name,
//         category,
//         price,
//         content,
//         brand,
//         size,
//       });

//       res.json(newProduct); //이부분은 json으로 받아온뒤에 프론트에서 보내주어도 괜찮을 듯 하다 아니면 그냥 프론트단으로 제품등록이 완료되었습니다 아니면 전체 리스트? 를 보여주는게 더 나을듯
//     } catch (err) {
//       next(err);
//     }
//   }
// );

//상품 목록
productRouter.get("/", async (req, res) => {

    const productList = await productService.findAll();

    res.json(productList);
});

//상품 수정 (login 확인, admin 확인)
productRouter.patch("/:id", async (req, res) => {
  const productId = req.params.id;

  const { name, category, price, content, brand, size } = req.body;

  const updateData = {
    name,
    category,
    price,
    content,
    brand,
    size,
  };

  const editProduct = await productService.editProduct(productId, updateData);

  res.json(editProduct);
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
productRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  await productService.deleteProduct(productId);

  res.send(`상품을 삭제했습니다.`);
  // res.redirect("/api/product");
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
