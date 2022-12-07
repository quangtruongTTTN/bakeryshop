import api from "../common/APIClient";

class PriceHistoryService {
    list = (query) => {
        return api.get("/priceHistory/list", { params: query });
    };
    add = (formData) => {
        return api.post("/priceHistory", formData);
    };
    update = (formData) => {
        return api.put("/priceHistory", formData);
    };
    delete = (id) => {
        return api.put(`/priceHistory/${id}`);
    }
    showSaleOff = (query) => {
        return api.get("/priceHistory/saleoff", { params: query });
    };
    showSaleOffPriceHistory = (query) => {
        return api.get("/priceHistory/saleoff?saleOff=add", { params: query });
    };

    showPromotionDetail = (query) => {
        return api.get("/priceHistory/promotiondetail?promotionDetail", { params: query });
        // return api.get("/promotiondetail/list", { params: query });
    };
    showPromotionDetailPriceHistory = (query) => {
        return api.get("/priceHistory/promotiondetail?promotionDetail=add", { params: query });
        // return api.get("/promotiondetail?promotiondetail=add", { params: query });
    };
}

export default new PriceHistoryService();