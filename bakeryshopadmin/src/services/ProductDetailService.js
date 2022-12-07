import api from "../common/APIClient";

class ProductDetailService {
    list = (query) => {
        return api.get("/productDetail/list", { params: query });
    };
    add = (formData) => {
        return api.post("/productDetail", formData);
    };
    update = (formData) => {
        return api.put("/productDetail", formData);
    };
    delete = (id) => {
        return api.put(`/productDetail/${id}`);
    }
    showSaleOff = (query) => {
        return api.get("/productDetail/saleoff", { params: query });
    };
    showSaleOffProductDetail = (query) => {
        return api.get("/productDetail/saleoff?saleOff=add", { params: query });
    };

    showPromotionDetail = (query) => {
        return api.get("/productDetail/promotiondetail?promotionDetail", { params: query });
        // return api.get("/promotiondetail/list", { params: query });
    };
    showPromotionDetailProductDetail = (query) => {
        return api.get("/productDetail/promotiondetail?promotionDetail=add", { params: query });
        // return api.get("/promotiondetail?promotiondetail=add", { params: query });
    };
}

export default new ProductDetailService();