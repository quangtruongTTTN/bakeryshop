import api from "./../common/APIClient";

class AuthService {
  login = (data) => {
    return api.post("/auth/signin", data);
  };

  register = (data) => {
    return api.post("/auth/signup", data);
  };

  logout = () => {
    localStorage.removeItem("user");
  };
  changePass = (data) => {
    return api.post("/auth/changePassword", data);
  };
}

export default new AuthService();
