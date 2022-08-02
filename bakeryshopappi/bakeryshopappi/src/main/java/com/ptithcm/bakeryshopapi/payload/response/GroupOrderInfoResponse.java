package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupOrderInfoResponse {

    private String username;
    private List<Long> orderDetailsID;
    private List<Integer> quantities;
    private List<Product> products;
    private List<String> addOptionIds;
    private List<String> sizeOptionIds;


}
