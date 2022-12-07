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
public class AmountYear {
    private Integer year;
    private Integer count;
    private BigInteger total;
}
