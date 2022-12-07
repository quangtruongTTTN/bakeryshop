package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="invoices")
public class Invoice {
    @Id
    @NonNull
    private String id;

    @CreationTimestamp
    private Date createdAt;

//    @NonNull
//    private String orderId;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
//    @JsonIgnore
    @JsonIgnoreProperties(value = {"invoice","shipperId"})
    private Order order;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            mappedBy = "invoice"
    )
    private Collection<ProductReturn> productReturn;


}
