package com.ptithcm.bakeryshopapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ptithcm.bakeryshopapi.entity.OrderDetail;
import com.ptithcm.bakeryshopapi.entity.User;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

public class OrderDto {
    private String id; // Sử dụng O + getTime()
    private String address;
    private String phone;

    private int payment; // 0: chưa có gì, 1: tiền mặt, 2: trực tuyến, 3: lỗi(nếu có)

    private int status; // 0: chưa có gì hết, 1: chưa làm, 2: vận chuyển, 3: hoàn thành, 4: lỗi(nếu có)

    private String noteOrder;


    private long totalPrice;


    private int shipping;

    private long memberVip;

    private boolean team;

    private boolean rating;
    private int notification;
    private Date createdAt;

    private Date updatedAt;
    private Date deletedAt;
    private User userId;

    private User shipperId;
    private User employeeId;
    private Collection<OrderDetail> orderDetails;

}
