import api from "../common/APIClient";

class ShipperService {
  list = (query) => {
    return api.get("/shipper/list", { params: query });
  };

  listShipperAndNumberOfOrder = (query) => {
    return api.get("/shipper/listAndAmount", { params: query });
  };

  updateStatus = (data) => {
    return api.put("/shipper/status", data);
  };

  register = (data) => {
    return api.post("/auth/signupShipper", data);
  };
  findshipper = (username) => {
    return api.get(`/shipper/${username}`);
  };
  update = (formData) => {
    return api.put("/shipper/updateProfile", formData);
  };

  //

  listProcess = (query) => {
    return api.get("/order/listProcessOfShipper", { params: query });
  };

  listSuccess = (query) => {
    return api.get("/order/listSuccessOfShipper", { params: query });
  };

  listFail = (query) => {
    return api.get("/order/listFailOfShipper", { params: query });
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
}

export default new ShipperService();
