

package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import com.ptithcm.bakeryshopapi.entity.ProductReturn;
import com.ptithcm.bakeryshopapi.entity.ProductReturnDetail;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.payload.request.ProductDetailImportRequest;
import com.ptithcm.bakeryshopapi.payload.request.ProductDetailReturnRequest;
import com.ptithcm.bakeryshopapi.payload.request.ProductReturnRequest;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.payload.response.ProductReturnResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/productReturn")
public class ProductReturnController {

    @Autowired
    private IProductReturnRepository productReturnRepository;

    @Autowired
    private IProductReturnDetailRepository productReturnDetailRepository;

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
    @Autowired
    private IInvoiceRepository invoiceRepository;
//    @Autowired
//    private IShorterRepository shorterRepository;
//
//    @Autowired
//    private IGroupMemberRepository groupMemberRepository;


    @GetMapping("/list")
    public ResponseEntity<?> getProductReturns() {
        return ResponseEntity.ok(productReturnRepository.findAll());
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

//            Page<ProductReturn> productReturns = productReturnRepository.findAll( pageable);
            List<ProductReturn> returnList = "".equals(keyword) ? productReturnRepository.findAll()
                    : productReturnRepository.findAllByIdContaining(keyword);
            List<ProductReturnResponse> productReturnResponses = new ArrayList<>();
            for(ProductReturn productReturn : returnList){
                ProductReturnResponse productReturnResponse = new ProductReturnResponse();
                productReturnResponse.setId(productReturn.getId());
                productReturnResponse.setEmployeeId(productReturn.getEmployeeId().getUsername());
                productReturnResponse.setEmployeeName(productReturn.getEmployeeId().getFullName());
                productReturnResponse.setCreatedAt(productReturn.getCreatedAt());
                productReturnResponse.setProductReturnDetails(productReturn.getProductReturnDetails());
                long totalPrice = 0 , totalQuantity = 0 ;
                for(ProductReturnDetail productReturnDetail : productReturn.getProductReturnDetails()){
//                    totalPrice += productReturnDetail.getQuantity()* productReturnDetail.getPrice();
                    totalQuantity += productReturnDetail.getQuantity();
                    productReturnDetail.setDoneQuantity(productReturnDetailRepository.sumDoneQuantity(productReturnDetail.getProductDetail(),productReturnDetail.getProductReturn()));
                }
//                productReturnResponse.setTotalPrice(totalPrice);
                productReturnResponse.setTotalQuantity(totalQuantity);
                productReturnResponses.add(productReturnResponse);
//                Product product = productRepository.findProductByProductDetails_Id(prdId);
//                productReturnResponse.setProductId(product.getId());
//                productReturnResponse.setProductName(product.getName());
            }
            final int start = (int)pageable.getOffset();
            final int end = Math.min((start + pageable.getPageSize()), productReturnResponses.size());
            final Page<ProductReturnResponse> productReturnResponsePage = new PageImpl<>(productReturnResponses.subList(start, end), pageable, productReturnResponses.size());

            return ResponseEntity.ok(productReturnResponsePage);
        }

        Optional<User> user = userRepository.findById(id);

        Page<ProductReturn> productReturns = productReturnRepository.findAllByEmployeeId(user,  pageable);

        return ResponseEntity.ok(productReturns);
    }
    @PostMapping("/add")
    @Transactional
    public ResponseEntity<?> addProductReturn(@RequestBody ProductReturnRequest productReturnRequest) {
        if(productReturnRequest.getDetailReturnRequestList().stream().allMatch(e->e.getQuantity()==0)==true){{
//            return ResponseEntity.ok(new MessageResponse("Nhập thất bại. Số lượng không được để trống"));
            return ResponseEntity.ok(new MessageResponse("Nhập thất bại. Số lượng không được để trống"));
        }}
        ProductReturn productReturn = new ProductReturn();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");
        String id = "PT" + formatter.format(new Date());
        productReturn.setId(id);
        productReturn.setCreatedAt(new Date());
        productReturn.setInvoice(invoiceRepository.findById(productReturnRequest.getInvoiceId()).get());
        productReturn.setEmployeeId(userRepository.findUserById(productReturnRequest.getEmployeeId()));
        productReturnRepository.save(productReturn);
        List<ProductReturnDetail> productReturnDetails = new ArrayList<>();
        for(ProductDetailReturnRequest detailReturnRequest : productReturnRequest.getDetailReturnRequestList()){
            if(detailReturnRequest.getQuantity()!=0){
                ProductReturnDetail productReturnDetail = new ProductReturnDetail();
                productReturnDetail.setQuantity(detailReturnRequest.getQuantity());
                productReturnDetail.setProductReturn(productReturnRepository.findById(id).get());
                productReturnDetail.setProductDetail(productDetailRepository.findById(detailReturnRequest.getId()).get());
                productReturnDetails.add(productReturnDetail);
                productReturnDetailRepository.save(productReturnDetail);
                ProductDetail productDetail = productDetailRepository.findById(detailReturnRequest.getId()).get();
                productDetail.setStock(productDetail.getStock()+detailReturnRequest.getQuantity());
                productDetailRepository.save(productDetail);
            }

        }
//        productReturn.set(productReturnDetails);
        productReturn.setProductReturnDetails(productReturnDetails);
        return ResponseEntity.ok(productReturnRepository.save(productReturn));
    }

}
