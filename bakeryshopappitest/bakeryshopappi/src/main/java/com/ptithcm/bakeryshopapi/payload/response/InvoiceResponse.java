package com.ptithcm.bakeryshopapi.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.ProductReturn;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponse {
    private String id;
    private Date createdAt;
    private Order order;
    private ProductReturn productReturn;
}
