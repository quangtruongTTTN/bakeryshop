package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.ProductImport;
import com.ptithcm.bakeryshopapi.entity.ProductImportDetail;
import com.ptithcm.bakeryshopapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProductImportDetailRepository extends JpaRepository<ProductImportDetail, Long> {

}
