import api from "../common/APIClient";

class ProductReturnService {

    listSuccess = (query) => {
        return api.get("/productReturn/listSuccess", { params: query });
    };

    add = (data) => {
        return api.post("/productReturn/add", data);
    };

    updateStatus = (data) => {
        return api.put("/productReturn/status", data);
    };

    updateStatusAndShipper = (data) => {
        return api.put("/productReturn/statusShipper", data);
    };

    listbyId = (id) => {
        // return api.get("/productReturn/getProductReturn", { params: query });
        return api.get(`/productReturn/getByProductReturnId?productReturnId=${id}`)
        // return api.get(`/productReturn/getProductReturn?productReturnId=${id}`)
    };
}

export default new ProductReturnService();
