import axios from "axios";

class SecureCallService {
    constructor() {
        this.url = 'https://03g9pyj47g.execute-api.ap-south-1.amazonaws.com/production';
    }

    checkForUniqueId(email)  {
        
        let response = axios.post(`${this.url}/user/checkUniqueEmail`,
            email, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // register users
    register(user) {
        let response = axios.post(`${this.url}/user/register`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // login users
    login(user) {
        let response = axios.post(`${this.url}/user/authuser`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    getCategoriesData() {
        let response = axios.get(`${this.url}/products/categories`);
        return response;
    }

    getItemsData(itemId)  {
        let response = axios.get(`${this.url}/products/categories/${itemId}`);
        return response;
    }

    placeOrder(order)  {
        let response = axios.post(`${this.url}/products/placeOrder`, order, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    }

    getOrders(email) {
        console.log(email);
        let response = axios.get(`${this.url}/products/getOrders/${email}`);
        return response;
    }

    placeOrders(orders)   {
        let response = axios.post(`${this.url}/products/placeOrders`, orders, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    }
}

export default SecureCallService;