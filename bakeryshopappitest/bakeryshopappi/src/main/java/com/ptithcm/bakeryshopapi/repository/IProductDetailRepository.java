package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    List<ProductDetail> findByProductId_Id(String id);
    ProductDetail findProductDetailById(long id);
//    ProductDetail findByProductId_IdAndProduct_IdAndAddOptionIdLikeAndSizeOptionIdLike(String id, String pId, String add, String size);
    ProductDetail findByProductId_IdAndProduct_IdAndAndSizeOptionIdLike(String id, String pId,  String size);
}
