package com.ptithcm.bakeryshopapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberRequest extends OrderRequest {

    private String name;
    private String usernameOwner;
    private String orderId;
    private long groupOrderDetailId;
    private String action;

}
