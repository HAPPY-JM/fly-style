import { productModel } from "../db";
import mongoose from "mongoose";

//프로덕트라우터에서 사용
class ProductService {
    // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
    constructor(productModel) {
        this.productModel = productModel;
    }
    
    // 상품등록
    async addProduct(productInfo) {
      // 객체 destructuring
        const { name, category, price, content, brand, size } = productInfo;
    
      // 상품명 중복 확인
        const productName = await this.productModel.findByName(name);
        if (productName) {
        throw new Error(
            "이 상품명은 현재 존재합니다. 다른 상품명을 입력해 주세요."
        );
        }

      // 상품명 중복은 이제 아니므로, 상품등록을 진행함

      // 우선 새로운 objectId 생성
        const productId = await mongoose.Types.objectId();

        const newProductInfo = { productId, name, category, price, content, brand, size };

      // db에 저장
        const createdNewProduct = await this.productModel.create(newProductInfo);

        return createdNewProduct;
    }


    // async setProduct(productInfoRequired, toUpdate) {
    //     // 객체 destructuring
    //     const { userId, currentPassword } = userInfoRequired;
    
    //     // 우선 해당 id의 유저가 db에 있는지 확인
    //     let user = await this.userModel.findById(userId);
    
    //     // db에서 찾지 못한 경우, 에러 메시지 반환
    //     if (!user) {
    //       throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    //     }
    
    //     // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함
    
    //     // 비밀번호 일치 여부 확인
    //     const correctPasswordHash = user.password;
    //     const isPasswordCorrect = await bcrypt.compare(
    //       currentPassword,
    //       correctPasswordHash
    //     );
    
    //     if (!isPasswordCorrect) {
    //       throw new Error(
    //         "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
    //       );
    //     }
    
    //     // 이제 드디어 업데이트 시작
    
    //     // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    //     const { password } = toUpdate;
    
    //     if (password) {
    //       const newPasswordHash = await bcrypt.hash(password, 10);
    //       toUpdate.password = newPasswordHash;
    //     }
    
    //     // 업데이트 진행
    //     user = await this.userModel.update({
    //       userId,
    //       update: toUpdate,
    //     });
    
    //     return user;
    //   }

}


const productService = new ProductService(productModel);

export { productService };
