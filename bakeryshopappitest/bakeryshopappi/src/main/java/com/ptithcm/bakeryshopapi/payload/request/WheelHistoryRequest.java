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
public class WheelHistoryRequest {

    private long id;
    private String fullName;
//    private String username;
    private long userId;
    private String reward;
    private int mark;
    private String type;

}
