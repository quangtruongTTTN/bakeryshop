import api from "./../common/APIClient";

class ProductService {
    list = (query) => {
        return api.get("/product/list", { params: query });
    };
    listAll = (query) => {
        return api.get("/product/listAll", { params: query });
    };
    add = (formData) => {
        return api.post("/product", formData);
    };
    update = (formData) => {
        return api.put("/product", formData);
    };
    delete = (id) => {
        return api.put(`/product/${id}`);
    }
    showSaleOff = (query) => {
        return api.get("/product/saleoff", { params: query });
    };
    showSaleOffProduct = (query) => {
        return api.get("/product/saleoff?saleOff=add", { params: query });
    };

    showPromotionDetail = (query) => {
        return api.get("/product/promotiondetail?promotionDetail", { params: query });
        // return api.get("/promotiondetail/list", { params: query });
    };
    showPromotionDetailProduct = (query) => {
        return api.get("/product/promotiondetail?promotionDetail=add", { params: query });
        // return api.get("/promotiondetail?promotiondetail=add", { params: query });
    };
}

export default new ProductService();