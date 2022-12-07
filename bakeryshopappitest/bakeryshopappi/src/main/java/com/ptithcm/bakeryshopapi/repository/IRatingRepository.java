package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRatingRepository extends JpaRepository<Rating, Long> {
//    Page<Rating> findRatingByUsernameLike(String keyword, Pageable pageable);
    Page<Rating> findRatingByUserIdLike(long keyword, Pageable pageable);


}
