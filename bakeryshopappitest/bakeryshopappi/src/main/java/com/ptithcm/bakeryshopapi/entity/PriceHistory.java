package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="price_history")
public class PriceHistory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private long price;

    @CreationTimestamp
    private Date createdAt;
//    private Date createdAt;

    @ManyToOne
    @JoinColumn(
            name = "product_detail_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnore
    private ProductDetail productDetailId;

    @ManyToOne
    @JoinColumn(
            name = "employee_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties("orders")
    private User employeeId;
//    @OneToMany(
//            mappedBy = "product"
//    )
//    @JsonIgnore
//    private Collection<GroupOrderDetails> groupOrderDetails;


    public PriceHistory(long price, ProductDetail productDetail, User employeeId) {
        this.price = price;
        this.productDetailId = productDetail;
        this.employeeId = employeeId;
    }


}
