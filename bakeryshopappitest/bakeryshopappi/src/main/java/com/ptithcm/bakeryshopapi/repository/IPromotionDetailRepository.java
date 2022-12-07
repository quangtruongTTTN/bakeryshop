package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.PromotionDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPromotionDetailRepository extends JpaRepository<PromotionDetail, Long> {
    List<PromotionDetail> findByProduct_Id(String id);
    List<PromotionDetail> findByPromotion_Id(long id);
    boolean existsPromotionDetailByProduct_IdAndPromotion_Id(String productId, long promotionId);




//    PromotionDetail findByPromotionId_IdAndProduct_IdAndAddOptionIdLikeAndSizeOptionIdLike(String id, String pId, String add, String size);
//    PromotionDetail findByPromotionId_IdAndProduct_IdAndAndSizeOptionIdLike(String id, String pId,  String size);
}
