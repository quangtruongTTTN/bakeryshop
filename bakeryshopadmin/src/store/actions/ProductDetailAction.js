import { getProductDetails, productDetailAdded, productDetailUpdate, productDetailDelete, getSaleOff, getSaleOffProductDetail, getPromotionDetailProductDetail, getPromotionDetail } from "../reducers/ProductDetailReducer";
import ProductDetailService from "../../services/ProductDetailService";

export const ProductDetailGetAll = (query) => async (dispatch) => {
  try {
    await ProductDetailService.list(query)
      .then((res) => dispatch(getProductDetails(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const addProductDetail = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append(`multipartFile`, data.multipartFile)
    formData.append("name", data.name)
    formData.append("title", data.title)
    formData.append("price", data.price)
    formData.append("categoryId", JSON.stringify(data.categoryId))
    // formData.append("productDetailDetails", JSON.stringify(data.productDetailDetails))
    // for (let i = 0; i < data.additionOptions.length; i++) {
    //   formData.append(`additionOptions[${i}]`, JSON.stringify(data.additionOptions[i]))
    // }

    for (let i = 0; i < data.sizeOptions.length; i++) {
      formData.append(`sizeOptions[${i}]`, JSON.stringify(data.sizeOptions[i]))
    }
    for (let i = 0; i < data.productDetailDetails.length; i++) {
      formData.append(`productDetailDetails[${i}]`, JSON.stringify(data.productDetailDetails[i]))
    }
    for (let i = 0; i < data.catalogs.length; i++) {
      formData.append(`catalogs[${i}]`, data.catalogs[i])
    }
    // formData.append(`catalogs`, data.catalogs)
    // formData.append(`catalogs`, data.catalogs)
    // if (data.catalogs) {
      
    //   // for (let i = 0; i < data.catalogs.length; i++) {
        
    //   // }
      
    //   // formData.append("catalogs", data.catalogs)
    //   // formData.append("catalogs1", data.catalogs)
    //   // formData.append("catalogs2", data.catalogs)
    //   // formData.append("catalogs3", data.catalogs)
    //   // formData.append("catalogs4", data.catalogs)
    //   // formData.append("catalogs5", data.catalogs)
    // }else{
    //   formData.append("catalogs", data.catalogs)
    // }
    const res = await ProductDetailService.add(formData);

    dispatch(productDetailAdded(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const updateProductDetail = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("id", data.id)
    if (data.multipartFile) {
      formData.append("multipartFile", data.multipartFile)
    }
    formData.append("name", data.name)
    formData.append("title", data.title)
    formData.append("price", data.price)
    formData.append("categoryId", JSON.stringify(data.categoryId))
    formData.append("productDetailDetails", JSON.stringify(data.productDetailDetails))
    for (let i = 0; i < data.catalogs.length; i++) {
      formData.append(`catalogs[${i}]`, data.catalogs[i])
    }
    // for (let i = 0; i < data.additionOptions.length; i++) {
    //   formData.append(`additionOptions[${i}]`, JSON.stringify(data.additionOptions[i]))
    // }

    for (let i = 0; i < data.sizeOptions.length; i++) {
      formData.append(`sizeOptions[${i}]`, JSON.stringify(data.sizeOptions[i]))
    }

    const res = await ProductDetailService.update(formData);

    dispatch(productDetailUpdate(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const deleteProductDetail = (data) => async (dispatch) => {
  try {
    const res = await ProductDetailService.delete(data);
    dispatch(productDetailDelete(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const ProductDetailSaleOff = (query) => async (dispatch) => {
  try {
    await ProductDetailService.showSaleOff(query)
      .then((res) => dispatch(getSaleOff(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
export const ProductDetailPromotionDetail = (query) => async (dispatch) => {
  try {
    await ProductDetailService.showPromotionDetail(query)
      .then((res) => dispatch(getPromotionDetail(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShowProductDetailSaleOff = (query) => async (dispatch) => {
  try {
    await ProductDetailService.showSaleOffProductDetail(query)
      .then((res) => dispatch(getSaleOffProductDetail(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShowProductDetailPromotionDetail = (query) => async (dispatch) => {
  try {
    await ProductDetailService.showPromotionDetailProductDetail(query)
      .then((res) => dispatch(getPromotionDetailProductDetail(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};