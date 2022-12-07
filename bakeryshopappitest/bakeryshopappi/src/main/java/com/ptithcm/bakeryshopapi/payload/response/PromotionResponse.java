package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.Promotion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromotionResponse {
    private Promotion promotion;
    private ArrayList<Product> products;
}
