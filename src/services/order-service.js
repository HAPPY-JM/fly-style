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
    // 객체 destructuring
    // {
    //     userId,
    //     orderdate,
    //     [products],
    //     totalPrice,
    //     delivery:{
    //         name,
    //         Adrress:{

    //         },
    //         Comment,
    //     }
    // }
    const { userId, totalPrice, name, address } = orderInfo;
    const products = this.cart;
    const newOrderInfo = {
      userId,
      products,
      totalPrice,
      delivery: {
        name,
        Address: address,
        comment: "" && userInfo.comment,
      },
    };

    const createdNewOrder = await this.orderModel.create(newOrderInfo);
    this.cart = [];
    return createdNewOrder;
  }

  addCart(item) {
    this.cart.push(item);
    return this.cart;
  }

  //유저별 주문 조회
  async findByuserId(userId) {
    const userOrderList = await this.orderModel.findByuserId(userId);
    return userOrderList;
  }

  async findById(_id) {
    const order = await this.orderModel.findById(_id);
    return order;
  }

  async orderLists() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async orderUpdate(_id, orderStatus) {
    const updatedOrder = await this.orderModel.update(_id, orderStatus);
    return updatedOrder;
  }

  async orderDelete(_id) {
    const result = await this.orderModel.delete(_id);
    return result;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
