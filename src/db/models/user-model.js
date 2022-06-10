import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    //특정 이메일을 가진 유저 찾기
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    //특정 아이디를 가진 유저 찾기
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    //유저 생성(회원가입)
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    //모든 유저 가져오기(아마 관리자 모드에서)
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    //유저 정보 수정(아마도 비밀번호 변경 혹은 주소 변경)
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(userId){
    const deleteU = await User.deleteOne({ _id: userId});
    return deleteU;
  }

}



const userModel = new UserModel();

export { userModel };
