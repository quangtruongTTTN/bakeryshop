package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.InvoiceRequest;
import com.ptithcm.bakeryshopapi.payload.request.InvoiceRequest;
import com.ptithcm.bakeryshopapi.payload.response.ProductReturnResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private IProductReturnDetailRepository productReturnDetailRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IInvoiceRepository invoiceRepository;

//    @GetMapping("/list")
//    public ResponseEntity<?> getInvoice(){
//        return ResponseEntity.ok(ratingRepository.findAll());
//    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable String id){
        return ResponseEntity.ok(invoiceRepository.findByOrderId(id));
    }

    @GetMapping("/listInvoice")
    public ResponseEntity<?> getInvoiceByUserId(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "-1") long id
    ){
        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        List<Invoice> invoiceList = invoiceRepository.findByOrder_UserId_Id(id);
//        Date date = new Date();
        LocalDate localDate =  LocalDate.now().minusDays(2);
        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Invoice> invoiceListFillter = invoiceList.stream().filter(s -> s.getCreatedAt().after(date))
                .sorted(Comparator.comparing(Invoice::getCreatedAt))
                .collect(Collectors.toList());
        for(Invoice invoice : invoiceListFillter){
            Collection<ProductReturn> productReturns = invoice.getProductReturn();

            if(productReturns != null){
                Order order = invoice.getOrder();
                Collection<OrderDetail> orderDetails = order.getOrderDetails();
                for(OrderDetail orderDetail : orderDetails){
                    long totalDone = 0;
                    for(ProductReturn productReturn : productReturns){
                        for(ProductReturnDetail productReturnDetail : productReturn.getProductReturnDetails()){
                            if(productReturnDetail.getProductDetail().getId()== orderDetail.getProductDetail().getId()){
                                totalDone += productReturnDetail.getQuantity();
                            }
                        }
//                        totalDone+= productReturnDetailRepository.sumDoneQuantity(orderDetail.getProductDetail(),productReturn);
                    }
                    orderDetail.setDoneQuantity(totalDone);
                }
                order.setOrderDetails(orderDetails);
                invoice.setOrder(order);
            }else{
                System.err.println("3h2o2h22i3233");
            }

        }
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), invoiceListFillter.size());
        final Page<Invoice> invoicePage = new PageImpl<>(invoiceListFillter.subList(start, end), pageable, invoiceListFillter.size());

        return ResponseEntity.ok(invoicePage);
    }

    @PostMapping("/add")
//TODO    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addInvoice(@RequestBody InvoiceRequest invoiceRequest){
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");
        String invoiceId = "HD" + formatter.format(new Date());
        Invoice invoice = new Invoice();

        invoice.setId(invoiceId);
        invoice.setOrder(orderRepository.findById(invoiceRequest.getOrderId()).get());
//        invoiceRepository.save(invoice);
        return ResponseEntity.ok(invoiceRepository.save(invoice));
    }
}
