package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.entity.Wishlist;
import com.ptithcm.bakeryshopapi.payload.request.WishlistRequest;
import com.ptithcm.bakeryshopapi.payload.response.WishlistResponse;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import com.ptithcm.bakeryshopapi.repository.IWishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private IWishlistRepository wishlistRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping("/list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getWishLists() {
        return ResponseEntity.ok(wishlistRepository.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewWishlist(@RequestBody WishlistRequest wishlistRequest){

        Wishlist checkWishlist = wishlistRepository.findByProductIdAndUserId(wishlistRequest.getProductId(), wishlistRequest.getUserId());

        if(checkWishlist != null){
            wishlistRepository.delete(checkWishlist);
        }else {
            Wishlist wishlist = new Wishlist(wishlistRequest.getUserId(), wishlistRequest.getProductId());
            wishlistRepository.save(wishlist);
        }

        WishlistResponse wishlistResponse = new WishlistResponse();
        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(wishlistRequest.getUserId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        return  ResponseEntity.ok(wishlistResponse);
    }

    @PutMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteWishlist(@RequestBody WishlistRequest wishlistRequest){

        Wishlist checkWishlist = wishlistRepository.findByProductIdAndUserId(wishlistRequest.getProductId(), wishlistRequest.getUserId());

        if(checkWishlist != null){
            wishlistRepository.delete(checkWishlist);
        }

        WishlistResponse wishlistResponse = new WishlistResponse();
        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(wishlistRequest.getUserId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());
        return  ResponseEntity.ok(wishlistResponse);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getWishlistByUsername(@PathVariable String username){

        WishlistResponse wishlistResponse = new WishlistResponse();

        User user = userRepository.findByUsername(username).get();

        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(user.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }


        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        return ResponseEntity.ok(wishlistResponse);
    }
}
