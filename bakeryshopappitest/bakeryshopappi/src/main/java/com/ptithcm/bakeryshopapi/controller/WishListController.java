package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.*;
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
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getWishLists() {
        return ResponseEntity.ok(wishlistRepository.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
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
        products= products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                .collect(Collectors.toList());
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails().stream()
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed())
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }
        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        return  ResponseEntity.ok(wishlistResponse);
    }

    @PutMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
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
        products= products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                .collect(Collectors.toList());
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails().stream()
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed())
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }
        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());
        return  ResponseEntity.ok(wishlistResponse);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getWishlistByUsername(@PathVariable String username){

        WishlistResponse wishlistResponse = new WishlistResponse();

        User user = userRepository.findByUsername(username).get();

        // Get all wishlist
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(user.getId());
        List<Product> products = new ArrayList<>();

        for(Wishlist wl : wishlists) {
            products.add(productRepository.findById(wl.getProductId()).get());
        }

        products= products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                .collect(Collectors.toList());
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails().stream()
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed())
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }

        wishlistResponse.setProducts(products);
        wishlistResponse.setQuantity(products.size());

        return ResponseEntity.ok(wishlistResponse);
    }
}
