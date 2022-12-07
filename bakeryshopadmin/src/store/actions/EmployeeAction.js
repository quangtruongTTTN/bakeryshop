import { getEmployees, onStatus,employeeAdded,employeebyusername,profileUpdate } from "../reducers/EmployeeReducer";
import EmployeeService from "../../services/EmployeeService";
// import { getProducts, productAdded, productUpdate, productDelete, getSaleOff, getSaleOffProduct } from "./../reducers/ProductReducer";
export const EmployeeGetAll = (query) => async (dispatch) => {
  try {
    await EmployeeService.list(query)
      .then((res) => dispatch(getEmployees(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const EmployeeFindByUsernameAction = (query) => async (dispatch) => {
  try {
    await EmployeeService.findemployee(query)
      .then((response) =>
        dispatch(employeebyusername(response.data))
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {

    const formData = new FormData();
    formData.append("username", data.username)
    if (data.multipartFile) {
      formData.append("multipartFile", data.multipartFile);
    }
    formData.append("fullName", data.fullName);
    formData.append("birthday", data.birthday);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    await EmployeeService.update(formData)
      .then(res => dispatch(profileUpdate(res.data)))
      .catch(err => console.error(err));
  } catch (e) {
    return console.error(e);
  }
};
export const addEmployee = (data) => async (dispatch) => {
  try {
    const res = await EmployeeService.register(data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const EmployeeStatusAction = (data) => async (dispatch) => {
  try {
    await EmployeeService.updateStatus(data)
      .then((res) => dispatch(onStatus(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
