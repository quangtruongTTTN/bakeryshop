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
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product_detail")
public class ProductDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne //(cascade=CascadeType.ALL)
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties(value={"productDetails","promotionDetails","promotionDetails","categoryId"})
    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "size_id",
            referencedColumnName = "id",
            nullable = false
    )
    private SizeOption sizeOption;

    @OneToMany(
            mappedBy = "productDetailId", fetch = FetchType.LAZY
    )
    @JsonIgnoreProperties(value={"product"})
    private Collection<PriceHistory> priceHistories;

    @OneToMany(
            mappedBy = "productDetail", fetch = FetchType.LAZY
    )
    @JsonIgnoreProperties(value={"product"})
    private Collection<OrderDetail> orderDetails;

    private long stock;


}
