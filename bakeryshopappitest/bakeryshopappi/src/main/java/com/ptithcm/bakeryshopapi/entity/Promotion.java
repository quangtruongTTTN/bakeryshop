package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "promotions")
public class Promotion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

    @Column(columnDefinition = "nvarchar(255)")
    @NonNull
    private String name;


//    @CreationTimestamp
//    private Date createdAt;

//    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

//    @CreationTimestamp
//    private Date updatedAt;

    private Date deletedAt;

    @Column(columnDefinition = "nvarchar(255)")
    private String moTa;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "promotion",
            cascade = CascadeType.ALL
    )
//    @JsonIgnore
    private Collection<PromotionDetail> promotionDetails;

    @ManyToOne
    @JoinColumn(
            name = "employee_id",
            referencedColumnName = "id",
            nullable = true
    )
    @JsonIgnoreProperties("orders")
    private User employeeId;
}
