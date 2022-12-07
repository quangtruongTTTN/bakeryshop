package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.Invoice;
import com.ptithcm.bakeryshopapi.entity.ProductImportDetail;
import com.ptithcm.bakeryshopapi.entity.ProductReturnDetail;
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
public class ProductReturnResponse {

    private String id;
    private String employeeName;
    private Date createdAt;
    private String employeeId;
//    private Invoice invoice;
    private Collection<ProductReturnDetail> productReturnDetails;
    private long totalQuantity;

}
