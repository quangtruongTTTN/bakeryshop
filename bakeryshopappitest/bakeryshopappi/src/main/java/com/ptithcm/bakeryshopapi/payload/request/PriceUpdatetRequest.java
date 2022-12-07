package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PriceUpdatetRequest {

    private long productDetailId;
    private long price;
    private long employeeId;

}
