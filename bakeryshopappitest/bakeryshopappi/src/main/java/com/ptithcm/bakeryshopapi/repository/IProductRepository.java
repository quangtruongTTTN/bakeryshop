package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.Promotion;
import com.ptithcm.bakeryshopapi.payload.request.ProductTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, String> {
    Page<Product> findProductsByNameLike(String keyword, Pageable pageable);
List<Product> findProductsByNameLike(String keyword);
    List<Product> findTop12ByCategoryId_Id(long id);

    //    @Query(value = "SELECT p.id,p.name,,p.title, p.price FROM Product p LEFT JOIN OrderDetail O ON p.code=O.product", nativeQuery = true)
//    @Query(value = "SELECT * FROM Product p LEFT JOIN OrderDetail O ON p.id=O.product_id", nativeQuery = true)
//    List<Product> getHotProduct(String cate, String cate2);
//    @Query(value = "SELECT TOP(4) O.product_id FROM OrderDetail O GROUP BY O.product_id ORDER BY SUM(o.quantity) DESC", nativeQuery = true)
    @Query(value = "SELECT TOP(8) p.product_id FROM product_detail p inner join OrderDetail O   on p.id=o.product_detail_id GROUP BY p.product_id ORDER BY SUM(o.quantity) DESC", nativeQuery = true)
    List<String> getHotProduct(String cate, String cate2);
//    @Query("SELECT u FROM Product u WHERE u.id = ?1")

    @Query(value = "SELECT TOP(8) W.product_id FROM wishlist W GROUP BY W.product_id ORDER BY COUNT(W.product_id) DESC", nativeQuery = true)
    List<String> getFavoriteProduct(String cate, String cate2);

    Product findProductById(String id);
    Product findProductByProductDetails_Id(long id);

    List<Product> findProductsByCategoryId_Name(String name);

    Page<Product> findProductsByCategoryId_Name(String name, Pageable pageable);
    List<Product> findProductsByCategoryId_NameAndNameContaining(String name,String keyword);
    Page<Product> findProductsByCategoryId_NameAndNameContaining(String name,Pageable pageable,String keyword);

//    Page<Product> findProductsByCategoryId_NameAndSaleOff(Timestamp timeNow,String name, Pageable pageable);

    //    List<Product> findProductsByCategoryId_NameNotLikeAndCategoryId_NameNotLike(String cate, String cate2, Sort sort);
    List<Product> findProductsByCategoryId_NameNotLike(String cate);
    List<Product> findProductsByCategoryId_NameNotLikeAndNameContaining(String cate, String keyword);
    Page<Product> findProductsByCategoryId_NameNotLikeAndNameContaining(String cate,Pageable pageable,String keyword);

    Page<Product> findProductsByCategoryId_NameNotLike(String cate, Pageable pageable);

//    @Query(value = "SELECT P.id as id, P.created_at as created_at , P.deleted_at as deleted_at, P.link_image as link_image, P.name as name FROM product P inner join promotion_details D on P.id = D.product_id", nativeQuery = true)
//    @Query(value = "SELECT P.id as id , P.created_at, P.deleted_at, P.link_image, P.name, P.name_image, P.price ,P.title ,P.updated_at ,P.category_id  FROM product P inner join promotion_details D on P.id = D.product_id", nativeQuery = true)
//    Page<ProductTest> findProductsByPromotion(long promotion_id, Pageable pageable);
//    Page<ProductTest> findProductsByPromotion(long promotion_id, Pageable pageable);
//    Page<Product> findProductsByPromotionDetails_Promotion_Id(long id, Pageable pageable);
//    Page<Product> findDistinctByPromotionDetails_Promotion_Id(long id, Pageable pageable);
//    Page<Product> findDistinctByPromotionDetails_Promotion_Id(long id, Pageable pageable);
List<Product> findDistinctByPromotionDetails_Promotion_Id(long id);

//    Page<Product> findProductBySaleOffDiscountLike(Double discount, Pageable pageable);
//    Page<Product> findProductByPromotionDetailsDiscountLike(int discount, Pageable pageable);

    List<Product> findProductByPromotionDetailsDiscountLike(int discount);

//    Page<Product> findProductBySaleOff_EndDateGreaterThan(Timestamp timeNow, Pageable pageable); where [D].[promotion_id] = ?1
//    Page<Product> findDistinctProductBySaleOff_EndDateGreaterThan(Timestamp timeNow, Pageable pageable);
    Page<Product> findDistinctProductByProductDetails_Id(Timestamp timeNow, Pageable pageable);

//    Page<Product> findProductBySaleOffNull(Pageable pageable);

//    Page<Product> findProductBySaleOffNotNull(Pageable pageable);
    Page<Product> findProductByPromotionDetailsNotNull(Pageable pageable);
    long count();
}
