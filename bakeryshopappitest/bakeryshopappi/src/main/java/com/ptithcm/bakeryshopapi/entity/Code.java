package com.ptithcm.bakeryshopapi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="code")
public class Code implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    private String name;
    private long mark;
//    private String username;
    private long userId;
    private Date endDate; // Cộng 30 ngày lúc quay vào voucher

    @CreationTimestamp
    private Date createdAt;

    private Date deletedAt;

    @Column(columnDefinition = "nvarchar(255)")
    private String codeName;
//    private String userNameUse;
//    private long userIdUse;

//    @CreationTimestamp
//    private Date usedAt;

    public Code(long id, String codeName) {
        this.id = id;
        this.codeName = codeName;
    }

    public Code(long id, String codeName, long mark, long userId, Date endDate) {
        this.id = id;
        this.codeName = codeName;
        this.mark = mark;
        this.userId = userId;
        this.endDate = endDate;
    }
}
