package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.SaleOff;
import com.ptithcm.bakeryshopapi.payload.request.SaleOffRequest;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import com.ptithcm.bakeryshopapi.repository.ISaleOffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/saleoff")
public class SaleOffController {

    @Autowired
    private ISaleOffRepository saleOffRepository;

    @Autowired
    private IProductRepository productRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getSaleOffs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

        Date date = new Date();
        Timestamp timeNow = new Timestamp(date.getTime());

        List<SaleOff> saleOffs = saleOffRepository.findAll();

        for (SaleOff saleOff : saleOffs) {
            if (saleOff.getEndDate().compareTo(timeNow) < 0) {
                saleOffRepository.delete(saleOff);
            }
        }

        return ResponseEntity.ok(saleOffRepository.findAll(pageable));
    }

    //    @PostMapping("/add")
//    public ResponseEntity<?> addSaleOff(@RequestBody SaleOffRequest saleOffRequest) {
//        Product product = productRepository.findById(saleOffRequest.getProductId()).get();
////        Collection<SaleOff> saleOffs = product.getSaleOff();
//
//        Double discount = saleOffRequest.getDiscount();
//        Date endDate = saleOffRequest.getEndDate();
//        Date createdAt = saleOffRequest.getCreatedAt();
////        for(SaleOff saleOff : saleOffs){
////            if(saleOff.getCreatedAt().before())
////        }
////        SaleOff saleOff = new SaleOff(discount, endDate, product);
//        SaleOff saleOff = new SaleOff(discount,createdAt, endDate, product);
//
//        saleOffRepository.save(saleOff);
//
//        return ResponseEntity.ok(saleOff);
//
//    }
    @PostMapping("/add")
    public ResponseEntity<?> addSaleOff(@RequestBody SaleOffRequest saleOffRequest) {
        Product product = productRepository.findById(saleOffRequest.getProductId()).get();
        Collection<SaleOff> saleOffs = product.getSaleOff();

        Double discount = saleOffRequest.getDiscount();
        Date endDate = saleOffRequest.getEndDate();
        Date createdAt = saleOffRequest.getCreatedAt();
        for(SaleOff saleOff : saleOffs){
        if(!(createdAt.compareTo(saleOff.getCreatedAt())<0 && endDate.compareTo(saleOff.getCreatedAt())<0)
                && !(createdAt.compareTo(saleOff.getEndDate())>0 && endDate.compareTo(saleOff.getEndDate())>0)
        ){
            return ResponseEntity.ok(HttpStatus.OK);
        }
//        if(!(createdAt.compareTo(saleOff.getEndDate())>0 && endDate.compareTo(saleOff.getEndDate())>0)){
//            return ResponseEntity.ok(HttpStatus.OK);
//        }


//            if(!(saleOff.getCreatedAt().before(createdAt) && saleOff.getCreatedAt().after(createdAt))){
//                return ResponseEntity.ok(HttpStatus.OK);
//            }
//            if((createdAt.compareTo(saleOff.getCreatedAt())* saleOff.getCreatedAt().compareTo(endDate))>0
//                    ||  (createdAt.compareTo(saleOff.getEndDate())* saleOff.getEndDate().compareTo(endDate))>0
//            ){
//                return ResponseEntity.ok(HttpStatus.OK);
//            }
//            if((createdAt.compareTo(saleOff.getCreatedAt()) >= 0 && createdAt.compareTo(saleOff.getEndDate()) <= 0)
//                || (endDate.compareTo(saleOff.getCreatedAt()) >= 0 && endDate.compareTo(saleOff.getEndDate()) <= 0))
//            {
//                return ResponseEntity.ok(HttpStatus.OK);
//            }
        }
//        SaleOff saleOff = new SaleOff(discount, endDate, product);
        SaleOff saleOff = new SaleOff(discount, createdAt, endDate, product);

        saleOffRepository.save(saleOff);

        return ResponseEntity.ok(saleOff);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSaleOff(@PathVariable Long id,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "3") int pageSize,
                                           @RequestParam(defaultValue = "id") String sortField,
                                           @RequestParam(defaultValue = "asc") String sortDir) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );


        SaleOff saleOff = saleOffRepository.findById(id).get();
        saleOffRepository.delete(saleOff);

        return ResponseEntity.ok(productRepository.findProductByPromotionDetailsNotNull(pageable));
    }
}
