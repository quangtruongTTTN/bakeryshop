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
public class PromotionUpdateRequest {
    private long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private long employeeId;


}
