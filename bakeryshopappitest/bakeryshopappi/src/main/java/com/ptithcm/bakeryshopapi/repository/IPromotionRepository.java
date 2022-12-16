package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPromotionRepository extends JpaRepository<Promotion, Long> {
    Page<Promotion> findPromotionByNameLike(String keyword, Pageable pageable);
    Promotion findPromotionsById(long id);

}
