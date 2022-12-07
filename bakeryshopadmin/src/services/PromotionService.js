import api from "../common/APIClient";

class PromotionService {
    list = () => {
        return api.get("/promotion/list");
    };
    page = (query) => {
        return api.get("/promotion/page", { params: query });
    }
    add = (data) => {
        return api.post("/promotion/add", data);
    };
    update = (data) => {
        return api.put("/promotion/edit", data);
    };
    delete = (id) => {
        return api.put(`/promotion/delete/${id}`);
    }
}

export default new PromotionService();