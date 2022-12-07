package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.ProductImport;
import com.ptithcm.bakeryshopapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductImportRepository extends JpaRepository<ProductImport, String> {
//    ProductImport findProductImportByUserId_IdAndStatusLike(long id, int status, Sort sort);
    ProductImport findProductImportById(String id);
    Page<ProductImport> findAllByEmployeeId(Optional<User> user,  Pageable pageable);
//    Page<ProductImport> findAllByStatusIn(List<Integer> status, Pageable pageable);
//
//    Optional<ProductImport> findByUserIdAndStatusAndTeam(User userId, int status, boolean team);
//
//
//    List<ProductImport> lastFiveProductImports();
    List<ProductImport> findAllByIdContaining(String id);
//
//    ProductImport findByIdEquals(String id);
}
