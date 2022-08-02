package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.SizeOption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISizeOptionRepository extends JpaRepository<SizeOption, Long> {
    Page<SizeOption> findSizeOptionsByNameLike(String keyword, Pageable pageable);
}
