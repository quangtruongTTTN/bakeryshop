package com.ptithcm.bakeryshopapi.controller;

import com.ptithcm.bakeryshopapi.entity.Comment;
import com.ptithcm.bakeryshopapi.entity.ProductDetail;
import com.ptithcm.bakeryshopapi.payload.request.CommentRequest;
import com.ptithcm.bakeryshopapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private ICommentRepository commentRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IProductDetailRepository productDetailRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getComments() {
        return ResponseEntity.ok(commentRepository.findAll());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getCommentsByProductId(@PathVariable String productId) {
        List<Comment> comments = new ArrayList<>();
        List<ProductDetail> productDetails = productDetailRepository.findByProductId_Id(productId);
        for(ProductDetail productDetail : productDetails){
            comments.addAll(commentRepository.findCommentByProductDetailId(productDetail.getId()));
        }

//        return ResponseEntity.ok(commentRepository.findCommentByProductId(productId));
        return ResponseEntity.ok(comments.stream()
                .sorted(Comparator.comparing(Comment::getTime).reversed()).collect(Collectors.toList()));
    }

//    @GetMapping("/page")
//    public ResponseEntity<?> getCommentsPageList(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "3") int pageSize,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "asc") String sortDir,
//            @RequestParam(defaultValue = "") String keyword
//    ) {
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
//        );
//
//        Page<Comment> categories = "".equals(keyword) ?
//                commentRepository.findAll(pageable) :
//                commentRepository.findCommentByNameLike("%" + keyword + "%", pageable);
//        return ResponseEntity.ok(categories);
//    }

    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody CommentRequest commentRequest) {
        Comment comment =  commentRepository.findCommentByOrderDetailId(commentRequest.getOrderDetailId());
        if(comment != null){
            comment.setContent(commentRequest.getContent());
            comment.setRate(commentRequest.getRate());

        }else{
            comment = new Comment();
            comment.setContent(commentRequest.getContent());
            comment.setProductDetailId(commentRequest.getProductDetailId());
            comment.setOrderDetailId(commentRequest.getOrderDetailId());
            comment.setActive(true);
            comment.setRate(commentRequest.getRate());
            comment.setAuthor(userRepository.findUserById(commentRequest.getUserId()));
        }

        return ResponseEntity.ok(commentRepository.save(comment));
    }

//    @PutMapping("/edit")
//    public ResponseEntity<?> editComment(@RequestBody Comment comment) {
//        if (commentRepository.existsById(comment.getId())) {
//            Comment commentUpdate = commentRepository.findById(comment.getId()).get();
//            commentUpdate.setName(comment.getName());
//            commentRepository.save(commentUpdate);
//            return ResponseEntity.ok(commentUpdate);
//        } else {
//            return ResponseEntity.badRequest().body(new MessageResponse("Comment is not exist..."));
//        }
//    }

//    @PutMapping("/delete/{id}")
//    public ResponseEntity<?> deleteCommentById(@PathVariable Long id) {
//        Comment comment = commentRepository.findById(id).get();
//        if (comment.getDeletedAt() == null) {
//            comment.setDeletedAt(new Date());
//        } else {
//            comment.setDeletedAt(null);
//        }
//        commentRepository.save(comment);
//        return new ResponseEntity(comment, HttpStatus.OK);
//    }


}
