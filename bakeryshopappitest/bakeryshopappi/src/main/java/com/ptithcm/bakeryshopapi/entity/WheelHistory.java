package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "wheelhistory")
public class WheelHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //    @Column(columnDefinition = "nvarchar(255)")
//    private String fullName;
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnoreProperties(value = {"memberVip","linkImage","createdAt","updatedAt","deletedAt","orders","birthday","address","phone","nameImage","email","roles"})
    @NonNull
    private User user;
    @Column(columnDefinition = "nvarchar(255)")
    private String reward;
    private Date createdAt;

}
