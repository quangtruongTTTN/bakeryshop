package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.model.AmountYear;
import com.ptithcm.bakeryshopapi.model.CountOrder;
import com.ptithcm.bakeryshopapi.model.ReportProduct;
import com.ptithcm.bakeryshopapi.payload.response.ProfitReportResponse;
import com.ptithcm.bakeryshopapi.payload.response.RevenueReportResponse;
import com.ptithcm.bakeryshopapi.payload.response.RevenueResponse;
import com.ptithcm.bakeryshopapi.repository.IOrderRepository;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.ptithcm.bakeryshopapi.utility.Utils.toPage;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countRevenue(@RequestParam(defaultValue = "2022") int year){
        List<Object> list = orderRepository.countRevenueByYear(year);
        List<RevenueResponse> revenueResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RevenueResponse revenueResponse = new RevenueResponse();
            revenueResponse.setMonth((Integer) ((Object[])list.get(i))[0]);
            revenueResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
//            revenueResponse.setRevenue((Double) ((Object[])list.get(i))[1]);
            revenueResponses.add(revenueResponse);
        }
        return ResponseEntity.ok(revenueResponses);
    }

    @GetMapping("/report")
//TODO    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countRevenueReport(
            @RequestParam(defaultValue = "02-02-2022") String value1,
            @RequestParam(defaultValue = "12-11-2022") String value2){
        List<Object> list = orderRepository.countRevenueByCreateAt(value1,value2);
        List<RevenueReportResponse> revenueResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RevenueReportResponse revenueReportResponse = new RevenueReportResponse();
            revenueReportResponse.setMonth((String) ((Object[])list.get(i))[0]);
            revenueReportResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
//            revenueResponse.setRevenue((Double) ((Object[])list.get(i))[1]);
            revenueResponses.add(revenueReportResponse);
        }
        return ResponseEntity.ok(revenueResponses);
    }


    @GetMapping("/years")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getAllYears(){
        List<Integer> list = orderRepository.getAllYears();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/sumRevenue")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> sumRevenue(@RequestParam(defaultValue = "2022")int year){
        Long sum = orderRepository.sumRevenue(year);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/today")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getRevenueToday(){
        Integer sum = orderRepository.revenueToday();
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/lastFiveOrders")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getLastFiveOrders(){
        List<Order> list = orderRepository.lastFiveOrders();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/account/count")
    public ResponseEntity<?> countAccount(){
        return new ResponseEntity<>(userRepository.countUserByRoles_Id(2), HttpStatus.OK);
    }
    @GetMapping("/product/count")
    public ResponseEntity<?> countProduct(){
        return new ResponseEntity<>(productRepository.count(), HttpStatus.OK);
    }
    @GetMapping("/order/count-order")
    public ResponseEntity<?> countOrder(){
        return new ResponseEntity<>(orderRepository.countOrderByStatusIn(Arrays.asList(2,3, 4, 5)), HttpStatus.OK);
    }
    @GetMapping("/order/amount-year")
    public ResponseEntity<?> reportAmountYear(){
        List<Object> list = orderRepository.reportAmountYear();

        List<AmountYear> amountYears = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            AmountYear amountYear = new AmountYear();
            amountYear.setYear((Integer) ((Object[])list.get(i))[0]);
            amountYear.setCount((Integer) ((Object[])list.get(i))[1]);
            amountYear.setTotal((BigInteger) ((Object[])list.get(i))[2]);
            amountYears.add(amountYear);
        }
//        return ResponseEntity.ok(revenueResponses);
        return new ResponseEntity<>(amountYears, HttpStatus.OK);
    }
    @GetMapping("/order/count-order-by-name")
    public ResponseEntity<?> countOrderByName(){
        List<Object> list = orderRepository.countOrderByName();
        List<CountOrder> countOrders = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            CountOrder countOrder = new CountOrder();
            if((Integer) ((Object[])list.get(i))[0] == 1){
                countOrder.setName("Đang xử lý");
                countOrder.setCount((Integer) ((Object[])list.get(i))[1]);
            }else if((Integer) ((Object[])list.get(i))[0] == 2){
                countOrder.setName("Đã giao hàng");
                countOrder.setCount((Integer) ((Object[])list.get(i))[1]);
            }else if((Integer) ((Object[])list.get(i))[0] == 3){
                countOrder.setName("Đã giao");
                countOrder.setCount((Integer) ((Object[])list.get(i))[1]);
            }else if((Integer) ((Object[])list.get(i))[0] == 4){
                countOrder.setName("Đã hủy");
                countOrder.setCount((Integer) ((Object[])list.get(i))[1]);
            }else if((Integer) ((Object[])list.get(i))[0] == 5){
                countOrder.setName("Chờ lấy hàng");
                countOrder.setCount((Integer) ((Object[])list.get(i))[1]);
            }else {
                continue;
            }
            countOrders.add(countOrder);
        }
        return new ResponseEntity<>(countOrders, HttpStatus.OK);

    }

    @GetMapping("/order/page-report-product")
    public ResponseEntity<?> reportByProduct(@RequestParam("page") Optional<Integer> page,
                                             @RequestParam("size") Optional<Integer> size){
        Pageable pageable = PageRequest.of(page.orElse(1) - 1, size.orElse(8));
        List<Object> list = orderRepository.reportByProduct();

        List<ReportProduct> reportProducts = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            ReportProduct reportProduct = new ReportProduct();
            reportProduct.setId((BigInteger) ((Object[])list.get(i))[0]);
            reportProduct.setName((String) ((Object[])list.get(i))[1]);
            reportProduct.setAmount((BigInteger) ((Object[])list.get(i))[2]);
            reportProduct.setQuantity((Integer) ((Object[])list.get(i))[3]);
            reportProduct.setCount((Integer) ((Object[])list.get(i))[4]);
            reportProducts.add(reportProduct);
        }
        return new ResponseEntity<>(toPage(reportProducts,pageable), HttpStatus.OK);
    }

    @GetMapping("/profitByMonth")
//TODO    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countProfitReportByMonth(
            @RequestParam(defaultValue = "02-02-2022") String value1,
            @RequestParam(defaultValue = "12-11-2022") String value2){
        List<Object> list = orderRepository.countProfitByMonth(value1,value2);
        List<ProfitReportResponse> profitReportResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            ProfitReportResponse profitReportResponse = new ProfitReportResponse();
            profitReportResponse.setMonth((String) ((Object[])list.get(i))[0]);
            profitReportResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
            profitReportResponse.setTotalImport((Integer) ((Object[])list.get(i))[2]);
            profitReportResponse.setTotalReturn((BigInteger) ((Object[])list.get(i))[3]);
            profitReportResponse.setProfit((BigInteger) ((Object[])list.get(i))[4]);
            profitReportResponses.add(profitReportResponse);
        }
        return ResponseEntity.ok(profitReportResponses);
    }

    @GetMapping("/profitByYear")
//TODO    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countProfitReportByYear(
            @RequestParam(defaultValue = "02-02-2022") String value1,
            @RequestParam(defaultValue = "12-11-2022") String value2){
        List<Object> list = orderRepository.countProfitByYear(value1,value2);
        List<ProfitReportResponse> profitReportResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            ProfitReportResponse profitReportResponse = new ProfitReportResponse();
            profitReportResponse.setMonth((String) ((Object[])list.get(i))[0]);
            profitReportResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
            profitReportResponse.setTotalImport((Integer) ((Object[])list.get(i))[2]);
            profitReportResponse.setTotalReturn((BigInteger) ((Object[])list.get(i))[3]);
            profitReportResponse.setProfit((BigInteger) ((Object[])list.get(i))[4]);
            profitReportResponses.add(profitReportResponse);
        }
        return ResponseEntity.ok(profitReportResponses);
    }

    @GetMapping("/profitByDay")
//TODO    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countProfitReportByDay(
            @RequestParam(defaultValue = "02-02-2022") String value1,
            @RequestParam(defaultValue = "12-11-2022") String value2){
        List<Object> list = orderRepository.countProfitByDay(value1,value2);
        List<ProfitReportResponse> profitReportResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            ProfitReportResponse profitReportResponse = new ProfitReportResponse();
            profitReportResponse.setMonth((String) ((Object[])list.get(i))[0]);
            profitReportResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
            profitReportResponse.setTotalImport((Integer) ((Object[])list.get(i))[2]);
            profitReportResponse.setTotalReturn((BigInteger) ((Object[])list.get(i))[3]);
            profitReportResponse.setProfit((BigInteger) ((Object[])list.get(i))[4]);
            profitReportResponses.add(profitReportResponse);
        }
        return ResponseEntity.ok(profitReportResponses);
    }

    @GetMapping("/profitByQuarter")
//TODO    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> countProfitReportByQuarter(
            @RequestParam(defaultValue = "02-02-2022") String value1,
            @RequestParam(defaultValue = "12-11-2022") String value2){
        List<Object> list = orderRepository.countProfitByQuarter(value1,value2);
        List<ProfitReportResponse> profitReportResponses = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            ProfitReportResponse profitReportResponse = new ProfitReportResponse();
            profitReportResponse.setMonth((String) ((Object[])list.get(i))[0]);
            profitReportResponse.setRevenue((BigInteger) ((Object[])list.get(i))[1]);
            profitReportResponse.setTotalImport((Integer) ((Object[])list.get(i))[2]);
            profitReportResponse.setTotalReturn((BigInteger) ((Object[])list.get(i))[3]);
            profitReportResponse.setProfit((BigInteger) ((Object[])list.get(i))[4]);
            profitReportResponses.add(profitReportResponse);
        }
        return ResponseEntity.ok(profitReportResponses);
    }
}
