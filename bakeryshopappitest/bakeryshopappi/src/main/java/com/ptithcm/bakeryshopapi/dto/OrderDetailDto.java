package com.ptithcm.bakeryshopapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private long id;

    private String sizeOptionId;

    private int quantity;
    private long priceCurrent;

    private String noteProduct;

    private Order orderId;

    private Product product;

    private ProductDetail productDetail;

}
