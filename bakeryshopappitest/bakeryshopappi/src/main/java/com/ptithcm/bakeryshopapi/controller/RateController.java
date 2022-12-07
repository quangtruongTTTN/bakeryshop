//package com.ptithcm.bakeryshopapi.controller;
//
//import com.ptithcm.bakeryshopapi.payload.request.RateRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/rate")
//public class RateController {
//    @Autowired
//    private IRateRepository rateRepository;
//
//
//    @GetMapping("/list")
//    public ResponseEntity<?> getRate(){
//        return ResponseEntity.ok(rateRepository.findAll());
//    }
//
////    @GetMapping("/{id}")
////    public ResponseEntity<?> getRateById(@PathVariable String id){
////        List<Integer> rate = new ArrayList<>();
////        Rate rate1 = rateRepository.findRatingById(id);
////        rate.add(rate1.getNumber0());
////        rate.add(rate1.getNumber1());
////        rate.add(rate1.getNumber2());
////        rate.add(rate1.getNumber3());
////        rate.add(rate1.getNumber4());
////        return ResponseEntity.ok(rate);
////    }
//
//    @GetMapping("/{id}")
//    public List<Integer> getRateById(@PathVariable String id){
//        List<Integer> rate = new ArrayList<>();
//        Rate rate1 = rateRepository.findRatingById(id);
//        rate.add(rate1.getNumber0());
//        rate.add(rate1.getNumber1());
//        rate.add(rate1.getNumber2());
//        rate.add(rate1.getNumber3());
//        rate.add(rate1.getNumber4());
//        return rate;
//    }
//
////    @GetMapping("/page")
////    public ResponseEntity<?> getRatePageList(
////            @RequestParam(defaultValue = "1") int page,
////            @RequestParam(defaultValue = "3") int pageSize,
////            @RequestParam(defaultValue = "id") String sortField,
////            @RequestParam(defaultValue = "asc") String sortDir,
////            @RequestParam(defaultValue = "") String keyword
////    ) {
////        Pageable pageable = PageRequest.of(
////                page - 1, pageSize,
////                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
////        );
////
////        Page<Rate> rates = "".equals(keyword) ?
////                rateRepository.findAll(pageable) :
////                rateRepository.findRateByUsernameLike("%" + keyword + "%", pageable);
////        return ResponseEntity.ok(rates);
////    }
//
//    @PostMapping("/add")
////    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> addRate(@RequestBody RateRequest rateRequest){
//        Rate rate = rateRepository.findRatingById(rateRequest.getProductId());
//        if(rate!=null && rateRequest.getRate() != -1){
//            if(rateRequest.getRate()==0){
//                rate.setNumber0(rate.getNumber0()+1);
//            }else if(rateRequest.getRate()==1){
//                rate.setNumber1(rate.getNumber1()+1);
//            }else if(rateRequest.getRate()==2){
//                rate.setNumber2(rate.getNumber2()+1);
//            }else if(rateRequest.getRate()==3){
//                rate.setNumber3(rate.getNumber3()+1);
//            }else if(rateRequest.getRate()==4){
//                rate.setNumber4(rate.getNumber4()+1);
//            }
//            rateRepository.save(rate);
//        }else{
//            rateRepository.save(new Rate(rateRequest.getProductId()));
//        }
//
//        return ResponseEntity.ok(rate);
//    }
//}
