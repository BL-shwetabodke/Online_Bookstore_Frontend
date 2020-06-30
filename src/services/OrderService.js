import {get, post} from "./HttpService";

export default class CartService {

    placeOrder(totalPrice) {
        return (post( "",`order/${totalPrice}`));
    }

    fetchOrders() {
        return (get(`order`));
    }
}
