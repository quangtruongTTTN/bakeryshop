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
public class ProfitReportResponse {
    private String month;
    private Integer totalImport;
    private BigInteger totalReturn;
    private BigInteger revenue;
    private BigInteger profit;

//    private Double revenue;
}
