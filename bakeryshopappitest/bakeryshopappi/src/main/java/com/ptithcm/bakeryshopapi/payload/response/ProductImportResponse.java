package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.ProductImportDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductImportResponse {

    private String id;
    private String employeeName;
    private Date createdAt;
//    private long employeeId;
    private String employeeId;
    private Collection<ProductImportDetail> productImportDetails;

    private long totalPrice;
    private long totalQuantity;
}
