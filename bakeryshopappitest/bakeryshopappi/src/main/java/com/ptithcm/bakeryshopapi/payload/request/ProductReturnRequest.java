package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductReturnRequest {
    private List<ProductDetailReturnRequest> detailReturnRequestList;
    private long employeeId;
    private String invoiceId;
//    @CreationTimestamp
//    private Date createdAt;

}
