import {get, post} from "./HttpService";

export default class CustomerService {

    addCustomer(customer) {
        return (post(customer, `customer`));
    }
    getCustomerDetails(addressType){
        return(get(`/customer/${addressType}`))
    }
}
