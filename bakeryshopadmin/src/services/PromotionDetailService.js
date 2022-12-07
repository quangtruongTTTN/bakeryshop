import api from "../common/APIClient";

class PromotionDetailService {
    list = () => {
        return api.get("/promotiondetail/list");
    };
    // list = (id) => {
    //     return api.get(`/promotiondetail/${id}`);
    // };
    add = (data) => {
        return api.post("/promotiondetail/add", data);
    };
    addList = (data,config) => {
        return api.post("/promotiondetail/addList", data, config);
    };
    delete = (id) => {
        return api.delete(`/promotiondetail/delete/${id}`);
    }
}

export default new PromotionDetailService();