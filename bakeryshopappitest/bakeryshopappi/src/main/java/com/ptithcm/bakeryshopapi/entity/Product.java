package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product")
public class Product implements Serializable {

    @Id
    private String id; // Sử dụng P + getTime()
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String title;

    private String linkImage;
    private String nameImage;
//    private long price;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;
    @Transient
    private ArrayList<Long> rate;
    private Date deletedAt;
    @Column(name ="view_number")
    private long viewNumber;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties("products")
    private Category categoryId;

//    @OneToOne(
//            mappedBy = "product",
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL
//    )
//    private SaleOff saleOff;

//    @OneToMany(
//            mappedBy = "product"
//    )
////    @JsonIgnore
//    private Collection<SaleOff> saleOff;
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "product_sizeoption",
//            joinColumns = @JoinColumn(name = "product_id"),
//            inverseJoinColumns = @JoinColumn(name = "sizeoption_id")
//    )
//private Set<SizeOption> sizeOptions;
    @Transient
    private Set<SizeOption> sizeOptions;

    @Column(name = "content",columnDefinition = "nvarchar(1000)")
    private String content;



    @OneToMany(
            mappedBy = "product"
    )
    @JsonIgnoreProperties(value={"product"})
    private Collection<PromotionDetail> promotionDetails;

    @OneToMany(
            mappedBy = "product", fetch = FetchType.EAGER
    )
    @JsonIgnoreProperties(value={"product"})
    private Collection<ProductDetail> productDetails;

    @OneToMany(mappedBy = "product")
    private Collection<Image> images;
//    @OneToMany(
//            mappedBy = "product"
//    )
//    @JsonIgnore
//    private Collection<GroupOrderDetails> groupOrderDetails;


//    public Product(String id, String name, String title, String linkImage, String nameImage, long price, Date createdAt, Date updatedAt, Date deletedAt, Category categoryId, Collection<SaleOff> saleOff, Set<SizeOption> sizeOptions, Collection<OrderDetail> orderDetails) {
    public Product(String id, String name, String title, String linkImage, String nameImage,  Date createdAt, Date updatedAt, Date deletedAt, Category categoryId,  Set<SizeOption> sizeOptions) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
//        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.categoryId = categoryId;

//        this.sizeOptions = sizeOptions;
//        this.orderDetails = orderDetails;
    }


    public Product(String id, String name, String title, String linkImage, String nameImage,
                   Category categoryId, Set<SizeOption> sizeOptions,  Collection<ProductDetail> productDetails) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
//        this.price = price;
        this.categoryId = categoryId;
//        this.sizeOptions = sizeOptions;

        this.productDetails = productDetails;
//        this.additionOptions = additionOptions;
//        this.saleOff = saleOff;
    }
    public Product(String id, String name, String title, String linkImage, String nameImage,
                   Category categoryId, Set<SizeOption> sizeOptions) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
//        this.price = price;
        this.categoryId = categoryId;
//        this.sizeOptions = sizeOptions;

//        this.additionOptions = additionOptions;
//        this.saleOff = saleOff;
    }

    public Collection<ProductDetail> getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(Collection<ProductDetail> productDetails) {
        this.productDetails = productDetails;
    }
}
