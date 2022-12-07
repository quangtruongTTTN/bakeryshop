package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Image;
import com.ptithcm.bakeryshopapi.entity.SaleOff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByProduct_Id(String id);

    boolean existsById(long id);
    void deleteById(long id);
    void deleteAllByProduct_Id(String id);
}
