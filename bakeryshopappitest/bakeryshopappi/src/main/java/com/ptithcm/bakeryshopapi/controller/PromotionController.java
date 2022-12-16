package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Promotion;
import com.ptithcm.bakeryshopapi.payload.request.PromotionRequest;
import com.ptithcm.bakeryshopapi.payload.request.PromotionUpdateRequest;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.repository.IPromotionRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    private IPromotionRepository promotionRepository;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getPromotions() {
        return ResponseEntity.ok(promotionRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getPromotionsPageList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

        Page<Promotion> categories = "".equals(keyword) ?
                promotionRepository.findAll(pageable) :
                promotionRepository.findPromotionByNameLike("%" + keyword + "%", pageable);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPromotion(@RequestBody PromotionRequest promotionRequest) {
        Promotion promotion = new Promotion();
        promotion.setName(promotionRequest.getName());
        promotion.setCreatedAt(new Date());
        promotion.setStartDate(promotionRequest.getStartDate());
        promotion.setDeletedAt(null);
        promotion.setEndDate(promotionRequest.getEndDate());
        promotion.setEmployeeId(userRepository.findUserById(promotionRequest.getEmployeeId()));
        return ResponseEntity.ok(promotionRepository.save(promotion));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editPromotion(@RequestBody PromotionUpdateRequest promotionUpdateRequest) {
        if (promotionRepository.existsById(promotionUpdateRequest.getId())) {
            Promotion promotionUpdate = promotionRepository.findPromotionsById(promotionUpdateRequest.getId());
            promotionUpdate.setName(promotionUpdateRequest.getName());
            promotionUpdate.setStartDate(promotionUpdateRequest.getStartDate());
            promotionUpdate.setEndDate(promotionUpdateRequest.getEndDate());
            promotionUpdate.setEmployeeId(userRepository.findUserById(promotionUpdateRequest.getEmployeeId()));
            promotionUpdate.setCreatedAt(new Date());
            promotionRepository.save(promotionUpdate);
            return ResponseEntity.ok(promotionUpdate);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Promotion is not exist..."));
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deletePromotionById(@PathVariable Long id) {
        Promotion promotion = promotionRepository.findById(id).get();
        if (promotion.getDeletedAt() == null) {
            promotion.setDeletedAt(new Date());
        } else {
            promotion.setDeletedAt(null);
        }
        promotionRepository.save(promotion);
        return new ResponseEntity(promotion, HttpStatus.OK);
    }

    @GetMapping("/fill")
    public ResponseEntity<?> getPromotionFill() {
        return ResponseEntity.ok(promotionRepository.findAll().stream().filter(c -> c.getDeletedAt() == null));
    }
}
