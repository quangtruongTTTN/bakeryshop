package com.ptithcm.bakeryshopapi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RevenueReportResponse {
    private String month;
    private BigInteger revenue;
//    private Double revenue;
}
