package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherRequest {

    private String codeName;
    private long id;
//    private String username;
    private long userId;

}
