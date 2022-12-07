package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private Order order;
    private int quantity;
    private long totalPrice;
}
