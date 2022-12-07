


package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orderdetail")
public class OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")

    private String sizeOptionId;
//    private String addOptionId;
    @Column(name = "quantity")
    private int quantity;
    private long priceCurrent;

    @Column(length = 1000)
    private String noteProduct;
    //(optional = false)
    @ManyToOne
    @JoinColumn(
            name = "order_id",
            referencedColumnName = "id",
            nullable = false

    )
    @JsonIgnore
//    @JsonIgnoreProperties("orderDetails")
    private Order orderId;

//    @ManyToOne
//    @JoinColumn(
//            name = "product_id",
//            referencedColumnName = "id",
//            nullable = true
//    )
//    @JsonIgnoreProperties("orderDetails")
//    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "product_detail_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties(value={"orderDetails"})
    private ProductDetail productDetail;

    @Transient
    private long doneQuantity;

    //    @JsonIgnore
//    public OrderDetail(String sizeOptionId, int quantity, long priceCurrent, String noteProduct, Order orderId, Product product) {
//        this.sizeOptionId = sizeOptionId;
//        this.quantity = quantity;
//        this.priceCurrent = priceCurrent;
//        this.noteProduct = noteProduct;
//        this.orderId = orderId;
//        this.product = product;
//    }
    public OrderDetail(String sizeOptionId, int quantity, long priceCurrent, String noteProduct, Order orderId,  ProductDetail productDetail) {
        this.sizeOptionId = sizeOptionId;
        this.quantity = quantity;
        this.priceCurrent = priceCurrent;
        this.noteProduct = noteProduct;
        this.orderId = orderId;
//        this.product = product;
        this.productDetail=productDetail;
    }
}
