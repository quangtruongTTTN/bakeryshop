package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {
//    Page<Comment> findCommentByNameLike(String keyword, Pageable pageable);

//    @Override
    List<Comment> findAll();

    Comment findCommentByOrderDetailId(long orderDetailId);

    boolean existsCommentByOrderDetailId(long orderDetailId);

//    long countAllByProductIdAndRate(String productId, int rate);
    long countAllByProductDetailIdAndRate(long productDetailId, int rate);

//    List<Comment> findCommentByProductId(String productId);
    List<Comment> findCommentByProductDetailId(long productDetailId);
}
