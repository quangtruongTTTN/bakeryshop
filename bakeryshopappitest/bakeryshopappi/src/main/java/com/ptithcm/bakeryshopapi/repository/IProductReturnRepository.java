package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.ProductImport;
import com.ptithcm.bakeryshopapi.entity.ProductReturn;
import com.ptithcm.bakeryshopapi.entity.ProductReturn;
import com.ptithcm.bakeryshopapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductReturnRepository extends JpaRepository<ProductReturn, String> {
//    ProductReturn findProductReturnByUserId_IdAndStatusLike(long id, int status, Sort sort);
//    ProductReturn findProductReturnById(String id);
    Page<ProductReturn> findAllByEmployeeId(Optional<User> user,  Pageable pageable);

    List<ProductReturn> findAllByIdContaining(String id);
//    Optional<ProductReturn> findByUserIdAndStatusAndTeam(User userId, int status, boolean team);


//    List<ProductReturn> lastFiveProductReturns();

//    ProductReturn findByIdEquals(String id);
}
