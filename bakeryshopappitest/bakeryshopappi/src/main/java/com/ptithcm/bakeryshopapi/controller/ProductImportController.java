

package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.ProductDetailImportRequest;
import com.ptithcm.bakeryshopapi.payload.request.ProductImportRequest;
import com.ptithcm.bakeryshopapi.payload.response.CartResponse;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.payload.response.ProductImportResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

import static com.ptithcm.bakeryshopapi.utility.Utils.toPage;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/productImport")
public class ProductImportController {

    @Autowired
    private IProductImportRepository productImportRepository;

    @Autowired
    private IProductImportDetailRepository productImportDetailRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private IProductDetailRepository productDetailRepository;

    @Autowired
    private IPromotionDetailRepository promotionDetailRepository;

    @Autowired
    private ICommentRepository commentRepository;
    @Autowired
    private IProductRepository productRepository;
//    @Autowired
//    private IShorterRepository shorterRepository;
//
//    @Autowired
//    private IGroupMemberRepository groupMemberRepository;


    @GetMapping("/list")
    public ResponseEntity<?> getProductImports() {
        return ResponseEntity.ok(productImportRepository.findAll());
    }


    @GetMapping("/listSuccess")
    //TODO @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListSuccess(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "") String keyword
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        if (id == -1) {
//            Page<ProductImport> productImports = productImportRepository.findAll( pageable);
            List<ProductImport> importList ="".equals(keyword) ? productImportRepository.findAll()
                    : productImportRepository.findAllByIdContaining(keyword);
            List<ProductImportResponse> productImportResponses = new ArrayList<>();
            for(ProductImport productImport : importList){
                ProductImportResponse productImportResponse = new ProductImportResponse();
                productImportResponse.setId(productImport.getId());
                productImportResponse.setEmployeeId(productImport.getEmployeeId().getUsername());
                productImportResponse.setEmployeeName(productImport.getEmployeeId().getFullName());
                productImportResponse.setCreatedAt(productImport.getCreatedAt());
                productImportResponse.setProductImportDetails(productImport.getProductImportDetails());
                long totalPrice = 0 , totalQuantity = 0 ;
                for(ProductImportDetail productImportDetail : productImport.getProductImportDetails()){
                    totalPrice += productImportDetail.getQuantity()* productImportDetail.getPrice();
                    totalQuantity += productImportDetail.getQuantity();
//                    prdId= productImportDetail.getId();
                }
                productImportResponse.setTotalPrice(totalPrice);
                productImportResponse.setTotalQuantity(totalQuantity);
                productImportResponses.add(productImportResponse);
            }
            return ResponseEntity.ok(toPage(productImportResponses,pageable));
        }

        Optional<User> user = userRepository.findById(id);

        Page<ProductImport> productImports = productImportRepository.findAllByEmployeeId(user,  pageable);

        return ResponseEntity.ok(productImports);
    }
    @PostMapping("/add")
    @Transactional
    public ResponseEntity<?> addProductImport(@RequestBody ProductImportRequest productImportRequest) {
        if(productImportRequest.getDetailImportRequestList().stream().allMatch(e->e.getQuantity()==0)==true){{
//            return ResponseEntity.ok(new MessageResponse("Nhập thất bại. Số lượng không được để trống"));
            return ResponseEntity.ok(new MessageResponse("Nhập thất bại. Số lượng không được để trống"));
        }}
        ProductImport productImport = new ProductImport();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");
        String id = "PN" + formatter.format(new Date());
        productImport.setId(id);
        productImport.setCreatedAt(new Date());
        productImport.setEmployeeId(userRepository.findUserById(productImportRequest.getEmployeeId()));
        productImportRepository.save(productImport);
        List<ProductImportDetail> productImportDetails = new ArrayList<>();

        for(ProductDetailImportRequest detailImportRequest : productImportRequest.getDetailImportRequestList()){
            if(detailImportRequest.getQuantity()!=0){
                ProductImportDetail productImportDetail = new ProductImportDetail();
                productImportDetail.setPrice(detailImportRequest.getPrice());
                productImportDetail.setQuantity(detailImportRequest.getQuantity());
                productImportDetail.setProductImportId(id);
                productImportDetail.setProductDetail(productDetailRepository.findById(detailImportRequest.getId()).get());
                productImportDetails.add(productImportDetail);
                productImportDetailRepository.save(productImportDetail);
                ProductDetail productDetail = productDetailRepository.findById(detailImportRequest.getId()).get();
                productDetail.setStock(productDetail.getStock()+detailImportRequest.getQuantity());
                productDetailRepository.save(productDetail);
            }
        }
//        productImport.set(productImportDetails);
        productImport.setProductImportDetails(productImportDetails);
        return ResponseEntity.ok(productImportRepository.save(productImport));
    }

    @GetMapping("/getByProductImportId")
    public ResponseEntity<?> getOrderById(@RequestParam String productImportId) {
        ProductImport productImport = productImportRepository.findProductImportById(productImportId);

        ProductImportResponse productImportResponse = new ProductImportResponse();
        productImportResponse.setId(productImport.getId());
        productImportResponse.setEmployeeId(productImport.getEmployeeId().getUsername());
        productImportResponse.setEmployeeName(productImport.getEmployeeId().getFullName());
        productImportResponse.setCreatedAt(productImport.getCreatedAt());
        productImportResponse.setProductImportDetails(productImport.getProductImportDetails());
        long totalPrice = 0 , totalQuantity = 0 ;
        for(ProductImportDetail productImportDetail : productImport.getProductImportDetails()){
            totalPrice += productImportDetail.getQuantity()* productImportDetail.getPrice();
            totalQuantity += productImportDetail.getQuantity();
//                    prdId= productImportDetail.getId();
        }
        productImportResponse.setTotalPrice(totalPrice);
        productImportResponse.setTotalQuantity(totalQuantity);
        return ResponseEntity.ok(productImportResponse);
    }
}
