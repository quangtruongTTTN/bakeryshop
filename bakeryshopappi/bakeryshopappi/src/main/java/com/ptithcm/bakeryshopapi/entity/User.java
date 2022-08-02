package com.ptithcm.bakeryshopapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "\"user\"",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    @Column(columnDefinition = "nvarchar(255)", nullable = true)
    private String fullName;

    @Temporal(TemporalType.DATE)
    private Date birthday; // 1995-10-29

    @Column(name = "address", columnDefinition = "nvarchar(255)", nullable = true)
    private String address;
    private String phone;
    @Column(name = "link_image")
    private String linkImage;
    @Column(name = "name_image")
    private String nameImage;
    private String email;

    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @CreationTimestamp
    @Column(name = "deleted_at")
    private Date updatedAt;

    @Column(name = "updated_at")
    private Date deletedAt;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "userId",
            cascade = CascadeType.ALL
    )
    @JsonIgnoreProperties("userId")
    private Collection<Order> orders;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "user"
    )
    private MemberVip memberVip;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(long id, String username, String fullName, Date birthday, String address,
                String phone, String linkImage, String nameImage, String email, String password, Date createdAt,
                Date updatedAt) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public User(String username, String fullName, Date birthday, String address,
                String phone, String linkImage, String nameImage, String email, String password, Set<Role> roles) {
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.linkImage = linkImage;
        this.nameImage = nameImage;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
