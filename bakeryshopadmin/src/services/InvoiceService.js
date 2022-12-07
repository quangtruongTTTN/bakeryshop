import api from "../common/APIClient";

class InvoiceService {
    addInvoice = (data) => {
        return api.post("/invoice/add", data);
    };
    getInvoiceById = (id) => {
        // return api.get("/order/getOrder", { params: query });
        return api.get(`/invoice/${id}`)
        // return api.get(`/order/getOrder?orderId=${id}`)
    };
    showInvoiceByUserId = (query) => {
        return api.get("/invoice/listInvoice", { params: query });
    };
}

export default new InvoiceService();