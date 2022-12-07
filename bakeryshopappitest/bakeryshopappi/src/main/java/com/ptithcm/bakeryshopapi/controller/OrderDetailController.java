package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.repository.IOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orderdetail")
public class OrderDetailController {

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getOrderDetails() {
        return ResponseEntity.ok(orderDetailRepository.findAll());
    }

//    @GetMapping("/{orderId}")
//    public ResponseEntity<?> getOneOrderDetails(@PathVariable String orderId) {
//        return ResponseEntity.ok(orderDetailRepository.findByOrderId_Id(orderId));
//    }
}
