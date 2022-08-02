package com.ptithcm.bakeryshopapi.payload.response;

import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.entity.WheelHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WheelHistoryResponse {

    private List<WheelHistory> wheelHistories;
    private User user;
    private WishlistResponse wishlistResponse;

}
