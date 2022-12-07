package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.WheelHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWheelHistoryRepository extends JpaRepository<WheelHistory, Long> {

}
