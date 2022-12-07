package com.ptithcm.bakeryshopapi.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ptithcm.bakeryshopapi.entity.*;
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
public class ProductTest implements Serializable {

    private String id; // Sử dụng P + getTime()
    private String name;
//    private String title;

    private String linkImage;
    private String nameImage;
//    private long price;

    private Date createdAt;

//    private Date updatedAt;

    private Date deletedAt;

//    private long categoryId;




//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "product_additionoption",
//            joinColumns = @JoinColumn(name = "product_id"),
//            inverseJoinColumns = @JoinColumn(name = "additionoption_id")
//    )
//    private Set<AdditionOption> additionOptions;





//    @OneToMany(
//            mappedBy = "product"
//    )
//    @JsonIgnore
//    private Collection<GroupOrderDetails> groupOrderDetails;



}
