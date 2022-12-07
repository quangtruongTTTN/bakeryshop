//package com.ptithcm.bakeryshopapi.seed;
//
////import com.ptithcm.bakeryshopapi.entity.Voucher;
//import com.ptithcm.bakeryshopapi.repository.IVoucherRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//
//@Component
//public class SeedVouchersTable {
//    private static final Logger LOGGER = LoggerFactory.getLogger(SeedVouchersTable.class);
//
//    private static IVoucherRepository voucherRepository;
//
//    public SeedVouchersTable(IVoucherRepository voucherRepository) {
//        this.voucherRepository = voucherRepository;
//    }
//
//    public static void insertData() {
//        long count = voucherRepository.count();
//        if (count == 0) {
//            // Insert Voucher
//            Voucher vourcher01 = new Voucher(1L,"Mã giám giá 1", "truongnguyen");
//            Voucher vourcher02 = new Voucher(2L,"Mã giám giá 2", "truongnguyen");
//
//            // Insert Data
//            voucherRepository.saveAll(Arrays.asList(vourcher01, vourcher02));
//            LOGGER.info("Voucher Table Seeded.");
//        } else {
//            LOGGER.trace("Voucher Seeding Not Required.");
//        }
//    }
//}
