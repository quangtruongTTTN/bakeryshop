package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.payload.response.RevenueResponse;
import com.ptithcm.bakeryshopapi.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    @Autowired
    private IOrderRepository orderRepository;

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

    @GetMapping("/years")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllYears(){
        List<Integer> list = orderRepository.getAllYears();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/sumRevenue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> sumRevenue(@RequestParam(defaultValue = "2022")int year){
        Integer sum = orderRepository.sumRevenue(year);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/today")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getRevenueToday(){
        Integer sum = orderRepository.revenueToday();
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/lastFiveOrders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getLastFiveOrders(){
        List<Order> list = orderRepository.lastFiveOrders();
        return ResponseEntity.ok(list);
    }
}
