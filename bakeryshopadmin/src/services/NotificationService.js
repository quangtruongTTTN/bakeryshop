import api from "../common/APIClient";

class NotificationService {
    loadNotification = () => {
        return api.get("/admin/load-notification");
    };
    
    pushNotification = () => {
        return api.put("/admin/push-notification");
    };
    readNotification = (id) => {
        return api.get(`/admin/read-notification?id=${id}`);
    }
}

export default new NotificationService();