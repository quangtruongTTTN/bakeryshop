package com.ptithcm.bakeryshopapi;

import com.ptithcm.bakeryshopapi.seed.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.text.ParseException;

@SpringBootApplication
@EnableScheduling
public class BakeryShopApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BakeryShopApiApplication.class, args);
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) throws ParseException {

        SeedRolesTable.insertData();
        SeedUsersTable.insertData();
        SeedMemberVipsTable.insertData();

        SeedCategoriesTable.insertData();
        SeedSizeOptionsTable.insertData();
//        SeedAddOptionsTable.insertData();
        SeedProductsTable.insertData();
        SeedSaleOffsTable.insertData();

        SeedOrdersTable.insertData();
        SeedOrderDetailsTable.insertData();
        SeedWishlistsTable.insertData();
        SeedCodesTable.insertData();
//        SeedVouchersTable.insertData();
        SeedSpinnersTable.insertData();

        SeedWheelHistory.insertData();

//        SeedGroupMemberTable.insertData();
//        SeedGroupOrderDetailsTable.insertData();
    }
}
