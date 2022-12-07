package com.ptithcm.bakeryshopapi.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private long id;

//    @Column(length = 10000)
    @Column(columnDefinition = "nvarchar(MAX)")
    private String content;

    @ColumnDefault("0")
    private int rate;

//    @NonNull
//    private String username;
    @NonNull
    private long userId;

    @NonNull
    private String orderId;

    public Rating(String content, int rate, @NonNull long userId, @NonNull String orderId) {
        this.content = content;
        this.rate = rate;
        this.userId = userId;
        this.orderId = orderId;
    }
}
