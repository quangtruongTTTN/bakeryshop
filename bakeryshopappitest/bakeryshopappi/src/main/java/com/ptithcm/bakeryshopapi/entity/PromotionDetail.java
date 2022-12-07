package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "promotion_details")
public class PromotionDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @ManyToOne
    @JoinColumn(
            name = "promotion_id",
            referencedColumnName = "id",
            nullable = false
    )
//    @JsonIgnore
    @JsonIgnoreProperties("promotionDetails")
    private Promotion promotion;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(
//            name = "product_id",
//            referencedColumnName = "id",
//            nullable = false
//    )
//    private Product product;
    @ManyToOne
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties({"promotionDetails","saleOff"})
//    @JsonIgnore
    private Product product;


    @NonNull
    private int discount;
    public PromotionDetail(int discount, Product product, Promotion promotion) {
        this.discount = discount;
        this.product = product;
        this.promotion = promotion;
    }
}
