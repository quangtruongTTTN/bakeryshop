import { getListProcess, getListFail, getListSuccess, getShipperAndNumberOrder, getShippersN,  getShippers, onStatus,shipperAdded, shipperbyusername,profileUpdate } from "../reducers/ShipperReducer";
import ShipperService from "../../services/ShipperService";
// import { getProducts, productAdded, productUpdate, productDelete, getSaleOff, getSaleOffProduct } from "./../reducers/ProductReducer";
export const ShipperGetAll = (query) => async (dispatch) => {
  try {
    await ShipperService.list(query)
      .then((res) => dispatch(getShippers(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShipperAndNumberOrderGetAll = (query) => async (dispatch) => {
  try {
    await ShipperService.listShipperAndNumberOfOrder(query)
      .then((res) => dispatch(getShipperAndNumberOrder(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShipperFindByUsernameAction = (query) => async (dispatch) => {
  try {
    await ShipperService.findshipper(query)
      .then((response) =>
        dispatch(shipperbyusername(response.data))
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

    await ShipperService.update(formData)
      .then(res => dispatch(profileUpdate(res.data)))
      .catch(err => console.error(err));
  } catch (e) {
    return console.error(e);
  }
};
export const addShipper = (data) => async (dispatch) => {
  try {
    const res = await ShipperService.register(data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const ShipperStatusAction = (data) => async (dispatch) => {
  try {
    await ShipperService.updateStatus(data)
      .then((res) => dispatch(onStatus(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
//
export const OrderListProcess = (query) => async (dispatch) => {
  try {
      await ShipperService.listProcess(query)
          .then((res) => dispatch(getListProcess(res.data)))
          .catch((err) => console.error(err));
  } catch (error) {
      console.error(error);
  }
};

export const OrderListSuccess = (query) => async (dispatch) => {
  try {
      await ShipperService.listSuccess(query)
          .then((res) => dispatch(getListSuccess(res.data)))
          .catch((err) => console.error(err));
  } catch (error) {
      console.error(error);
  }
};

export const OrderListFail = (query) => async (dispatch) => {
  try {
      await ShipperService.listFail(query)
          .then((res) => dispatch(getListFail(res.data)))
          .catch((err) => console.error(err));
  } catch (error) {
      console.error(error);
  }
};

export const OrderStatusUpdate = (data) => async (dispatch) => {
  try {
      await ShipperService.updateStatus(data)
          .then((res) => dispatch(onStatus(res.data)))
          .catch((err) => console.error(err));
  } catch (error) {
      console.error(error);
  }
};

export const OrderStatusAndShipperUpdate = (data) => async (dispatch) => {
  try {
      await ShipperService.updateStatusAndShipper(data)
          .then((res) => dispatch(onStatus(res.data)))
          .catch((err) => console.error(err));
  } catch (error) {
      console.error(error);
  }
};
export const OrderGetById = (id) => async (dispatch) => {
  try {
     const res =  await ShipperService.listbyId(id)
  //    const res =  await ShipperService.listbyId("O0882021035829")
     return res;
  } catch (error) {
      console.error(error);
  }
};