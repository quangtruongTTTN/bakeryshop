import api from "./../common/APIClient";

class OrderService {
    listProcess = (query) => {
        return api.get("/order/listProcess", { params: query });
    };

    listSuccess = (query) => {
        return api.get("/order/listSuccess", { params: query });
    };

    listFail = (query) => {
        return api.get("/order/listFail", { params: query });
    };

    updateStatus = (data) => {
        return api.put("/order/status", data);
    };

    updateStatusAndShipper = (data) => {
        return api.put("/order/statusShipper", data);
    };

    listbyId = (id) => {
        // return api.get("/order/getOrder", { params: query });
        return api.get(`/order/getByOrderId?orderId=${id}`)
        // return api.get(`/order/getOrder?orderId=${id}`)
    };
    getOnebyId = (id) => {
        // return api.get("/order/getOrder", { params: query });
        return api.get(`/order/getOrderByOrderId?orderId=${id}`)
        // return api.get(`/order/getOrder?orderId=${id}`)
    };

    
}

export default new OrderService();
