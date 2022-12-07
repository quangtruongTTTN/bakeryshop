package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId_Id(String id);
    OrderDetail findOrderDetailById(long id);

//    OrderDetail findByOrderId_IdAndProduct_IdAndAddOptionIdLikeAndSizeOptionIdLike(String id, String pId, String add, String size);
//    OrderDetail findByOrderId_IdAndProduct_IdAndAndSizeOptionIdLike(String id, String pId,  String size);
    OrderDetail findByOrderId_IdAndProductDetail_Id(String id, long pdId);
}
