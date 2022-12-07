import api from "../common/APIClient";

class ProductImportService {

    listSuccess = (query) => {
        return api.get("/productImport/listSuccess", { params: query });
    };

    add = (data) => {
        return api.post("/productImport/add", data);
    };

    updateStatus = (data) => {
        return api.put("/productImport/status", data);
    };

    updateStatusAndShipper = (data) => {
        return api.put("/productImport/statusShipper", data);
    };

    listbyId = (id) => {
        // return api.get("/productImport/getProductImport", { params: query });
        return api.get(`/productImport/getByProductImportId?productImportId=${id}`)
        // return api.get(`/productImport/getProductImport?productImportId=${id}`)
    };
}

export default new ProductImportService();
