package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.WheelHistoryRequest;
import com.ptithcm.bakeryshopapi.payload.response.WheelHistoryResponse;
import com.ptithcm.bakeryshopapi.payload.response.WishlistResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wheel")
public class WheelHistoryController {

    @Autowired
    private IWheelHistoryRepository wheelHistoryRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private ICodeRepository codeRepository;

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> list() {

        List<WheelHistory> wheelHistories = wheelHistoryRepository.findAll();
        Collections.sort(wheelHistories, (a, b) -> (int) (b.getId() - a.getId()));

        WheelHistoryResponse wheelHistoryResponse = new WheelHistoryResponse();
        wheelHistoryResponse.setWheelHistories(wheelHistories);

        return ResponseEntity.ok(wheelHistoryResponse);
    }

    @PostMapping("/wheel-save")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> insert(@RequestBody WheelHistoryRequest historyRequest) {

        WheelHistory wheelHistory = new WheelHistory();
        wheelHistory.setFullName(historyRequest.getFullName());
        wheelHistory.setReward(historyRequest.getReward());
        wheelHistory.setCreatedAt(new Date());
        wheelHistoryRepository.save(wheelHistory);

        User user = userRepository.findById(historyRequest.getUserId()).get();
        MemberVip memberVip = memberVipRepository.findByUser(user).get();
        if(!historyRequest.getReward().equals("Nhận được mã Voucher")) {
            memberVip.setMark(memberVip.getMark() - 1000);
            memberVip.setMark(memberVip.getMark() + historyRequest.getMark());
        } else {
            memberVip.setMark(memberVip.getMark() - 1000);
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DAY_OF_YEAR, 30);

            Code code = new Code();
            code.setEndDate(calendar.getTime());
            code.setMark(historyRequest.getMark());
            code.setCodeName("V" + new Date().getTime());
            code.setUserId(historyRequest.getUserId());

            codeRepository.save(code);
        }
        memberVipRepository.save(memberVip);

        List<WheelHistory> wheelHistories = wheelHistoryRepository.findAll();
        Collections.sort(wheelHistories, (a, b) -> (int) (b.getId() - a.getId()));

        WheelHistoryResponse wheelHistoryResponse = new WheelHistoryResponse();
        wheelHistoryResponse.setUser(userRepository.findById(historyRequest.getUserId()).get());
        wheelHistoryResponse.setWheelHistories(wheelHistories);


        WishlistResponse wishlistResponse = new WishlistResponse();
        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(historyRequest.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());
        wheelHistoryResponse.setWishlistResponse(wishlistResponse);

        return ResponseEntity.ok(wheelHistoryResponse);
    }

}