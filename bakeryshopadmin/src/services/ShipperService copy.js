import api from "../common/APIClient";

class EmployeeService {
  list = (query) => {
    return api.get("/employee/list", { params: query });
  };

  updateStatus = (data) => {
    return api.put("/employee/status", data);
  };

  register = (data) => {
    return api.post("/auth/signupEmployee", data);
  };
  findemployee = (username) => {
    return api.get(`/employee/${username}`);
};
update = (formData) => {
    return api.put("/employee/updateProfile", formData);
};
}

export default new EmployeeService();
