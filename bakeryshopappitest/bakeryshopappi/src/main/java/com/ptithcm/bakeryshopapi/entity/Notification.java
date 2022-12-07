package com.ptithcm.bakeryshopapi.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "content",columnDefinition = "nvarchar(255)")
    private String content;

    @Column(name = "\"read\"")
//    @ColumnDefault("0")
    private boolean read;
//    @ColumnDefault("1")

    @Column(name = "deliver")
    private boolean deliver;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "order_id",
            referencedColumnName = "id"
    )
    private Order order;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "product_id",
            referencedColumnName = "id"
    )
//    @JoinColumn(name = "product_id")
    private Product product;
@Column(name = "type")
    private Integer type;
}
