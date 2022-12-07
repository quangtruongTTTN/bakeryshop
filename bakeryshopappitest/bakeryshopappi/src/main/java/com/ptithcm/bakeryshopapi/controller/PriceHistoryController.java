package com.ptithcm.bakeryshopapi.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptithcm.bakeryshopapi.dto.ResponseMessage;
import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.PriceUpdatetRequest;
import com.ptithcm.bakeryshopapi.payload.request.ProducUpdatetRequest;

import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;

import com.ptithcm.bakeryshopapi.repository.*;
import com.ptithcm.bakeryshopapi.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/priceHistory")
public class PriceHistoryController {

    @Autowired
    private IPriceHistoryRepository priceHistoryRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IPromotionDetailRepository promotionDetailRepository;

    @Autowired
    private ISizeOptionRepository sizeOptionRepository;

    @Autowired
    private IProductDetailRepository productDetailRepository;

    @Autowired
    private IImageRepository imageRepository;


    private Map<String, String> options = new HashMap<>();

    @Value("${javadocfast.cloudinary.folder.image}")
    private String image;

    @Autowired
    private CloudinaryService cloudinaryService;


    @PostMapping("")
//   TODO @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @Transactional
    public ResponseEntity<?> updatePriceHistory(@RequestBody PriceUpdatetRequest priceUpdatetRequest) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        ProductDetail productDetail = productDetailRepository.findById(priceUpdatetRequest.getProductDetailId()).get();
        Collection<PriceHistory> priceHistories = productDetail.getPriceHistories();
        User user = userRepository.findUserById(priceUpdatetRequest.getEmployeeId());
//        priceHistories.add(;
//        priceHistoryRepository.save(new PriceHistory(priceUpdatetRequest.getPrice(), productDetail, user ));



        return new ResponseEntity(priceHistoryRepository.save(new PriceHistory(priceUpdatetRequest.getPrice(), productDetail, user )), HttpStatus.OK);
    }



}
