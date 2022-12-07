package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(
        name="comments"
//        ,
//        uniqueConstraints = {
//                @UniqueConstraint(columnNames = "name")
//        }
)
@JsonIgnoreProperties(value = {"productId"})
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

//    @NonNull
//    @Column(columnDefinition = "nvarchar(255)")
//    private String name;

    @CreationTimestamp
    private Date time;
//    @Column(name = "userId")
//    private long userId;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id",
            nullable = false
    )
    @JsonIgnoreProperties({"id",
            "username",
            "birthday",
            "address",
            "phone",
            "nameImage",
            "email",
            "roles",
            "createdAt",
            "updatedAt",
            "deletedAt",
            "orders",
            "memberVip",
            "resetPasswordToken"
    })
//    @JsonIgnoreProperties(value = {"fullName","linkImage"})
//    @JsonIncludeProperties(value = {"fullName","linkImage"})
    private User author;
//    @JsonIgnoreProperties("productId")

//    @Column(name = "productId")
//    private String productId;

    @Column(name = "product_detail_id")
    private long productDetailId;

    @Column(columnDefinition = "nvarchar(255)")
    private String content;
    private int rate;
    private boolean active;

    @Column(name = "order_detail_id")
    private long orderDetailId;



//    @OneToMany(
//            fetch = FetchType.LAZY,
//            mappedBy = "categoryId",
//            cascade = CascadeType.ALL
//    )
//    @JsonIgnoreProperties("categoryId")
//    private Collection<Product> products;

}
