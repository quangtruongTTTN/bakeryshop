package com.ptithcm.bakeryshopapi.scheduledtasks;


import com.ptithcm.bakeryshopapi.entity.Notification;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import com.ptithcm.bakeryshopapi.repository.INotificationRepository;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Component
@Slf4j
public class ScheduledTasks {
    @Autowired
    IProductRepository productRepository;
    @Autowired
    INotificationRepository notificationRepository;
//    @Scheduled(cron = "59 59 23 ? * * ")
//    public void scanVoucher(){
//        List<Voucher> vouchers = voucherService.findAll();
//        for(Voucher v: vouchers){
//            if(v.getExpireDate().isBefore(LocalDate.now())){
//                v.setIsActive(AppConst.CONST_IN_ACTIVE);
//                voucherService.saveVoucher(v);
//            }
//        }
//    }

    @Scheduled(cron = "0 31 21 ? * * ")
    public void scanProduct(){
        List<Product> products = productRepository.findAll();
        for(Product p: products){
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail a: productDetails){
                Notification notification = null;
                if(a.getStock() <= 1){
                    notification = new Notification();
                    notification.setRead(false);
                    notification.setDeliver(false);
                    notification.setType(3);
                    notification.setContent(String.format("Sản phẩm %s size %s sắp hết, kiểm tra ngay nào", p.getName(), a.getSizeOption().getName()));
                    notification.setProduct(p);
                    notificationRepository.save(notification);
                }
            }
        }
    }
}
