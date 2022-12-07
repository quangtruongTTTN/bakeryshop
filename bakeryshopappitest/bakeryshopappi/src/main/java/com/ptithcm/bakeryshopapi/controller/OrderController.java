//package com.ptithcm.bakeryshopapi.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ptithcm.bakeryshopapi.entity.*;
//import com.ptithcm.bakeryshopapi.payload.request.CheckoutRequest;
//import com.ptithcm.bakeryshopapi.payload.request.OrderQuantityRequest;
//import com.ptithcm.bakeryshopapi.payload.request.OrderRequest;
//import com.ptithcm.bakeryshopapi.payload.request.OrderStatusRequest;
//import com.ptithcm.bakeryshopapi.payload.response.CartResponse;
//import com.ptithcm.bakeryshopapi.payload.response.MemberVipResponse;
//import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
//import com.ptithcm.bakeryshopapi.repository.IMemberVipRepository;
//import com.ptithcm.bakeryshopapi.repository.IOrderDetailRepository;
//import com.ptithcm.bakeryshopapi.repository.IOrderRepository;
//import com.ptithcm.bakeryshopapi.repository.IUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.text.SimpleDateFormat;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.Optional;
//
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/order")
//public class OrderController {
//
//    @Autowired
//    private IOrderRepository orderRepository;
//
//    @Autowired
//    private IUserRepository userRepository;
//
//
//    @Autowired
//    private IOrderDetailRepository orderDetailRepository;
//
//    @Autowired
//    private IMemberVipRepository memberVipRepository;
//
////    @Autowired
////    private IShorterRepository shorterRepository;
////
////    @Autowired
////    private IGroupMemberRepository groupMemberRepository;
//
//
//    @GetMapping("/list")
//    public ResponseEntity<?> getOrders() {
//        return ResponseEntity.ok(orderRepository.findAll());
//    }
//
//
//    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER')")
//    public ResponseEntity<?> getOrder(@PathVariable long id) {
//        CartResponse cartResponse = new CartResponse();
//
//        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0, Sort.by(Sort.Direction.DESC, "id"));
//        if (order != null) {
//            int sum = 0;
//            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//                sum += orderDetailnew.getQuantity();
//            }
//
//            long total = 0;
//            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//            }
//
//            cartResponse.setTotalPrice(total);
//            cartResponse.setOrder(order);
//            cartResponse.setQuantity(sum);
//        }
//        return ResponseEntity.ok(cartResponse);
//    }
//
//    @GetMapping("/getOrder")
//    public ResponseEntity<?> getOrderChatBot(@RequestParam String orderId) {
//        Order order = null;
//        if(orderRepository.existsById(orderId)){
//            order = orderRepository.findById(orderId).get();
//        }
//        return ResponseEntity.ok(order);
//    }
//
//    @GetMapping("/getByOrderId")
//    public ResponseEntity<?> getOrderById(@RequestParam String orderId) {
//
//        CartResponse cartResponse = new CartResponse();
//
//        Order order = orderRepository.findOrderById(orderId);
//        if (order != null) {
//            int sum = 0;
//            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//                sum += orderDetailnew.getQuantity();
//            }
//
//            long total = 0;
//            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//            }
//
//            cartResponse.setTotalPrice(total);
//            cartResponse.setOrder(order);
//            cartResponse.setQuantity(sum);
//        }
//        return ResponseEntity.ok(cartResponse);
//    }
//
//    @PostMapping("")
//    @PreAuthorize("hasRole('USER')")
////    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER')")
////TODO
//    public ResponseEntity<?> addOrder(@RequestBody OrderRequest orderRequest) throws JsonProcessingException {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");
//
//        CartResponse cartResponse = new CartResponse();
//
//        long id = orderRequest.getUserId();
//
//        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0, Sort.by(Sort.Direction.DESC, "id"));
//
//        User user = userRepository.findById(id).get();
//        Product product = objectMapper.readValue(orderRequest.getProduct().toString(), Product.class);
//        String note = orderRequest.getNote();
//        String size = orderRequest.getSizeOption();
////        String add = orderRequest.getAdditionOption();
//        int quantity = orderRequest.getQuantity();
//        long currenPrice = orderRequest.getPriceCurrent();
//
//        // Kiểm tra oder
//        Order orderNew;
//        if (order != null) {
//            orderNew = order;
//        } else {
//            String orderId = "O" + formatter.format(new Date());
//            orderNew = new Order(orderId, null, null, 0, 0, null, 0, user, 0, 0);
//            orderNew.setCreatedAt(new Date());
//            orderNew.setUpdatedAt(new Date());
//            orderNew.setTeam(true);
//            orderRepository.save(orderNew);
//        }
//
//        //Tạo OrderDetail
//        //Check neu orderdetail co product, add, size giong nhau thi cong quantity
//
//        if (orderNew.getOrderDetails() != null) {
//
//            OrderDetail orderDetail = orderDetailRepository.findByOrderId_IdAndProduct_IdAndAndSizeOptionIdLike(orderNew.getId(), product.getId(), size);
//
//            if (orderDetail != null) {
//                orderDetail.setQuantity(orderDetail.getQuantity() + quantity);
//                orderDetail.setNoteProduct(note);
//                orderDetailRepository.save(orderDetail);
//                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
//                orderRepository.save(orderNew);
//
//                int sum = 0;
//                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
//                    sum += orderDetailnew.getQuantity();
//                }
//
//                long total = 0;
//                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
//                    total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//                }
//
//                cartResponse.setTotalPrice(total);
//                cartResponse.setOrder(orderNew);
//                cartResponse.setQuantity(sum);
//            } else {
//                OrderDetail orderDetailNew = new OrderDetail(size, quantity, currenPrice,
//                        note, orderNew, product);
//                orderDetailRepository.save(orderDetailNew);
//                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
//                orderRepository.save(orderNew);
//
//                int sum = 0;
//                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
//                    sum += orderDetailnew.getQuantity();
//                }
//
//                long total = 0;
//                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
//                    total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//                }
//
//                cartResponse.setTotalPrice(total);
//                cartResponse.setOrder(orderNew);
//                cartResponse.setQuantity(sum);
//            }
//            return ResponseEntity.ok(cartResponse);
//        } else {
//            OrderDetail orderDetailNew = new OrderDetail(size,  quantity, currenPrice,
//                    note, orderNew, product);
//            orderDetailRepository.save(orderDetailNew);
//
//            orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
//            orderRepository.save(orderNew);
//
//            int sum = 0;
//            for (OrderDetail orderDetail : orderNew.getOrderDetails()) {
//                sum += orderDetail.getQuantity();
//            }
//
//            long total = 0;
//            for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
//                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//            }
//
//            cartResponse.setTotalPrice(total);
//            cartResponse.setOrder(orderNew);
//            cartResponse.setQuantity(sum);
//            return ResponseEntity.ok(cartResponse);
//        }
//    }
//
//    @GetMapping("/listProcess")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> getListProcess(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "3") int pageSize,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "desc") String sortDir,
//            @RequestParam(defaultValue = "-1") long id
//    ) {
//
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
//        );
//
//        if (id == -1) {
//            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(1, 2), pageable);
//            return ResponseEntity.ok(orders);
//        }
//
//        Optional<User> user = userRepository.findById(id);
//
//        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(1, 2), pageable);
//
//        return ResponseEntity.ok(orders);
//    }
//
//    @GetMapping("/listSuccess")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> getListSuccess(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "3") int pageSize,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "desc") String sortDir,
//            @RequestParam(defaultValue = "-1") long id
//    ) {
//
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
//        );
//
//        if (id == -1) {
//            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(3), pageable);
//            return ResponseEntity.ok(orders);
//        }
//
//        Optional<User> user = userRepository.findById(id);
//
//        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(3), pageable);
//
//        return ResponseEntity.ok(orders);
//    }
//
//    @GetMapping("/listFail")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> getListFail(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "3") int pageSize,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "desc") String sortDir,
//            @RequestParam(defaultValue = "-1") long id
//    ) {
//
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
//        );
//
//        if (id == -1) {
//            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(4), pageable);
//            return ResponseEntity.ok(orders);
//        }
//
//        Optional<User> user = userRepository.findById(id);
//
//        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(4), pageable);
//
//        return ResponseEntity.ok(orders);
//
//    }
//
//    @PutMapping("")
//    //TODO @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> updateQuantity(
//            @RequestBody OrderQuantityRequest orderQuantityRequest
//    ) {
//        CartResponse cartResponse = new CartResponse();
//        OrderDetail orderDetail = orderDetailRepository.findById(orderQuantityRequest.getOrderDetailId()).get();
//        Order order = orderRepository.findById(orderDetail.getOrderId().getId()).get();
//
//        if (orderQuantityRequest.getAction().equals("plus")) {
//            orderDetail.setQuantity(orderDetail.getQuantity() + 1);
//            orderDetailRepository.save(orderDetail);
//        } else {
//            orderDetail.setQuantity(orderDetail.getQuantity() - 1);
//            orderDetailRepository.save(orderDetail);
//        }
//        order.setOrderDetails(orderDetailRepository.findByOrderId_Id(order.getId()));
//
//        int sum = 0;
//        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//            sum += orderDetailnew.getQuantity();
//        }
//
//        long total = 0;
//        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//        }
//
//        cartResponse.setTotalPrice(total);
//        cartResponse.setOrder(order);
//        cartResponse.setQuantity(sum);
//        return ResponseEntity.ok(cartResponse);
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> updateQuantity(@PathVariable long id) {
//        CartResponse cartResponse = new CartResponse();
//        OrderDetail orderDetail = orderDetailRepository.findById(id).get();
//        Order order = orderRepository.findById(orderDetail.getOrderId().getId()).get();
//
//        orderDetailRepository.delete(orderDetail);
//
//        order.setOrderDetails(orderDetailRepository.findByOrderId_Id(order.getId()));
//
//        int sum = 0;
//        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//            sum += orderDetailnew.getQuantity();
//        }
//
//        long total = 0;
//        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//        }
//
//        cartResponse.setTotalPrice(total);
//        cartResponse.setOrder(order);
//        cartResponse.setQuantity(sum);
//        return ResponseEntity.ok(cartResponse);
//    }
//
//    @PutMapping("/status")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> updateStatus(@RequestBody OrderStatusRequest orderStatusRequest) {
//
//        // Find user by username
//        Order order = orderRepository.findById(orderStatusRequest.getId()).get();
//
//        // Get status request
//        int status = orderStatusRequest.getStatus();
//
//        // Check status and process
//        order.setStatus(status);
//        order.setDeletedAt(new Date());
//        orderRepository.save(order);
//
//        // Find totalPrice
//        long total = 0;
//        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
//            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
//        }
//
//        //Update memberVip
//        if(status == 3) {
//            User user = userRepository.findById(order.getUserId().getId()).get();
//            MemberVip memberVip = user.getMemberVip();
//            if (memberVip == null) {
//                memberVip = new MemberVip(0, user);
//            }
//
//            memberVip.setMark(memberVip.getMark() + total/100);
//            memberVipRepository.save(memberVip);
//
//            user.setMemberVip(memberVip);
//            userRepository.save(user);
//        }
//
//        if(status == 4) {
//            User user = userRepository.findById(order.getUserId().getId()).get();
//            MemberVip memberVip = user.getMemberVip();
//            if (memberVip == null) {
//                memberVip = new MemberVip(0, user);
//            }
//
//            memberVip.setMark(memberVip.getMark() + order.getMemberVip());
//            memberVipRepository.save(memberVip);
//
//            user.setMemberVip(memberVip);
//            userRepository.save(user);
//        }
//
//        return ResponseEntity.ok(orderRepository.save(order));
//    }
//
//    @PutMapping("/checkout")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
//    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest checkoutRequest) {
//
//        if (!orderRepository.existsById(checkoutRequest.getOrderId())) {
//            return ResponseEntity.ok(new MessageResponse("Bad Request"));
//        }
//
//        //find order
//        Order order = orderRepository.findById(checkoutRequest.getOrderId()).get();
//
//        //get value
//        String address = checkoutRequest.getAddress();
//        String phone = checkoutRequest.getPhone();
//        int payment = "cod".equals(checkoutRequest.getPayment()) ? 1 : 2;
//        int shipping = checkoutRequest.getShipping();
//        String note = checkoutRequest.getNote();
//
//        //Update order
//        if(payment == 1){
//            order.setStatus(1);
//        }else {
//            order.setStatus(2);
//        }
//        order.setNotification(1);
//        order.setAddress(address);
//        order.setNoteOrder(note);
//        order.setPhone(phone);
//        order.setPayment(payment);
//        order.setTotalPrice(checkoutRequest.getTotalPrice());
//        order.setShipping(shipping);
//        order.setCreatedAt(new Date());
//        order.setMemberVip(checkoutRequest.getMemberVip());
//        orderRepository.save(order);
//
//        //Update memberVip
//        User user = userRepository.findById(order.getUserId().getId()).get();
//        MemberVip memberVip = user.getMemberVip();
//        if (memberVip == null) {
//            memberVip = new MemberVip(0, user);
//        }
//
//        if(payment == 2) {
//            memberVip.setMark(memberVip.getMark() + (checkoutRequest.getTotal() / 100) - checkoutRequest.getMemberVip());
//        }else{
//            memberVip.setMark(memberVip.getMark() - checkoutRequest.getMemberVip());
//        }
//
//        memberVipRepository.save(memberVip);
//
//        user.setMemberVip(memberVip);
//        userRepository.save(user);
//
//        MemberVipResponse memberVipResponse = new MemberVipResponse();
//        memberVipResponse.setUser(user);
//
//        // Delete long url
////        List<Shorter> shorters = shorterRepository.findAllByLongUrlLike("%" + checkoutRequest.getOrderId() + "%");
////        if(shorters.size() > 0) {
////            shorterRepository.delete(shorters.get(0));
////        }
////
////        // Delete member not group
////        if(!checkoutRequest.isTeam()) {
////            List<GroupMember> groupMembers = groupMemberRepository.findAllByOrder(order);
////            if(groupMembers.size() > 0) {
////                groupMemberRepository.deleteAll(groupMembers);
////            }
////        }
//
//
//        return ResponseEntity.ok(memberVipResponse);
//    }
//}


package com.ptithcm.bakeryshopapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.*;
import com.ptithcm.bakeryshopapi.payload.response.CartResponse;
import com.ptithcm.bakeryshopapi.payload.response.MemberVipResponse;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Autowired
    private IMemberVipRepository memberVipRepository;

    @Autowired
    private IProductDetailRepository productDetailRepository;

    @Autowired
    private IPromotionDetailRepository promotionDetailRepository;

    @Autowired
    private ICommentRepository commentRepository;
    @Autowired
    private INotificationRepository notificationRepository;
//    @Autowired
//    private IShorterRepository shorterRepository;
//
//    @Autowired
//    private IGroupMemberRepository groupMemberRepository;


    @GetMapping("/list")
    public ResponseEntity<?> getOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }


    @GetMapping("/feedback/{id}")
    public ResponseEntity<?> getRateOrder(@PathVariable String id) {
        List<Comment> comments = new ArrayList<>();
        Order order = orderRepository.findOrderById(id);
        if (order != null) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                comments.add(commentRepository.findCommentByOrderDetailId(orderDetail.getId()));
            }
        }
        return new ResponseEntity(comments, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER')")
    public ResponseEntity<?> getOrder(@PathVariable long id) {
        CartResponse cartResponse = new CartResponse();
        Date date = new Date();
        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0, Sort.by(Sort.Direction.DESC, "id"));
        if (order != null) {

            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
                ProductDetail productDetail = orderDetailnew.getProductDetail();
                List<PriceHistory> priceHistories = productDetail.getPriceHistories().stream()
                        .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed())
                        .collect(Collectors.toList());

                    List<PromotionDetail> promotionDetails = promotionDetailRepository.findByProduct_Id(productDetail.getProduct().getId())
                            .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                            .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                            .collect(Collectors.toList());
                if(promotionDetails.size()>0){

//                    orderDetailnew.setPriceCurrent(priceHistories.get(0).getPrice()*(1-promotionDetails.get(0).getDiscount()/100));
                    double discout = (double) promotionDetails.get(0).getDiscount()/100;
                    System.err.println(discout);
                    long priceNew = (long) (priceHistories.get(0).getPrice()* (1- discout));

                    orderDetailnew.setPriceCurrent(priceNew);

                }else{
                    orderDetailnew.setPriceCurrent(priceHistories.get(0).getPrice());

                }

            }

            int sum = 0;
            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
                sum += orderDetailnew.getQuantity();
            }

            long total = 0;
            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
            }


            cartResponse.setTotalPrice(total);
            cartResponse.setOrder(order);
            cartResponse.setQuantity(sum);
        }
        return ResponseEntity.ok(cartResponse);
    }

    @GetMapping("/getOrder")
    public ResponseEntity<?> getOrderChatBot(@RequestParam String orderId) {
        Order order = null;
        if (orderRepository.existsById(orderId)) {
            order = orderRepository.findById(orderId).get();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("/getByOrderId")
    public ResponseEntity<?> getOrderById(@RequestParam String orderId) {

        CartResponse cartResponse = new CartResponse();

        Order order = orderRepository.findOrderById(orderId);
        if (order != null) {
            int sum = 0;
            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
                sum += orderDetailnew.getQuantity();
            }

            long total = 0;
            for (OrderDetail orderDetailnew : order.getOrderDetails()) {
                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
            }

            cartResponse.setTotalPrice(total);
            cartResponse.setOrder(order);
            cartResponse.setQuantity(sum);
        }
        return ResponseEntity.ok(cartResponse);
    }

    @GetMapping("/getOrderByOrderId")
    public ResponseEntity<?> getOneOrderById(@RequestParam String orderId) {
        Order order = orderRepository.findOrderById(orderId);

        return ResponseEntity.ok(order);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER')")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER')")
//TODO
    public ResponseEntity<?> addOrder(@RequestBody OrderRequest orderRequest) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");

        CartResponse cartResponse = new CartResponse();

        long id = orderRequest.getUserId();

        Order order = orderRepository.findOrderByUserId_IdAndStatusLike(id, 0, Sort.by(Sort.Direction.DESC, "id"));

        User user = userRepository.findById(id).get();
//        Product product = objectMapper.readValue(orderRequest.getProduct().toString(), Product.class);
        Product product = null;
        String note = orderRequest.getNote();
        String size = orderRequest.getSizeOption();
//        String add = orderRequest.getAdditionOption();
        ProductDetail productDetail = productDetailRepository.findById(orderRequest.getProductDetailId()).get();
//        ProductDetail productDetail = productDetailRepository.findById(88l).get();
        int quantity = orderRequest.getQuantity();
        long currenPrice = orderRequest.getPriceCurrent();

        // Kiểm tra oder
        Order orderNew;
        if (order != null) {
            orderNew = order;
        } else {
            String orderId = "O" + formatter.format(new Date());
            orderNew = new Order(orderId, null, null, 0, 0, null, 0, user, 0, 0);
            orderNew.setCreatedAt(new Date());
            orderNew.setUpdatedAt(new Date());

            orderRepository.save(orderNew);
        }

        //Tạo OrderDetail
        //Check neu orderdetail co product, add, size giong nhau thi cong quantity

        if (orderNew.getOrderDetails() != null) {

            OrderDetail orderDetail = orderDetailRepository.findByOrderId_IdAndProductDetail_Id(orderNew.getId(), productDetail.getId());
//            OrderDetail orderDetail = orderDetailRepository.findByOrderId_IdAndProduct_IdAndAndSizeOptionIdLike(orderNew.getId(), product.getId(), size);
//            OrderDetail orderDetail = orderDetailRepository.findByOrderId_IdAndProduct_IdAndAndSizeOptionIdLike(orderNew.getId(), product.getId(), "Normal size");

            if (orderDetail != null) {
                orderDetail.setQuantity(orderDetail.getQuantity() + quantity);
                orderDetail.setNoteProduct(note);
                orderDetailRepository.save(orderDetail);
                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
                orderRepository.save(orderNew);

                int sum = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    sum += orderDetailnew.getQuantity();
                }

                long total = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
                }

                cartResponse.setTotalPrice(total);
                cartResponse.setOrder(orderNew);
                cartResponse.setQuantity(sum);
            } else {
//                OrderDetail orderDetailNew = new OrderDetail(size, quantity, currenPrice,
//                        note, orderNew, product,productDetail);
                OrderDetail orderDetailNew = new OrderDetail(size, quantity, currenPrice,
                        note, orderNew, productDetail);
                orderDetailRepository.save(orderDetailNew);
                orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
                orderRepository.save(orderNew);

                int sum = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    sum += orderDetailnew.getQuantity();
                }

                long total = 0;
                for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                    total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
                }

                cartResponse.setTotalPrice(total);
                cartResponse.setOrder(orderNew);
                cartResponse.setQuantity(sum);
            }
            return ResponseEntity.ok(cartResponse);
        } else {
//            OrderDetail orderDetailNew = new OrderDetail(size,  quantity, currenPrice,
//                    note, orderNew, product, productDetail);
            OrderDetail orderDetailNew = new OrderDetail(size, quantity, currenPrice,
                    note, orderNew, productDetail);
            orderDetailRepository.save(orderDetailNew);

            orderNew.setOrderDetails(orderDetailRepository.findByOrderId_Id(orderNew.getId()));
            orderRepository.save(orderNew);

            int sum = 0;
            for (OrderDetail orderDetail : orderNew.getOrderDetails()) {
                sum += orderDetail.getQuantity();
            }

            long total = 0;
            for (OrderDetail orderDetailnew : orderNew.getOrderDetails()) {
                total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
            }

            cartResponse.setTotalPrice(total);
            cartResponse.setOrder(orderNew);
            cartResponse.setQuantity(sum);
            return ResponseEntity.ok(cartResponse);
        }
    }

    @GetMapping("/listProcess")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListProcess(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "createdAt") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(1, 2, 5), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(1, 2, 5), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listProcessOfShipper")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListProcessOfShipper(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList( 2, 5),shipperId, pageable);
            return ResponseEntity.ok(orders);
        }
        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList( 2, 5), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(1, 2, 5), pageable);

        return ResponseEntity.ok(orders);
    }


    @GetMapping("/listSuccess")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListSuccess(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "createdAt") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(3), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(3), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listSuccessOfShipper")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('SHIPPER')")
    public ResponseEntity<?> getListSuccessOfShipper(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList(3),shipperId, pageable);
            return ResponseEntity.ok(orders);
        }
        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(3), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(3), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listProcess1")
    public ResponseEntity<?> getListProcess1(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList(2,5),shipperId, pageable);
            return ResponseEntity.ok(orders.getContent());
        }
        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(1, 2), pageable);
            return ResponseEntity.ok(orders.getContent());
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(1, 2), pageable);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/listSuccess1")
    public ResponseEntity<?> getListSuccess1(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList(3),shipperId, pageable);
            return ResponseEntity.ok(orders.getContent());
        }
        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(3), pageable);
            return ResponseEntity.ok(orders.getContent());
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(3), pageable);
        List<Order> orderList = orderRepository.findAll();
//        if(orders != null && orders.hasContent()) {
//
//        }
//        orderList = orders.getContent();
        return ResponseEntity.ok(orderList);
    }

    @GetMapping("/listFail")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListFail(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(4), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(4), pageable);

        return ResponseEntity.ok(orders);

    }

    @GetMapping("/listFailOfShipper")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('SHIPPER')")
    public ResponseEntity<?> getListFailOfShipper(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList(4),shipperId, pageable);
            return ResponseEntity.ok(orders);
        }
        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(4), pageable);
            return ResponseEntity.ok(orders);
        }

        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(4), pageable);

        return ResponseEntity.ok(orders);

    }

    @GetMapping("/listFail1")
    public ResponseEntity<?> getListFail1(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "-1") long id,
            @RequestParam(defaultValue = "-1") long shipperId
    ) {

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending()
        );

        if (id == -1) {
            Page<Order> orders = orderRepository.findAllByStatusIn(Arrays.asList(4), pageable);
            return ResponseEntity.ok(orders.getContent());
        }
        if (shipperId != -1) {
            Page<Order> orders = orderRepository.findAllByStatusInAndShipperId_Id(Arrays.asList(4),shipperId, pageable);
            return ResponseEntity.ok(orders.getContent());
        }
        Optional<User> user = userRepository.findById(id);

        Page<Order> orders = orderRepository.findAllByUserIdEqualsAndStatusIn(user, Arrays.asList(4), pageable);

        return ResponseEntity.ok(orders);

    }

    @PutMapping("")
    @Transactional
    //TODO @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> updateQuantity(
            @RequestBody OrderQuantityRequest orderQuantityRequest
    ) {
        CartResponse cartResponse = new CartResponse();
        OrderDetail orderDetail = orderDetailRepository.findOrderDetailById(orderQuantityRequest.getOrderDetailId());

//        OrderDetail orderDetail = orderDetailRepository.findOrderDetailById(12);
//        System.err.println(orderDetail.toString());
//        OrderDetail orderDetail = orderDetailRepository.findById(orderQuantityRequest.getOrderDetailId()).get();
        Order order = orderRepository.findById(orderDetail.getOrderId().getId()).get();
//        Order order = orderRepository.findOrderById(orderDetail.getOrderId().getId());


        if (orderQuantityRequest.getAction().equals("plus")) {
            orderDetail.setQuantity(orderDetail.getQuantity() + 1);
//            orderDetail.setQuantity(3);
            orderDetailRepository.save(orderDetail);
        } else {
            orderDetail.setQuantity(orderDetail.getQuantity() - 1);
            orderDetailRepository.save(orderDetail);
        }
        order.setOrderDetails(orderDetailRepository.findByOrderId_Id(order.getId()));

        int sum = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            sum += orderDetailnew.getQuantity();
        }

        long total = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
        }

        cartResponse.setTotalPrice(total);
        cartResponse.setOrder(order);
        cartResponse.setQuantity(sum);
        return ResponseEntity.ok(cartResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> updateQuantity(@PathVariable long id) {
        CartResponse cartResponse = new CartResponse();
        OrderDetail orderDetail = orderDetailRepository.findById(id).get();
        Order order = orderRepository.findById(orderDetail.getOrderId().getId()).get();

        orderDetailRepository.delete(orderDetail);

        order.setOrderDetails(orderDetailRepository.findByOrderId_Id(order.getId()));

        int sum = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            sum += orderDetailnew.getQuantity();
        }

        long total = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
        }

        cartResponse.setTotalPrice(total);
        cartResponse.setOrder(order);
        cartResponse.setQuantity(sum);
        return ResponseEntity.ok(cartResponse);
    }

    @PutMapping("/status")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> updateStatus(@RequestBody OrderStatusRequest orderStatusRequest) {

        // Find user by username
        Order order = orderRepository.findById(orderStatusRequest.getId()).get();

        // Get status request
        int status = orderStatusRequest.getStatus();

        // Check status and process
        order.setStatus(status);
        order.setDeletedAt(new Date());
        orderRepository.save(order);

        // Find totalPrice
        long total = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
        }

        //Update memberVip
        if (status == 3) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + total / 100);
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        if (status == 4) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + order.getMemberVip());
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/statusShipper")
    //TODO  @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> updateStatusAndShipper(@RequestBody OrderStatusAndShipperRequest orderStatusAndShipperRequest) {

        // Find user by username
//        Order order = orderRepository.findById(orderStatusAndShipperRequest.getId()).get();
        Order order = orderRepository.findOrderById(orderStatusAndShipperRequest.getId());

        // Get status request
        int status = orderStatusAndShipperRequest.getStatus();
        User shipper = userRepository.findUserById(orderStatusAndShipperRequest.getShipperId());
        User employee = userRepository.findUserById(orderStatusAndShipperRequest.getEmployeeId());
        // Check status and process
        order.setStatus(status);
        order.setDeletedAt(new Date());
        order.setShipperId(shipper);
        order.setEmployeeId(employee);
//        order.setShipperId();
        orderRepository.save(order);

        // Find totalPrice
        long total = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
        }

        //Update memberVip
        if (status == 3) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + total / 100);
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        if (status == 4) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + order.getMemberVip());
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/statusByShipper")
    public ResponseEntity<?> updateStatusByShipper(@RequestBody OrderStatusRequest orderStatusRequest) {

        // Find user by username
        Order order = orderRepository.findById(orderStatusRequest.getId()).get();

        // Get status request
        int status = orderStatusRequest.getStatus();

        // Check status and process
        order.setStatus(status);
        order.setDeletedAt(new Date());
        orderRepository.save(order);

        // Find totalPrice
        long total = 0;
        for (OrderDetail orderDetailnew : order.getOrderDetails()) {
            total += (orderDetailnew.getPriceCurrent() * orderDetailnew.getQuantity());
        }

        //Update memberVip
        if (status == 3) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + total / 100);
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        if (status == 4) {
            User user = userRepository.findById(order.getUserId().getId()).get();
            MemberVip memberVip = user.getMemberVip();
            if (memberVip == null) {
                memberVip = new MemberVip(0, user);
            }

            memberVip.setMark(memberVip.getMark() + order.getMemberVip());
            memberVipRepository.save(memberVip);

            user.setMemberVip(memberVip);
            userRepository.save(user);
        }

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/checkout")
    @Transactional
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SHIPPER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest checkoutRequest) {

        if (!orderRepository.existsById(checkoutRequest.getOrderId())) {
            return ResponseEntity.ok(new MessageResponse("Bad Request"));
        }

        //find order
        Order order = orderRepository.findById(checkoutRequest.getOrderId()).get();

        //update quantity
        Collection<OrderDetail> orderDetails = order.getOrderDetails();
        for(OrderDetail orderDetail : orderDetails){
            if(orderDetail.getProductDetail().getStock() < orderDetail.getQuantity()){
                return ResponseEntity.ok(new MessageResponse("Bad Request"));
            }else{
                ProductDetail productDetail = productDetailRepository.findById(orderDetail.getProductDetail().getId()).get();
                productDetail.setStock(productDetail.getStock()-orderDetail.getQuantity());
                productDetailRepository.save(productDetail);
            }
        }

        //get value
        String address = checkoutRequest.getAddress();
        String phone = checkoutRequest.getPhone();
        int payment = "cod".equals(checkoutRequest.getPayment()) ? 1 : 2;
        int shipping = checkoutRequest.getShipping();
        String note = checkoutRequest.getNote();

        //Update order
        if (payment == 1) {
            order.setStatus(1);
        } else {
            order.setStatus(2);
        }
        order.setNotification(1);
        order.setAddress(address);
        order.setNoteOrder(note);
        order.setPhone(phone);
        order.setPayment(payment);
        order.setTotalPrice(checkoutRequest.getTotalPrice());
        order.setShipping(shipping);
        order.setCreatedAt(new Date());
        order.setMemberVip(checkoutRequest.getMemberVip());
        orderRepository.save(order);
        Notification notification = new Notification();
        notification.setRead(false);
        notification.setDeliver(false);
        notification.setContent(String.format("Đơn hàng %s vừa được tạo, xác nhận ngay nào", order.getId()));
        notification.setOrder(order);
        notification.setType(1);
        notificationRepository.save(notification);
        //Update memberVip
        User user = userRepository.findById(order.getUserId().getId()).get();
        MemberVip memberVip = user.getMemberVip();
        if (memberVip == null) {
            memberVip = new MemberVip(0, user);
        }

        if (payment == 2) {
            memberVip.setMark(memberVip.getMark() + (checkoutRequest.getTotal() / 100) - checkoutRequest.getMemberVip());
        } else {
            memberVip.setMark(memberVip.getMark() - checkoutRequest.getMemberVip());
        }

        memberVipRepository.save(memberVip);

        user.setMemberVip(memberVip);
        userRepository.save(user);

        MemberVipResponse memberVipResponse = new MemberVipResponse();
        memberVipResponse.setUser(user);

        // Delete long url
//        List<Shorter> shorters = shorterRepository.findAllByLongUrlLike("%" + checkoutRequest.getOrderId() + "%");
//        if(shorters.size() > 0) {
//            shorterRepository.delete(shorters.get(0));
//        }
//
//        // Delete member not group
//        if(!checkoutRequest.isTeam()) {
//            List<GroupMember> groupMembers = groupMemberRepository.findAllByOrder(order);
//            if(groupMembers.size() > 0) {
//                groupMemberRepository.deleteAll(groupMembers);
//            }
//        }


        return ResponseEntity.ok(memberVipResponse);
    }
}
