package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {

    private long userId;
//    private String productId;
    private long productDetailId;
    private long orderDetailId;
    private Date time;
    private String content;
    private int rate;
//    private String oldPassword;

}
