package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Invoice;
import com.ptithcm.bakeryshopapi.entity.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IInvoiceRepository extends JpaRepository<Invoice, String> {
    Invoice findByOrderId(String orderId);
    List<Invoice> findByOrder_UserId_Id(long userId);
//    List<Invoice> findByOrder_UserIdAndCreatedAtBefore(long userId, );
}
