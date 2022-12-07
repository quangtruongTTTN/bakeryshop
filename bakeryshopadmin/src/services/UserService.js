import api from "./../common/APIClient";

class UserService {
  list = (query) => {
    return api.get("/user/list", { params: query });
  };

  updateStatus = (data) => {
    return api.put("/user/status", data);
  };
  // countAccount = () =>{
  //   return api.get("/user/account/count");
  // }
}

export default new UserService();
