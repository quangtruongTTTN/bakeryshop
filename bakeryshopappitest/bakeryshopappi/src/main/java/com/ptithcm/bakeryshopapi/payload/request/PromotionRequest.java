package com.ptithcm.bakeryshopapi.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ptithcm.bakeryshopapi.entity.PromotionDetail;
import com.ptithcm.bakeryshopapi.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequest {
    private String name;
    private Date startDate;
    private Date endDate;
    private long employeeId;


}
