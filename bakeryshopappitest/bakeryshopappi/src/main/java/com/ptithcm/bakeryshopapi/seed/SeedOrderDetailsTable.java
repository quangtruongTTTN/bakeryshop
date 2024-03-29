package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.repository.*;
import com.ptithcm.bakeryshopapi.entity.Order;
import com.ptithcm.bakeryshopapi.entity.OrderDetail;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.repository.IOrderDetailRepository;
import com.ptithcm.bakeryshopapi.repository.IOrderRepository;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedOrderDetailsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedOrderDetailsTable.class);

    private static IOrderDetailRepository orderDetailRepository;
    private static IProductRepository productRepository;

    private static IOrderRepository orderRepository;

    public SeedOrderDetailsTable(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, IProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productRepository = productRepository;

    }

    public static void insertData() {
//        long count = orderDetailRepository.count();
//        if (count == 0) {
//            // Insert OrderDetails
//            // Insert OrderDetail 1
//            Product product01 = productRepository.findById("P0882021035821").get();
//            Order order01 = orderRepository.findById("O0882021035829").get();
//            Order order02 = orderRepository.findById("O0882021035831").get();
//            OrderDetail orderDetail01 = new OrderDetail(1,"Nhỏ",  2, product01.getPrice(),
//                    "Giao hang nhanh", order01, product01);
//            OrderDetail orderDetail02 = new OrderDetail(2,"Nhỏ", 2, product01.getPrice(),
//                    "Giao hang nhanh", order02, product01);
//
//            // Insert Data
//            orderDetailRepository.saveAll(Arrays.asList(orderDetail01, orderDetail02));
//            LOGGER.info("OrderDetails Table Seeded.");
//        } else {
//            LOGGER.trace("OrderDetails Seeding Not Required.");
//        }
    }
}
