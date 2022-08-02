package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findAllByUserId(long userId);

    Wishlist findByProductIdAndUserId(String productId, long userId);
}
