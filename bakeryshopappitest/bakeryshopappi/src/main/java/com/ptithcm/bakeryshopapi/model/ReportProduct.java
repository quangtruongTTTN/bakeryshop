package com.ptithcm.bakeryshopapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportProduct {
    private BigInteger id;
    private String name;
    private BigInteger amount;
    private Integer quantity;
    private Integer count;
}
