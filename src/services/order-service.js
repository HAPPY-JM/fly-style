import { orderModel } from "../db";

//유저라우터에서 사용
class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
    this.cart = [];
  }

  //주문추가
  async addOrder(orderInfo) {
    const {
      userId,
      totalPrice,
      name,
      Address,
      phoneNumber,
      products,
      comment,
    } = orderInfo;

    const newOrderInfo = {
      userId,
      products,
      totalPrice,
      delivery: {
        name,
        phoneNumber,
        Address,
        comment,
      },
    };

    const createdNewOrder = await this.orderModel.create(newOrderInfo);
    return createdNewOrder;
  }

  //유저별 주문 조회
  async findByuserId(userId) {
    const userOrderList = await this.orderModel.findByuserId(userId);
    return userOrderList;
  }

  //아이디별 주문 조회
  async findById(_id) {
    const order = await this.orderModel.findById(_id);
    return order;
  }

  //모든주문조회
  async orderLists() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  //오더 상태 업데이트
  async orderUpdate(_id, orderStatus) {
    const updatedOrder = await this.orderModel.update(_id, orderStatus);
    return updatedOrder;
  }

  //오더 취소
  async orderDelete(_id) {
    const result = await this.orderModel.delete(_id);
    return result;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
