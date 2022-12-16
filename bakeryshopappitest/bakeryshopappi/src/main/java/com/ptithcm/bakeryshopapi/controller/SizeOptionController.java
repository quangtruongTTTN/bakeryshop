package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import com.ptithcm.bakeryshopapi.entity.SizeOption;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.repository.IProductDetailRepository;
import com.ptithcm.bakeryshopapi.repository.IProductRepository;
import com.ptithcm.bakeryshopapi.repository.ISizeOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sizeoption")
public class SizeOptionController {

    @Autowired
    private ISizeOptionRepository sizeOptionRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IProductDetailRepository productDetailRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getSizeOptions() {
        return ResponseEntity.ok(sizeOptionRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getSizeOptionsPageList(
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

        Page<SizeOption> sizeOptions = "".equals(keyword) ?
                sizeOptionRepository.findAll(pageable) :
                sizeOptionRepository.findSizeOptionsByNameLike("%" + keyword + "%", pageable);

        return ResponseEntity.ok(sizeOptions);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSizeOptions(@RequestBody SizeOption sizeOptions) {
        return ResponseEntity.ok(sizeOptionRepository.save(sizeOptions));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editSizeOptions(@RequestBody SizeOption sizeOptions) {
        if (sizeOptionRepository.existsById(sizeOptions.getId())) {
            SizeOption sizeOptionsUpdate = sizeOptionRepository.findById(sizeOptions.getId()).get();
            sizeOptionsUpdate.setName(sizeOptions.getName());
//            sizeOptionsUpdate.setPrice(sizeOptions.getPrice());
            sizeOptionRepository.save(sizeOptionsUpdate);
            return ResponseEntity.ok(sizeOptionsUpdate);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Size Options is not exist..."));
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteSizeOptionsById(@PathVariable Long id) {
        Pageable pageable = PageRequest.of(
                1 - 1, 3,
                Sort.by("id").descending()
        );
        SizeOption sizeOptions = sizeOptionRepository.findById(id).get();
//        if (sizeOptions.getDeletedAt() == null) {
//            sizeOptions.setDeletedAt(new Date());
//        } else {
//            sizeOptions.setDeletedAt(null);
//        }
//        sizeOptionRepository.save(sizeOptions);
//        List<Product> products = productRepository.findAll();
        List<ProductDetail> productDetails = productDetailRepository.findAll();

        for(ProductDetail productDetail: productDetails){
            if(productDetail.getSizeOption().getId()==sizeOptions.getId()){
                if (sizeOptions.getDeletedAt() == null) {
                    sizeOptions.setDeletedAt(new Date());
                } else {
                    sizeOptions.setDeletedAt(null);
                }
                sizeOptionRepository.save(sizeOptions);
                return new ResponseEntity(sizeOptionRepository.findAll(pageable), HttpStatus.OK);
            }

        }



        sizeOptionRepository.delete(sizeOptions);

        return new ResponseEntity(sizeOptionRepository.findAll(pageable), HttpStatus.OK);
    }
}
