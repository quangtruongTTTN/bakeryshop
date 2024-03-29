package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Category;
import com.ptithcm.bakeryshopapi.entity.PriceHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPriceHistoryRepository extends JpaRepository<PriceHistory, Long> {

}
