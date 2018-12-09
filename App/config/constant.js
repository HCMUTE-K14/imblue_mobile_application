let baseUrl="http://192.168.1.181:8080/";
module.exports = {
    urlLogin: baseUrl+"rest/auth/login",
    urlOrders: baseUrl+"rest/orders",
    urlBeverages: baseUrl+"rest/beverages",
    urlPayment: baseUrl+"rest/orders/changeStatus",
    urlCreateCategory: baseUrl+"rest/categories",
};