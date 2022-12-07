package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShipperResponse {
    private User user;
    private long orderNumber;
}
