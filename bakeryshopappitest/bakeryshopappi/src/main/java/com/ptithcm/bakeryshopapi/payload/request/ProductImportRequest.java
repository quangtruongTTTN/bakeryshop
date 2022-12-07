package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductImportRequest {
    private List<ProductDetailImportRequest> detailImportRequestList;
    private long employeeId;
//    @CreationTimestamp
//    private Date createdAt;

}
