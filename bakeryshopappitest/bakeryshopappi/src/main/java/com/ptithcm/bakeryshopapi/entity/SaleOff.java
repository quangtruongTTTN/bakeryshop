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
@Table(name = "saleoff")
public class SaleOff implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @NonNull
    private double discount;

    @NonNull
//    @CreationTimestamp
    @Column(name = "end_date")
    private Date endDate;

//    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

//    @CreationTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    private Date deletedAt;


//    @OneToOne(
//            fetch = FetchType.LAZY,
//            optional = false
//    )
//    @JoinColumn(
//            name = "product_id",
//            nullable = false
//    )
//    @NonNull
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties("saleOff")
    private Product product;

//    public SaleOff(double discount, Date endDate, Product product) {
//        this.discount = discount;
//        this.endDate = endDate;
//        this.product = product;
//    }

    public SaleOff(double discount, Date createdAt, Date endDate, Product product) {
        this.discount = discount;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.product = product;
    }
}
