package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.SaleOff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISaleOffRepository extends JpaRepository<SaleOff, Long> {
}
