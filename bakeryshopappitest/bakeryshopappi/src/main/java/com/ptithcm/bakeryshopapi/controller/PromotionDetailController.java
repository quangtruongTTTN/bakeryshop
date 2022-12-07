package com.ptithcm.bakeryshopapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.PromotionDetailListRequest;
import com.ptithcm.bakeryshopapi.payload.request.PromotionDetailRequest;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import com.ptithcm.bakeryshopapi.repository.IPromotionDetailRepository;
import com.ptithcm.bakeryshopapi.repository.IPromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/promotiondetail")
public class PromotionDetailController {

    @Autowired
    private IPromotionDetailRepository promotionDetailRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IPromotionRepository promotionRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getPromotionDetails(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "1") long promodionId
    ) {
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

        Date date = new Date();
        Timestamp timeNow = new Timestamp(date.getTime());

        List<PromotionDetail> promotionDetails = promotionDetailRepository.findAll();
        return ResponseEntity.ok(promotionDetailRepository.findAll(pageable));
    }

    //    @PostMapping("/add")
//    public ResponseEntity<?> addPromotionDetail(@RequestBody PromotionDetailRequest promotionDetailRequest) {
//        Product product = productRepository.findById(promotionDetailRequest.getProductId()).get();
////        Collection<PromotionDetail> promotionDetails = product.getPromotionDetail();
//
//        Double discount = promotionDetailRequest.getDiscount();
//        Date endDate = promotionDetailRequest.getEndDate();
//        Date createdAt = promotionDetailRequest.getCreatedAt();
////        for(PromotionDetail promotionDetail : promotionDetails){
////            if(promotionDetail.getCreatedAt().before())
////        }
////        PromotionDetail promotionDetail = new PromotionDetail(discount, endDate, product);
//        PromotionDetail promotionDetail = new PromotionDetail(discount,createdAt, endDate, product);
//
//        promotionDetailRepository.save(promotionDetail);
//
//        return ResponseEntity.ok(promotionDetail);
//
//    }
    @PostMapping("/add")
    public ResponseEntity<?> addPromotionDetail(@RequestBody PromotionDetailRequest promotionDetailRequest) {
        if(promotionDetailRepository.existsPromotionDetailByProduct_IdAndPromotion_Id(promotionDetailRequest.getProductId(),promotionDetailRequest.getPromotionId())){
            return ResponseEntity.ok(new MessageResponse("Sản phẩm này đã có trong đợt giảm giá"));
        }
        Product product = productRepository.findById(promotionDetailRequest.getProductId()).get();
        Promotion promotion = promotionRepository.findById(promotionDetailRequest.getPromotionId()).get();
        Collection<PromotionDetail> promotionDetails = product.getPromotionDetails();
        int discount = promotionDetailRequest.getDiscount();

//        Date endDate = promotionDetailRequest.getEndDate();
//        Date createdAt = promotionDetailRequest.getCreatedAt();
//        for(PromotionDetail promotionDetail : promotionDetails){
//        if(!(createdAt.compareTo(promotionDetail.getCreatedAt())<0 && endDate.compareTo(promotionDetail.getCreatedAt())<0)
//                && !(createdAt.compareTo(promotionDetail.getEndDate())>0 && endDate.compareTo(promotionDetail.getEndDate())>0)
//        ){
//            return ResponseEntity.ok(HttpStatus.OK);
//        }
//
//        }
//        PromotionDetail promotionDetail = new PromotionDetail(discount, endDate, product);
        PromotionDetail promotionDetail = new PromotionDetail(discount,  product, promotion);

        promotionDetailRepository.save(promotionDetail);

        return ResponseEntity.ok(promotionDetail);

    }
    @PostMapping("/addList")
    @Transactional
    public ResponseEntity<?> addPromotionDetailList(@RequestBody List<PromotionDetailRequest> promotionDetailRequestList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        //PromotionDetailListRequest promotionDetailListRequest
//        List<PromotionDetailRequest>  promotionDetailRequestList =
//                Arrays.asList(objectMapper.readValue(promotionDetailListRequest.getPromotionDetailRequests().toString(), PromotionDetailRequest[].class));
//        List<PromotionDetailRequest>  promotionDetailRequestList = new ArrayList<>();
//        if (promotionDetailListRequest.getPromotionDetailRequests() != null) {
//            for (int i = 0; i < promotionDetailListRequest.getPromotionDetailRequests().size(); i++) {
//                promotionDetailRequestList.add(objectMapper.readValue(promotionDetailListRequest.getPromotionDetailRequests().get(i).toString(), PromotionDetailRequest.class));
//            }
//        }
//                Arrays.asList(objectMapper.readValue(promotionDetailListRequest.getPromotionDetailRequests().toString(), PromotionDetailRequest[].class))
//        List<PromotionDetailRequest>  promotionDetailRequestList = promotionDetailListRequest.getPromotionDetailRequests();
        for(PromotionDetailRequest promotionDetailRequest: promotionDetailRequestList){
            if(promotionDetailRepository.existsPromotionDetailByProduct_IdAndPromotion_Id(promotionDetailRequest.getProductId(),promotionDetailRequest.getPromotionId())){
//                String message ="Sản phẩm có mã "+ promotionDetailRequest.getProductId()  + " này đã có trong đợt giảm giá";
                return ResponseEntity.ok(new MessageResponse("Sản phẩm có mã "+ promotionDetailRequest.getProductId()  + " này đã có trong đợt giảm giá"));
            }
            Product product = productRepository.findById(promotionDetailRequest.getProductId()).get();
            Promotion promotion = promotionRepository.findById(promotionDetailRequest.getPromotionId()).get();
            Collection<PromotionDetail> promotionDetails = product.getPromotionDetails();
            int discount = promotionDetailRequest.getDiscount();
            PromotionDetail promotionDetail = new PromotionDetail(discount,  product, promotion);
            promotionDetailRepository.save(promotionDetail);
        }

        return ResponseEntity.ok(new MessageResponse("OK"));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePromotionDetail(@PathVariable Long id,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "3") int pageSize,
                                           @RequestParam(defaultValue = "id") String sortField,
                                           @RequestParam(defaultValue = "asc") String sortDir) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );


        PromotionDetail promotionDetail = promotionDetailRepository.findById(id).get();
        promotionDetailRepository.delete(promotionDetail);

        return ResponseEntity.ok(productRepository.findProductByPromotionDetailsNotNull(pageable));
    }
}
