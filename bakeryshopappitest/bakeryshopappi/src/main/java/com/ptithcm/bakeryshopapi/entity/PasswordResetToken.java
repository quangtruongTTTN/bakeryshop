package com.ptithcm.bakeryshopapi.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class PasswordResetToken implements Serializable {

    private static final int EXPIRATION = 60 ;
//    private static final int EXPIRATION = 60 * 24;
private static final long PASSWORD_EXPIRATION_TIME
        = 60L * 1000L;
//        = 60L * 60L * 1000L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

//    @Column(name = "password_changed_time")
    @CreationTimestamp
    private Date expiryDate;

    public boolean isPasswordExpired() {
        if (this.expiryDate == null) return false;

        long currentTime = System.currentTimeMillis();
        long lastChangedTime = this.expiryDate.getTime();

        return currentTime > lastChangedTime + PASSWORD_EXPIRATION_TIME;
    }


    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public PasswordResetToken() {

    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }


}