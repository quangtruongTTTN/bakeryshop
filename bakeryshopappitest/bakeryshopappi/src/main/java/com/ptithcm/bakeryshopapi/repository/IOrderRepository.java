package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.model.AmountYear;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, String> {
    long countByShipperId_IdAndStatusIsLessThanEqual(long id, int status);

    Order findOrderByUserId_IdAndStatusLike(long id, int status, Sort sort);

    Order findOrderById(String id);

    Page<Order> findAllByUserIdEqualsAndStatusIn(Optional<User> user, List<Integer> status, Pageable pageable);

    Page<Order> findAllByStatusIn(List<Integer> status, Pageable pageable);

    Page<Order> findAllByStatusInAndShipperId_Id(List<Integer> status, long shipperId, Pageable pageable);

//    Optional<Order> findByUserIdAndStatusAndTeam(User userId, int status, boolean team);

    @Query(value = "SELECT month(created_at) AS month, sum(total_price) revenue FROM \"order\" where year(created_at) = ?1  and status = 3 group by month(created_at) order by month(created_at)", nativeQuery = true)
    List<Object> countRevenueByYear(int year);

    //    @Query(value = "SELECT month(created_at) AS month, sum(total_price) revenue FROM \"order\" where created_at BETWEEN ?1 AND ?2 and status = 3 group by month(created_at) order by month(created_at)", nativeQuery = true)
//    List<Object> countRevenueByCreateAt(String value1, String value2);
//    @Query(value = "SELECT CONCAT(month(created_at), '/' , year(created_at)) AS month, sum(total_price) revenue FROM \"order\" where created_at BETWEEN ?1 AND ?2 and status = 3 group by month(created_at), year(created_at) order by year(created_at), month(created_at)", nativeQuery = true)
    @Query(value = "EXEC BAO_CAO_DANH_THU_THEO_KHOANG @fromDate= ?1 , @toDate= ?2 ", nativeQuery = true)
    List<Object> countRevenueByCreateAt(String value1, String value2);

//    @Query(value = "select x.month as month , ISNULL(x.revenue,0) as revenue , ISNULL(y.import,0) as import , (ISNULL(x.revenue,0) - ISNULL(y.import,0)) as profit from (SELECT CONCAT(month(created_at), '/' , year(created_at)) AS month, sum(total_price) as revenue FROM \"order\" where created_at BETWEEN '02-02-2021' AND '12-11-2022' and status = 3 group by month(created_at), year(created_at) ) as x full outer JOIN (SELECT CONCAT(month(created_at), '/' , year(created_at)) AS month, sum(d.price*d.quantity) as import FROM product_import i inner join product_import_detail d on i.id=d.product_import_id where i.created_at BETWEEN ?1 AND ?2 group by month(created_at), year(created_at) ) as y on x.month = y.month ORDER BY y.month", nativeQuery = true)
//    List<Object> countProfitByMonth(String value1, String value2);

//    @Query(value = "select CAST(CASE WHEN x.month is null THEN y.month WHEN y.month is null THEN z.month ELSE z.month END AS varchar) as month, ISNULL(x.revenue,0) as revenue , ISNULL(y.import,0) as import, ISNULL(z.productReturn,0) as productReturn , (ISNULL(x.revenue,0) - ISNULL(y.import,0)- ISNULL(z.productReturn,0)) as profit from (SELECT CONCAT(month(created_at), '/' , year(created_at)) AS month, sum(total_price) as revenue FROM \"order\" where created_at BETWEEN ?1 AND ?2 and status = 3 group by month(created_at), year(created_at) ) as x full outer JOIN (SELECT CONCAT(month(created_at), '/' , year(created_at)) AS month, sum(d.price*d.quantity) as import FROM product_import i inner join product_import_detail d on i.id=d.product_import_id where i.created_at BETWEEN ?1 AND ?2 group by month(created_at), year(created_at) ) as y on x.month = y.month full outer JOIN (SELECT CONCAT(month(r.created_at), '/' , year(r.created_at)) AS month, sum(od.price_current*rd.quantity) as productReturn FROM product_return r inner join product_return_detail rd on r.id=rd.product_return_id inner join product_detail d on d.id=rd.product_detail_id inner join invoices i on i.id=r.invoice_id inner join \"order\" o on o.id=i.order_id inner join orderdetail od on od.order_id=o.id where r.created_at BETWEEN ?1 AND ?2 group by month(r.created_at), year(r.created_at) ) as z on x.month = z.month or z.month = y.month ORDER BY month", nativeQuery = true)
//    List<Object> countProfitByMonth(String value1, String value2);
//    @Query(nativeQuery = true, value = "call BAO_CAO_LOI_NHUAN_THEO_KHOANG(:fromDate,:toDate);")
//    @Procedure(name = "BAO_CAO_LOI_NHUAN_THEO_KHOANG")
//    @Query(value = "CALL `bakerytest51`.BAO_CAO_LOI_NHUAN_THEO_KHOANG(:fromDate,:toDate);", nativeQuery = true)
    @Query(value = "EXEC BAO_CAO_LOI_NHUAN_THEO_KHOANG @fromDate= ?1 , @toDate= ?2 ", nativeQuery = true)
    List<Object> countProfitByMonth(String value1, String value2);

    @Query(value = "EXEC BAO_CAO_LOI_NHUAN_THEO_NAM @fromDate= ?1 , @toDate= ?2 ", nativeQuery = true)
    List<Object> countProfitByYear(String value1, String value2);
    @Query(value = "EXEC BAO_CAO_LOI_NHUAN_THEO_QUY @fromDate= ?1 , @toDate= ?2 ", nativeQuery = true)
    List<Object> countProfitByQuarter(String value1, String value2);
    @Query(value = "EXEC BAO_CAO_LOI_NHUAN_THEO_NGAY @fromDate= ?1 , @toDate= ?2 ", nativeQuery = true)
    List<Object> countProfitByDay(String value1, String value2);
//    List<Object> countProfitByMonth(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
//    List<Object> countProfitByMonth(String value1, String value2);
    //    @Query(value = "SELECT DISTINCT year(created_at) as year FROM hhtlmilktea.order order by year(created_at) DESC", nativeQuery = true)
    @Query(value = "SELECT DISTINCT YEAR(created_at) as YEAR FROM \"order\" order by year(created_at) DESC", nativeQuery = true)
    List<Integer> getAllYears();



    @Query(value = "SELECT SUM(total_price) FROM \"order\" WHERE year(created_at) = ?1 AND status = 3", nativeQuery = true)
    Long sumRevenue(int year);

    //    @Query(value = "SELECT new com.ptithcm.bakeryshopapi.model.AmountYear(YEAR(o.createdAt), COUNT(o.id), SUM (o.totalPrice)) FROM Order o WHERE o.status = 3 GROUP BY YEAR(o.createdAt) ORDER BY SUM (o.totalPrice) DESC") //, nativeQuery = true
//    List<AmountYear> reportAmountYear();
    @Query(value = "SELECT YEAR(o.created_at) as year, COUNT(o.id) as count, SUM (o.total_price) as total FROM \"order\" o WHERE o.status = 3 GROUP BY YEAR(o.created_at) ORDER BY SUM (o.total_price) DESC", nativeQuery = true)
    //
    List<Object> reportAmountYear();

    @Query(value = "SELECT a.id as id, (p.name +' - '+ s.name) as name , SUM(d.price_current * d.quantity) as amount, SUM(d.quantity) as quantity, COUNT(o.id) as count FROM product_detail a INNER JOIN Product p on a.product_id = p.id INNER JOIN OrderDetail d on a.id = d.product_detail_id INNER JOIN \"Order\" o on o.id = d.order_id INNER JOIN sizeoption s on s.id = a.size_id where o.status = 3 group by a.id, p.name , s.name ORDER BY sum(d.price_current * d.quantity) DESC", nativeQuery = true)
    List<Object> reportByProduct();

    @Query(value = "select distinct o.status, COUNT(o.status) FROM \"order\" o GROUP BY o.status", nativeQuery = true)
        //
    List<Object> countOrderByName();

    @Query(value = "SELECT sum(total_price) FROM \"order\" where CONVERT(DATE, created_at) = CONVERT(DATE, GETDATE()) AND status = 3", nativeQuery = true)
    Integer revenueToday();

    //    @Query(value = "select * from \"order\" order by id desc limit 5", nativeQuery = true)
//    @Query(value = "select top 5 * from \"order\" o where status = order by id desc", nativeQuery = true)
    @Query(value = "select top 5 * from \"order\" o where o.status <> 0 order by created_at desc", nativeQuery = true)
    List<Order> lastFiveOrders();

    long countOrderByStatusIn(List<Integer> status);

    Order findByIdEquals(String id);

    int countOrderByShipperId_IdAndStatus(long shipperId, int status);

}
