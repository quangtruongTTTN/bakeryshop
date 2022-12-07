package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
//    private Page<Product> product;
    private List<Product> product;
    private String newProductId;
    private long totalPages;
}
