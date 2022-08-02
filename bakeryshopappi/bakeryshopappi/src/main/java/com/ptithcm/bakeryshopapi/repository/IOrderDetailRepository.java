package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId_Id(String id);

    OrderDetail findByOrderId_IdAndProduct_IdAndSizeOptionIdLike(String id, String pId, String size);
}
