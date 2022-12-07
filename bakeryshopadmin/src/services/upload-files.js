import api from "../common/APIClient";


export const upload = (file) =>{
    let formData = new FormData();
    formData.append("file", file);
    return api.post("/product/site/upload", formData);
  }
  // , {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   }
  // }