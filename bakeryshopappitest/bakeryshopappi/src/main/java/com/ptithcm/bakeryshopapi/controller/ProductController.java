package com.ptithcm.bakeryshopapi.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptithcm.bakeryshopapi.dto.ResponseMessage;
import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.payload.request.*;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;

import com.ptithcm.bakeryshopapi.payload.response.ProductResponse;
import com.ptithcm.bakeryshopapi.repository.*;
import com.ptithcm.bakeryshopapi.service.CloudinaryService;

import com.ptithcm.bakeryshopapi.entity.Category;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.SizeOption;
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
import java.nio.file.Path;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

import static com.ptithcm.bakeryshopapi.utility.Utils.toPage;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IPromotionRepository promotionRepository;

    @Autowired
    private IPromotionDetailRepository promotionDetailRepository;

    @Autowired
    private ISizeOptionRepository sizeOptionRepository;

//    @Autowired
//    private IRateRepository rateRepository;

    @Autowired
    private IProductDetailRepository productDetailRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IImageRepository imageRepository;

    @Autowired
    private ICommentRepository commentRepository;

    @Autowired
    private IPriceHistoryRepository priceHistoryRepository;
    private Map<String, String> options = new HashMap<>();

    @Value("${javadocfast.cloudinary.folder.image}")
    private String image;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getProducts(
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

        Page<Product> products = "".equals(keyword) ?
                productRepository.findAll(pageable) :
                productRepository.findProductsByNameLike("%" + keyword + "%", pageable);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/listAll")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getListProducts() {
        List<Product> products = productRepository.findAll() ;
        return ResponseEntity.ok(products);
    }

    @GetMapping("/listRelate")
    //TODO @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getRelateProducts(@RequestParam(defaultValue = "1") long id) {
        List<Product> products = productRepository.findTop12ByCategoryId_Id(id)
                .stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                .collect(Collectors.toList());
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        Date date = new Date();
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                        .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }
        return ResponseEntity.ok(products);
    }

    //    @GetMapping("")
//    public ResponseEntity<?> getOneProducts(
//            @RequestParam(defaultValue = "") String id
//
//    ) {
//        Product product =  productRepository.findProductById(id);
//
//        return ResponseEntity.ok(product);
//    }
//    @PostMapping("/site/upload")
//    public ResponseEntity<ResponseMessage> uploadFiles(@RequestParam("file") MultipartFile file) {
////    public ResponseEntity<ResponseMessage> uploadFiles(@ModelAttribute MultipartFile[] files) {
//        String message = "";
//        try {
//            List<String> fileNames = new ArrayList<>();
//            for (MultipartFile file : files) {
////                Path p = this.root.resolve(file.getOriginalFilename());
//                Map<String, String> options = new HashMap<>();
//                options.put("folder", image);
//                Map result = cloudinaryService.upload(file, options);
//                String linkImg = result.get("url").toString();
//                String nameImg = result.get("public_id").toString();
//                System.err.println(linkImg);
//                System.err.println(nameImg);
//            }
//
//            Arrays.asList(files).stream().forEach(file -> {
////            storageService.save(file);
//                fileNames.add(file.getOriginalFilename());
//
//            });
//
//            message = "Uploaded the files successfully: " + fileNames;
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//        } catch (Exception e) {
//            message = "Fail to upload files!";
//            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//        }
//    }
    @PostMapping("/site/upload")
    public ResponseEntity<ResponseMessage> uploadFiles(@ModelAttribute MultipartFile file) {
        String message = "";
        try {
            Map<String, String> options = new HashMap<>();
            options.put("folder", image);
            Map result = cloudinaryService.upload(file, options);
            String linkImg = result.get("url").toString();
            String nameImg = result.get("public_id").toString();
            System.err.println(linkImg);
            System.err.println(nameImg);
//            Image image = new Image();
//            image.setName(nameImg);
//            image.setImageLink(linkImg);
//            Date date = new Date();
//            Timestamp timeNow = new Timestamp(date.getTime());
//            image.setCreateDate(timeNow);
//            image.setModifyDate(timeNow);
//            image.setIsActive(true);
//            image.setProduct(product);
//            imageRepository.save(image);
            message = "Uploaded the files successfully: " + nameImg;
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(e.getMessage()));
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @Transactional
    public ResponseEntity<?> addProduct(@ModelAttribute ProductRequest productRequest) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMyyyyhhmmss");

        MultipartFile multipartFile = productRequest.getMultipartFile();
        if (multipartFile != null) {
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if (bufferedImage == null) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Invalid image"));
            }
        }

        Map<String, String> options = new HashMap<>();
        options.put("folder", image);

        Map result = cloudinaryService.upload(multipartFile, options);
        String linkImg = result.get("url").toString();
        String nameImg = result.get("public_id").toString();
        String id = "P" + formatter.format(new Date());
        String name = productRequest.getName();
        String title = productRequest.getTitle();
//        Long price = productRequest.getPrice();
        Category category = objectMapper.readValue(productRequest.getCategoryId().toString(), Category.class);
        Set<SizeOption> sizeOptions = new HashSet<>();
        sizeOptions.add(sizeOptionRepository.findById(1L).get());

        if (productRequest.getSizeOptions() != null) {
            for (int i = 0; i < productRequest.getSizeOptions().size(); i++) {
                sizeOptions.add(objectMapper.readValue(productRequest.getSizeOptions().get(i).toString(), SizeOption.class));
            }
        }


        Product product = new Product(id, name, title, linkImg, nameImg,  category, sizeOptions, null);

        productRepository.save(product);

        MultipartFile[] catalogs = productRequest.getCatalogs();

        if (catalogs != null) {
            Image image = null;
            for(MultipartFile a : catalogs){
                Map result1 = cloudinaryService.upload(a, options);
                String linkImg1 = result1.get("url").toString();
                String nameImg1 = result1.get("public_id").toString();
                System.err.println(linkImg1);
                System.err.println(nameImg1);
                image = new Image();
                image.setName(nameImg1);
                image.setImageLink(linkImg1);
                Date date = new Date();
                Timestamp timeNow = new Timestamp(date.getTime());
//                image.setCreateDate(timeNow);
                image.setModifyDate(timeNow);
                image.setIsActive(true);
                image.setProduct(product);
//                image.setProduct(null);
                imageRepository.save(image);
            }
        }


        ProductDetailRequest[] productDetails = objectMapper.readValue(productRequest.getProductDetails().toString(), ProductDetailRequest[].class);
        List<ProductDetailRequest> productDetailRequests =
                Arrays.stream(productDetails)
                        .sorted(Comparator.comparing(ProductDetailRequest::getSizeid))
                        .collect(Collectors.toList());
//        List<ProductDetailRequest> productDetails = productRequest.getProductDetails();
//        List<ProductDetailRequest> productDetails = objectMapper.readValue(productRequest.getProductDetails() , ProductDetailRequest[].class);
//        List<ProductDetailRequest> productDetails = Arrays.asList(objectMapper.readValue((JsonParser) productRequest.getProductDetails(), ProductDetailRequest[].class));
//        if (productRequest.getProductDetails() != null) {
        if (productDetailRequests != null) {
//            for (int i = 0; i < productRequest.getProductDetails().size(); i++) {
            for (int i = 0; i < productDetailRequests.size(); i++) {
//            for (int i = 0; i <1; i++) {
//                ProductDetailRequest r = objectMapper.readValue(productRequest.getProductDetails().get(i).toString(), ProductDetailRequest.class);
                ProductDetail productDetail = new ProductDetail();

                productDetail.setStock(productDetailRequests.get(i).getStock());
//                productDetail.setProduct(product);
//                if(r.getSize_id() != 1 || r.getSize_id() != 2 ||r.getSize_id() != 3 || r.getSize_id() != 4 ){
//                    throw new RuntimeException("Goodbye cruel world");
//                }
                productDetail.setProduct(productRepository.findProductById(id));
                productDetail.setSizeOption(sizeOptionRepository.findSizeOptionById(productDetailRequests.get(i).getSizeid()));
//                productDetail.setSizeOption(sizeOptionRepository.findSizeOptionById(4));
                productDetailRepository.save(productDetail);
                PriceHistory priceHistory = new PriceHistory();

                priceHistory.setPrice(productDetailRequests.get(i).getPrice());
                priceHistory.setProductDetailId(productDetailRepository.findById(productDetail.getId()).get());
//                priceHistory.setEmployeeId(userRepository.findUserById(productRequest.getEmployeeId()));
                priceHistory.setEmployeeId(userRepository.findUserById(1));

                priceHistoryRepository.save(priceHistory);
            }
        } else {
            throw new RuntimeException("Goodbye cruel world");
        }
//        for(ProductDetailRequest r: productDetails){
//            ProductDetail productDetail = new ProductDetail();
//            productDetail.setPrice(r.getPrice());
//            productDetail.setStock(r.getStock());
//            productDetail.setProduct(product);
//            productDetail.setSizeOption(sizeOptionRepository.findById(r.getSize_id()).get());
//            productDetailRepository.save(productDetail);
//        }
//        if (productDetails!=null){
//
//        }


//        Set<AdditionOption> additionOptions = new HashSet<>();
//        if (productRequest.getAdditionOptions() != null) {
//            for (int i = 0; i < productRequest.getAdditionOptions().size(); i++) {
//                additionOptions.add(objectMapper.readValue(productRequest.getAdditionOptions().get(i).toString(), AdditionOption.class));
//            }
//        } else {
//            additionOptions = null;
//        }


        return new ResponseEntity(product, HttpStatus.OK);
    }

    @PutMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    @Transactional
    public ResponseEntity<?> updateProduct(@ModelAttribute ProducUpdatetRequest productRequest) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        String id = productRequest.getId();

        Product product = productRepository.findById(id).get();

        List<SizeOption> sizeOptions = new ArrayList<>();
        if (productRequest.getSizeOptions() != null) {
            for (int i = 0; i < productRequest.getSizeOptions().size(); i++) {
                sizeOptions.add(objectMapper.readValue(productRequest.getSizeOptions().get(i).toString(), SizeOption.class));
            }

            for (int i = 0; i < sizeOptions.size(); i++) {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setStock(0);
                productDetail.setProduct(productRepository.findProductById(id));
                productDetail.setSizeOption(sizeOptionRepository.findSizeOptionById(sizeOptions.get(i).getId()));
                productDetailRepository.save(productDetail);
                PriceHistory priceHistory = new PriceHistory();
                priceHistory.setPrice(0);
                priceHistory.setProductDetailId(productDetailRepository.findById(productDetail.getId()).get());
                priceHistory.setEmployeeId(userRepository.findUserById(1));
                priceHistoryRepository.save(priceHistory);
            }
//            if (!sizeOptions.contains(sizeOptionRepository.findById(1L).get())) {
//                sizeOptions.add(sizeOptionRepository.findById(1L).get());
//            }
        } else {
            sizeOptions = null;
//            throw new RuntimeException();
        }

        product.setName(productRequest.getName());
        product.setTitle(productRequest.getTitle());

//        product.setSizeOptions(sizeOptions);


        Category category = objectMapper.readValue(productRequest.getCategoryId().toString(), Category.class);
        product.setCategoryId(category);


        Map<String, String> options = new HashMap<>();
        options.put("folder", image);

        MultipartFile multipartFile = productRequest.getMultipartFile();
        if (multipartFile != null) {
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if (bufferedImage == null) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Invalid image"));
            }

            Map result = cloudinaryService.upload(multipartFile, options);

            if (multipartFile != null) {
                String linkImg = result.get("url").toString();
                String nameImg = result.get("public_id").toString();
                product.setLinkImage(linkImg);
                product.setNameImage(nameImg);
            }
        }
        MultipartFile[] catalogs = productRequest.getCatalogs();
//        List<Long>  removeImage = objectMapper.readValue(productRequest.getRemoveImage().toString(), Long.class);
//        Long[] removeImage = objectMapper.readValue(productRequest.getRemoveImage().toString(), Long[].class);
        Long[] removeImage = productRequest.getRemoveImage();
        if(removeImage!= null){
            List<Image> imageList = imageRepository.findAllByProduct_Id(product.getId());
            for(Image image1 : imageList){
                boolean test = Arrays.asList(removeImage).contains(image1.getId());
                if(test==false){
                    imageRepository.deleteById(image1.getId());
                }

            }
        }else{
            imageRepository.deleteAllByProduct_Id(product.getId());
        }

        if (catalogs != null) {
            Image image = null;
            for(MultipartFile a : catalogs){
                Map result1 = cloudinaryService.upload(a, options);
                String linkImg1 = result1.get("url").toString();
                String nameImg1 = result1.get("public_id").toString();
                System.err.println(linkImg1);
                System.err.println(nameImg1);
                image = new Image();
                image.setName(nameImg1);
                image.setImageLink(linkImg1);
                Date date = new Date();
                Timestamp timeNow = new Timestamp(date.getTime());
//                image.setCreateDate(timeNow);
                image.setModifyDate(timeNow);
                image.setIsActive(true);
                image.setProduct(product);
//                image.setProduct(null);
                imageRepository.save(image);
            }
        }
        productRepository.save(product);

        return new ResponseEntity(product, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> deleteProductById(@PathVariable String id) {
        Product product = productRepository.findById(id).get();
        if (product.getDeletedAt() == null) {
            product.setDeletedAt(new Date());
        } else {
            product.setDeletedAt(null);
        }
        productRepository.save(product);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @PutMapping("/updateView/{id}")
    public ResponseEntity<?> updateViewProductById(@PathVariable String id) {
        Product product = productRepository.findById(id).get();
        product.setViewNumber(product.getViewNumber()+1);
        productRepository.save(product);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneProducts(@PathVariable String id) {
//        ProductDetailResponse productDetailResponse = new ProductDetailResponse();

        Product product = productRepository.findProductById(id);
        ArrayList<Long> rate = new ArrayList<>();

        List<ProductDetail> productDetails1 = productDetailRepository.findByProductId_Id(id);
        long rate0=0, rate1=0,rate2=0,rate3=0,rate4=0;
        for(ProductDetail productDetail : productDetails1){
            rate0 += commentRepository.countAllByProductDetailIdAndRate(productDetail.getId(),0);
            rate1 += commentRepository.countAllByProductDetailIdAndRate(productDetail.getId(),1);
            rate2 += commentRepository.countAllByProductDetailIdAndRate(productDetail.getId(),2);
            rate3 += commentRepository.countAllByProductDetailIdAndRate(productDetail.getId(),3);
            rate4 += commentRepository.countAllByProductDetailIdAndRate(productDetail.getId(),4);
        }
        rate.add(rate0);
        rate.add(rate1);
        rate.add(rate2);
        rate.add(rate3);
        rate.add(rate4);
        if(product==null){
            System.err.println(id);
            return new ResponseEntity(null, HttpStatus.OK);
        }
        if(product.getPromotionDetails()==null){
            System.err.println(id);
            return new ResponseEntity(null, HttpStatus.OK);
        }
        Date date = new Date();
        List<PromotionDetail> promotionDetails = product.getPromotionDetails()
                .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                .collect(Collectors.toList());
        product.setPromotionDetails(promotionDetails);
//        Collection<ProductDetail> productDetails = product.getProductDetails();
        Collection<ProductDetail> productDetails = product.getProductDetails()
                .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
        for(ProductDetail pd : productDetails){
            if (pd.getPriceHistories() != null) {
                List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                        .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                        .collect(Collectors.toList());
                pd.setPriceHistories(priceHistories);
            }
        }
        product.setProductDetails(productDetails);
        product.setRate(rate);
        return new ResponseEntity(product, HttpStatus.OK);
    }

    //    @GetMapping("")
//    public ResponseEntity<?> getProducts(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "12") int pageSize,
//            @RequestParam(defaultValue = "") String cateName,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "asc") String sortDir,
//            @RequestParam(defaultValue = "") String keyword
//    ) {
//
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
//        );
//
//        Page<Product> products = "".equals(keyword) ?
//                productRepository.findAll(pageable) :
//                productRepository.findProductsByNameLike("%" + keyword + "%", pageable);
//
//        return ResponseEntity.ok(products);
//    }
//    @GetMapping("")
//    public ResponseEntity<?> getProducts(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "12") int pageSize,
//            @RequestParam(defaultValue = "") String cateName,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "asc") String sortDir,
//            @RequestParam(defaultValue = "") String keyword
//    ) {
//        ProductResponse productResponse = new ProductResponse();
//        List<Product> products;
//        List<Product> productNew = productRepository.findProductsByCategoryId_NameNotLike( "Product", Sort.by(Sort.Direction.DESC, "id"));
//        productNew.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//
//        if ("".equals(cateName)) {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_NameNotLike("Snack", "Product", Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_NameNotLikeAndCategoryId_NameNotLike("Snack", "Product", Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//        } else {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//        }
//
//        String newProductId = productNew.size() > 0 ? productNew.get(0).getId() : "";
//
//        if (!"".equals(keyword)) {
//            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
//        }
//
//        productResponse.setProduct(products);
//        productResponse.setNewProductId(newProductId);
//
//        return ResponseEntity.ok(productResponse);
//    }
//    public List<Product> convertToProductApi(List<Product> products){}
    @GetMapping("")
    public ResponseEntity<?> getProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int pageSize,
            @RequestParam(defaultValue = "") String cateName,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {

        Date date = new Date();
        Timestamp timeNow = new Timestamp(date.getTime());

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );
        long totalPages = 1;
        ProductResponse productResponse = new ProductResponse();
        List<Product> products;
        List<Product> productsTemp;
//        List<Product> productNew = productRepository.findProductsByCategoryId_NameNotLike("Product", Sort.by(Sort.Direction.DESC, "createdAt"));
        List<Product> productNew =
                productRepository.findProductsByCategoryId_NameNotLike("Product")
                        .stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                        .collect(Collectors.toList());
        if ("".equals(keyword)) {

            if ("".equals(cateName)) {
                productsTemp = productRepository.findProductsByCategoryId_NameNotLike("Product");
//                productsTemp = productRepository.findProductsByCategoryId_NameNotLike("Product", pageable);
           } else {
                productsTemp = productRepository.findProductsByCategoryId_Name(cateName);
//                productsTemp = productRepository.findProductsByCategoryId_Name(cateName,  pageable);
            }

        } else {
            if ("".equals(cateName)) {
//            products = productRepository.findProductsByCategoryId_NameNotLike("Product", pageable).getContent();
//            productsTemp = productRepository.findProductsByCategoryId_NameNotLike("Product", pageable);
                productsTemp = productRepository.findProductsByCategoryId_NameNotLikeAndNameContaining("Product",  keyword);
//                productsTemp = productRepository.findProductsByCategoryId_NameNotLikeAndNameContaining("Product", pageable, keyword);
//
            } else {

              productsTemp = productRepository.findProductsByCategoryId_NameAndNameContaining(cateName,  keyword);
//              productsTemp = productRepository.findProductsByCategoryId_NameAndNameContaining(cateName, pageable, keyword);

            }

        }
        products = productsTemp;
//        totalPages = productsTemp.getTotalPages();
        products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
        String newProductId = productNew.size() > 0 ? productNew.get(0).getId() : "";
//        if (!"".equals(keyword)){
////            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
//            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
//        }
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        products = products.stream().filter(p -> p.getProductDetails().size()> 0 ).collect(Collectors.toList());
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                        .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
//                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
//                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
//                            .collect(Collectors.toList());
//                    pd.setPriceHistories(priceHistories);
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
//                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }

        productResponse.setProduct(products);
        productResponse.setNewProductId(newProductId);
//        productResponse.setTotalPages(products.size()/8);
        productResponse.setTotalPages(totalPages);
//        productResponse.setNewProductId("");
        Optional<PromotionDetail> optionalPromotionDetail = Optional.of(new PromotionDetail(0));
        PromotionDetail promotionDetail =new  PromotionDetail(0);
        if(sortDir.equals("asc") && sortField.equals("price")){
            products=products.stream()
                    .sorted(Comparator
                            .comparing((Product p) ->
                                 p.getProductDetails().stream().findFirst().get().getPriceHistories().stream().findFirst().get().getPrice() * (1 - p.getPromotionDetails().stream().map(Optional::ofNullable).findFirst().orElse(Optional.of(new PromotionDetail((0)))).get().getDiscount() / 100.000))
                            .reversed())
//                            .comparing((Product p) -> p.getProductDetails().stream().findFirst().get().getPriceHistories().stream().findFirst().get().getPrice()).reversed())
//                            .comparing((Product p) -> p.getPromotionDetails().stream().sorted(Comparator.comparing(PromotionDetail::getDiscount)).findFirst().get().getDiscount()))
                    .collect(Collectors.toList());
        }
        else if(sortDir.equals("desc") && sortField.equals("price")){
            products=products.stream()
                    .sorted(Comparator
                            .comparing((Product p) ->
                                    (double)  p.getProductDetails().stream().findFirst().get().getPriceHistories().stream().findFirst().get().getPrice() * (1 - (double)p.getPromotionDetails().stream().map(Optional::ofNullable).findFirst().orElse(Optional.of(new PromotionDetail((0)))).get().getDiscount() / 100.000))
                            )
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(toPage(products,pageable));
    }

//    @GetMapping("")
//    public ResponseEntity<?> getProducts(
//            @RequestParam(defaultValue = "") String cateName,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "desc") String sortDir,
//            @RequestParam(defaultValue = "") String keyword
//    ) {
//        ProductResponse productResponse = new ProductResponse();
//        List<Product> products;
//        List<Product> productNew = productRepository.findProductsByCategoryId_NameNotLikeAndCategoryId_NameNotLike("Snack", "Product", Sort.by(Sort.Direction.DESC, "id"));
//        productNew.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//
//        if ("".equals(cateName)) {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_NameNotLikeAndCategoryId_NameNotLike("Snack", "Product", Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_NameNotLikeAndCategoryId_NameNotLike("Snack", "Product", Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//        } else {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
//        }
//
//        String newProductId = productNew.size() > 0 ? productNew.get(0).getId() : "";
//
//        if (!"".equals(keyword)){
//            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
//        }
//
//        productResponse.setProduct(products);
//        productResponse.setNewProductId(newProductId);
//
//        return ResponseEntity.ok(productResponse);
//    }

    @GetMapping("/hot")
    public ResponseEntity<?> getHotProducts(
            @RequestParam(defaultValue = "") String cateName,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {
        ProductResponse productResponse = new ProductResponse();
        List<Product> products = new ArrayList<>();
        List<String> stringsId;
//        List<Product> productNew = productRepository.findProductsByCategoryId_NameNotLike("Product", Sort.by(Sort.Direction.DESC, "id"));
        List<Product> productNew =
                productRepository.findProductsByCategoryId_NameNotLike("Product")
                        .stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                        .sorted(Comparator.comparing(Product::getCreatedAt))
                        .collect(Collectors.toList());

        if ("".equals(cateName)) {
            stringsId = productRepository.getHotProduct("Snack", "Product");
            for (int i = 0; i < 8 && i < stringsId.size(); i++) {
                products.add(productRepository.findProductById(stringsId.get(i)));
            }
            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
        } else {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
        }

        String newProductId = productNew.size() > 0 ? productNew.get(0).getId() : "";

        if (!"".equals(keyword)) {
            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
        }
        for (Product p : products) {
            if (p.getProductDetails() != null) {
                Collection<ProductDetail> productDetails = p.getProductDetails()
                        .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                p.setProductDetails(productDetails);
            }
        }
        Date date = new Date();
        for (Product p : products) {
            if (p.getPromotionDetails() != null) {
                List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                        .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                        // .sorted((Comparator.comparing(x  -> x.getDiscount())).reversed())
                        .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                        .collect(Collectors.toList());
                p.setPromotionDetails(promotionDetails);
            }
        }
        for (Product p : products) {
            Collection<ProductDetail> productDetails = p.getProductDetails();
            for(ProductDetail pd : productDetails){
                if (pd.getPriceHistories() != null) {
                    List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                            .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                            .collect(Collectors.toList());
                    pd.setPriceHistories(priceHistories);
                }
            }
            p.setProductDetails(productDetails);

        }
        productResponse.setProduct(products);
        productResponse.setNewProductId(newProductId);

        return ResponseEntity.ok(productResponse);
    }


    @GetMapping("/favorite")
    public ResponseEntity<?> getFavoriteProducts(
            @RequestParam(defaultValue = "") String cateName,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {
        ProductResponse productResponse = new ProductResponse();
        List<Product> products = new ArrayList<>();
        List<String> stringsId;
//        List<Product> productNew = productRepository.findProductsByCategoryId_NameNotLike("Product", Sort.by(Sort.Direction.DESC, "id"));
        List<Product> productNew =
                productRepository.findProductsByCategoryId_NameNotLike("Product")
                .stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                        .sorted(Comparator.comparing(Product::getCreatedAt))
                        .collect(Collectors.toList());

        if ("".equals(cateName)) {
            stringsId = productRepository.getFavoriteProduct("Snack", "Product");
            for (int i = 0; i < 8 && i < stringsId.size(); i++) {
                products.add(productRepository.findProductById(stringsId.get(i)));
            }
            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
            for (Product p : products) {
                if (p.getProductDetails() != null) {
                    Collection<ProductDetail> productDetails = p.getProductDetails()
                            .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                    p.setProductDetails(productDetails);
                }
            }
            Date date = new Date();
            for (Product p : products) {
                if (p.getPromotionDetails() != null) {
                    List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                            .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                            // .sorted((Comparator.comparing(x  -> x.getDiscount())).reversed())
                            .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                            .collect(Collectors.toList());
                    p.setPromotionDetails(promotionDetails);
                }
            }
            for (Product p : products) {
                Collection<ProductDetail> productDetails = p.getProductDetails();
                for(ProductDetail pd : productDetails){
                    if (pd.getPriceHistories() != null) {
                        List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                                .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                                .collect(Collectors.toList());
                        pd.setPriceHistories(priceHistories);
                    }
                }
                p.setProductDetails(productDetails);

            }
        } else {
//            products = !"asc".equals(sortDir) ? productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.DESC, sortField)) : productRepository.findProductsByCategoryId_Name(cateName, Sort.by(Sort.Direction.ASC, sortField));
//            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null).collect(Collectors.toList());
        }

        String newProductId = productNew.size() > 0 ? productNew.get(0).getId() : "";

        if (!"".equals(keyword)) {
            products = products.stream().filter((item) -> (item.getName().toLowerCase().contains(keyword.toLowerCase())) || item.getTitle().toLowerCase().contains(keyword.toLowerCase())).collect(Collectors.toList());
        }

        productResponse.setProduct(products);
        productResponse.setNewProductId(newProductId);

        return ResponseEntity.ok(productResponse);
    }


    @GetMapping("/view")
    public ResponseEntity<?> getTopViewProducts(
            @RequestParam(defaultValue = "") String cateName,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {

        List<Product> products = productRepository.findAll();


        if ("".equals(cateName)) {


            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                    .sorted(Comparator.comparing(Product::getViewNumber).reversed()).limit(8)
                    .collect(Collectors.toList());
            for (Product p : products) {
                if (p.getProductDetails() != null) {
                    Collection<ProductDetail> productDetails = p.getProductDetails()
                            .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                    p.setProductDetails(productDetails);
                }
            }
            Date date = new Date();
            for (Product p : products) {
                if (p.getPromotionDetails() != null) {
                    List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                            .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                            .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                            .collect(Collectors.toList());
                    p.setPromotionDetails(promotionDetails);
                }
            }
            for (Product p : products) {
                Collection<ProductDetail> productDetails = p.getProductDetails();
                for(ProductDetail pd : productDetails){
                    if (pd.getPriceHistories() != null) {
                        List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                                .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                                .collect(Collectors.toList());
                        pd.setPriceHistories(priceHistories);
                    }
                }
                p.setProductDetails(productDetails);

            }
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/new")
    public ResponseEntity<?> getNewProducts(
            @RequestParam(defaultValue = "") String cateName,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "") String keyword
    ) {

        List<Product> products = productRepository.findAll();


        if ("".equals(cateName)) {


            products = products.stream().filter(p -> p.getCategoryId().getDeletedAt() == null && p.getDeletedAt() == null)
                    .sorted(Comparator.comparing(Product::getCreatedAt).reversed()).limit(8)
                    .collect(Collectors.toList());
            for (Product p : products) {
                if (p.getProductDetails() != null) {
                    Collection<ProductDetail> productDetails = p.getProductDetails()
                            .stream().filter(pd -> pd.getDeletedAt() == null).collect(Collectors.toList());
                    p.setProductDetails(productDetails);
                }
            }
            Date date = new Date();
            for (Product p : products) {
                if (p.getPromotionDetails() != null) {
                    List<PromotionDetail> promotionDetails = p.getPromotionDetails()
                            .stream().filter(s -> s.getPromotion().getEndDate().after(date) && s.getPromotion().getStartDate().before(date))
                            // .sorted((Comparator.comparing(x  -> x.getDiscount())).reversed())
                            .sorted(Comparator.comparing(PromotionDetail::getDiscount).reversed())
                            .collect(Collectors.toList());
                    p.setPromotionDetails(promotionDetails);
                }
            }
            for (Product p : products) {
                Collection<ProductDetail> productDetails = p.getProductDetails();
                for(ProductDetail pd : productDetails){
                    if (pd.getPriceHistories() != null) {
                        List<PriceHistory> priceHistories = pd.getPriceHistories().stream()
                                .sorted(Comparator.comparing(PriceHistory::getCreatedAt).reversed()).limit(1)
                                .collect(Collectors.toList());
                        pd.setPriceHistories(priceHistories);
                    }
                }
                p.setProductDetails(productDetails);

            }
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/showAll")
    public ResponseEntity<?> showAll() {
        return ResponseEntity.ok(productRepository.findAll());
    }

//    @GetMapping("/saleoff")
//    public ResponseEntity<?> getProductsBySaleOff(
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "3") int pageSize,
//            @RequestParam(defaultValue = "id") String sortField,
//            @RequestParam(defaultValue = "asc") String sortDir,
//            @RequestParam(defaultValue = "") String keyword,
//            @RequestParam(defaultValue = "") Double discount,
//            @RequestParam(defaultValue = "list") String saleOff  // list: show product saleOff !== null, add: === null
//    ) {
//        Date date = new Date();
//        Timestamp timeNow = new Timestamp(date.getTime());
//
//        Pageable pageable = PageRequest.of(
//                page - 1, pageSize,
//                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
//        );
//
//        Page<Product> products = productRepository.findAll(pageable);
//        List<Product> pd = new ArrayList<>();
//        if ("list".equals(saleOff)) {
//            products = discount == 0 ?
//                    productRepository.findDistinctProductBySaleOff_EndDateGreaterThan(timeNow, pageable) :
//                    productRepository.findProductBySaleOffDiscountLike(discount, pageable);
//
////            pd =
////                    productRepository.findProductBySaleOff_EndDateGreaterThan(timeNow, pageable).getContent();
//        } else {
//            products =
//                    "".equals(keyword) ?
//                            productRepository.findProductBySaleOffNull(pageable) :
//                            productRepository.findProductsByNameLike("%" + keyword + "%", pageable);
//        }
//
//        return ResponseEntity.ok(products);
////        return ResponseEntity.ok(pd);
//    }


    @GetMapping("/promotiondetail")
    public ResponseEntity<?> getProductsByPromotionDetail(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int discount,
            @RequestParam(defaultValue = "1") long promotionId,
            @RequestParam(defaultValue = "list") String promotionDetail  // list: show product saleOff !== null, add: === null
    ) {
        Date date = new Date();
        Timestamp timeNow = new Timestamp(date.getTime());

        Pageable pageable = PageRequest.of(
                page - 1, pageSize,
                "asc".equals(sortDir) ? Sort.by(sortField).descending() : Sort.by(sortField).ascending()
        );

//        Page<ProductTest> products = productRepository.findProductsByPromotion(promotionId, pageable) ;
        List<Product> products = new ArrayList<>();
//        Page<Product> products = productRepository.findAll(pageable) ;
//        Promotion promotion = promotionRepository.findById(5l).get();
//        List<PromotionDetail> promotionDetail = promotionDetailRepository.findByPromotion_Id(1l);
        List<Product> filterP = productRepository.findDistinctByPromotionDetails_Promotion_Id(promotionId);
        if ("list".equals(promotionDetail)) {
            products = discount == 0 ?
                    filterP :
                    productRepository.findProductByPromotionDetailsDiscountLike(discount);
//            products = discount == 0 ?
//                    productRepository.findDistinctProductBySaleOff_EndDateGreaterThan(timeNow, pageable) :
//                    productRepository.findProductBySaleOffDiscountLike(discount, pageable);
        } else {

//            products = productRepository.findAll();
            products =
                    "".equals(keyword) ?
                            productRepository.findAll()
                                    .stream()
                                    .filter(e -> filterP.stream().map(Product::getId).noneMatch(id -> id.equals(e.getId())))
                                    .collect(Collectors.toList())

                            :
                            productRepository.findProductsByNameLike("%" + keyword + "%")
                                    .stream()
                                    .filter(e -> filterP.stream().map(Product::getId).noneMatch(id -> id.equals(e.getId())))
                                    .collect(Collectors.toList());
            return ResponseEntity.ok(products);
        }

        return ResponseEntity.ok(toPage(products,pageable));

    }
}
