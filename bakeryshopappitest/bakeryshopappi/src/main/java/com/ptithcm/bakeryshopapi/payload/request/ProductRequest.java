package com.ptithcm.bakeryshopapi.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String name;
    private String title;
//    private long price;

    @JsonIgnoreProperties("products")
    private Object categoryId;
//    private List<Object> additionOptions;
    private List<Object> sizeOptions;
    private MultipartFile multipartFile;
//    private ProductDetailRequest[] productDetails;
    private List<Object> productDetails;
    private long employeeId;
    private MultipartFile[] catalogs;
//    private MultipartFile catalogs;
//    private FileInputStream catalogs1;
//    private MultipartFile catalogs2;
//    private List<MultipartFile> catalogs3;
//    private MultipartFile[] catalogs4;
//    private File catalogs5;

//    private String catalogs;

//    private MultipartFile catalogs;
//    private MultipartFile catalogs;
//    private List<String> catalogs2;
//    private String[] catalogs3;
//    private List<File> catalogs4;
//    private File catalogs5;
//    private MultipartFile catalogs;
//    private List<ProductDetailRequest> productDetails;
}
