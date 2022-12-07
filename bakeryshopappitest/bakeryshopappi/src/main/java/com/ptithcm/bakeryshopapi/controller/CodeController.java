package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.VoucherRequest;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.payload.response.VoucherResponse;
import com.ptithcm.bakeryshopapi.payload.response.WishlistResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/code")
public class CodeController {

    @Autowired
    private ICodeRepository codeRepository;

//    @Autowired
//    private ICodeRepository codeRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list/{userId}")
//TODO    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> getCodes(@PathVariable String username) {
    public ResponseEntity<?> getCodes(@PathVariable long userId) {

        // Get codes reverse
        List<Code> codes = codeRepository.findAllByEndDateGreaterThanEqualAndDeletedAtNullAndUserId(new Date(), userId);
        Collections.sort(codes, (a, b) -> (int) -(a.getId() - b.getId()));
        return ResponseEntity.ok(codes);
    }

    @PutMapping("/check-code")
//TODO    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkCode(@RequestBody VoucherRequest voucherRequest) {

        if(!codeRepository.existsByCodeName(voucherRequest.getCodeName())) {
            return ResponseEntity.ok(new MessageResponse("Mã không hợp lệ"));
        }

        if(codeRepository.existsByCodeNameAndEndDateLessThanEqual(voucherRequest.getCodeName(), new Date())) {
            return ResponseEntity.ok(new MessageResponse("Mã đã hết hạn không hợp lệ"));
        }

        if(codeRepository.existsByCodeNameAndDeletedAtNotNull(voucherRequest.getCodeName())) {
            return ResponseEntity.ok(new MessageResponse("Mã đã được sử dụng"));
        }

        // Insert code for Table Code
//        Code voucher = new Code();
//        voucher.setCodeName(voucherRequest.getCodeName());
//        voucher.setUserNameUse(voucherRequest.getUsername());
//        codeRepository.save(voucher);

        // Get code to update deletedAt not null
        Code code = codeRepository.findByCodeName(voucherRequest.getCodeName()).get();
        code.setDeletedAt(new Date());
//        code.setUsedAt(new Date());
//        code.setCodeName(voucherRequest.getCodeName());
//        code.setUserIdUse(voucherRequest.getUserId());
        codeRepository.save(code);

        User user = userRepository.findById(voucherRequest.getUserId()).get();

        MemberVip memberVip = user.getMemberVip();
        if (memberVip == null) {
            memberVip = new MemberVip(0, user);
        }

//        MemberVip memberVip = memberVipRepository.findByUser(user).get();
        memberVip.setMark(memberVip.getMark() + code.getMark());
        memberVipRepository.save(memberVip);

        // List codes news after update deletedAt
        List<Code> codes = codeRepository.findAllByEndDateGreaterThanEqualAndDeletedAtNullAndUserId(new Date(), voucherRequest.getUserId());
        User userNew = userRepository.findById(voucherRequest.getUserId()).get();
        userNew.setMemberVip(memberVip);


        // Get all wishlist of user by id
        WishlistResponse wishlistResponse = new WishlistResponse();
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(voucherRequest.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        // Set codes + user for VoucherResponse
        VoucherResponse voucherResponse = new VoucherResponse();
        voucherResponse.setCodes(codes);
        voucherResponse.setUser(userNew);
        voucherResponse.setWishlistResponse(wishlistResponse);
        voucherResponse.setMessage("Mã được sử dụng thành công");

        return ResponseEntity.ok(voucherResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCodes() {
        return ResponseEntity.ok(codeRepository.findAll());
    }
}
