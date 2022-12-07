


package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_return_detail")
public class ProductReturnDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "quantity")
    private int quantity;

//    @ManyToOne
//    @JoinColumn(
//            name = "product_import_id",
//            referencedColumnName = "id",
//            nullable = false
//
//    )
//    @JsonIgnore
////    @JsonIgnoreProperties("orderDetails")
//    private ProductImport productImportId;
//    private String productReturnId;

    @ManyToOne
    @JoinColumn(
            name = "product_detail_id",
            referencedColumnName = "id",
            nullable = false

    )
    @JsonIgnoreProperties(value={"orderDetails","priceHistories"})
    private ProductDetail productDetail;

    @ManyToOne
    @JoinColumn(
            name = "product_return_id",
            referencedColumnName = "id",
            nullable = false

    )
//    @JsonIgnoreProperties(value={"productReturnDetails","priceHistories"})
    @JsonIgnore
    private ProductReturn productReturn;



    @Transient
    private long doneQuantity;

}
