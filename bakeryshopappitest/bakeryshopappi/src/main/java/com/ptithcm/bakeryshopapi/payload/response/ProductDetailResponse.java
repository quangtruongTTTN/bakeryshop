package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponse {
    private Product product;
    private ArrayList<Integer> rate;

}
