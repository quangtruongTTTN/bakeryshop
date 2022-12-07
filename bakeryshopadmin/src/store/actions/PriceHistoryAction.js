import { getPriceHistorys, priceHistoryAdded, priceHistoryUpdate, priceHistoryDelete, getSaleOff, getSaleOffPriceHistory, getPromotionDetailPriceHistory, getPromotionDetail } from "../reducers/PriceHistoryReducer";
import PriceHistoryService from "../../services/PriceHistoryService";

export const PriceHistoryGetAll = (query) => async (dispatch) => {
  try {
    await PriceHistoryService.list(query)
      .then((res) => dispatch(getPriceHistorys(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const addPriceHistory = (data) => async (dispatch) => {
  try {
    // const formData = new FormData();
    // formData.append("productDetailId", data.productDetailId)
    // formData.append("price", data.price)
    // formData.append("employeeId", data.employeeId)
    const res = await PriceHistoryService.add(data);

    dispatch(priceHistoryAdded(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const updatePriceHistory = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("productDetailId", data.productDetailId)
    formData.append("price", data.price)
    formData.append("employeeId", data.employeeId)
    const res = await PriceHistoryService.update(formData);

    dispatch(priceHistoryUpdate(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const deletePriceHistory = (data) => async (dispatch) => {
  try {
    const res = await PriceHistoryService.delete(data);
    dispatch(priceHistoryDelete(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const PriceHistorySaleOff = (query) => async (dispatch) => {
  try {
    await PriceHistoryService.showSaleOff(query)
      .then((res) => dispatch(getSaleOff(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
export const PriceHistoryPromotionDetail = (query) => async (dispatch) => {
  try {
    await PriceHistoryService.showPromotionDetail(query)
      .then((res) => dispatch(getPromotionDetail(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShowPriceHistorySaleOff = (query) => async (dispatch) => {
  try {
    await PriceHistoryService.showSaleOffPriceHistory(query)
      .then((res) => dispatch(getSaleOffPriceHistory(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShowPriceHistoryPromotionDetail = (query) => async (dispatch) => {
  try {
    await PriceHistoryService.showPromotionDetailPriceHistory(query)
      .then((res) => dispatch(getPromotionDetailPriceHistory(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};