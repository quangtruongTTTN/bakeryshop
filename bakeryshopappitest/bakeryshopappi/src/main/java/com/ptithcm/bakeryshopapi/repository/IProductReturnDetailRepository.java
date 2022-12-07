package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import com.ptithcm.bakeryshopapi.entity.ProductImportDetail;
import com.ptithcm.bakeryshopapi.entity.ProductReturn;
import com.ptithcm.bakeryshopapi.entity.ProductReturnDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductReturnDetailRepository extends JpaRepository<ProductReturnDetail, Long> {
    @Query("SELECT sum(e.quantity) from ProductReturnDetail e where e.productDetail=?1 and e.productReturn=?2")
    long sumDoneQuantity(ProductDetail productDetail, ProductReturn productReturn);

}
