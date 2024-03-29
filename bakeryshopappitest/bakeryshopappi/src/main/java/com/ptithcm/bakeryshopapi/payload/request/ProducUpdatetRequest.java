package com.ptithcm.bakeryshopapi.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProducUpdatetRequest {

    private String id;
    private String name;
    private String title;
//    private long price;

    @JsonIgnoreProperties("products")
    private Object categoryId;
//    private List<Object> additionOptions;
    private List<Object> sizeOptions;
    private Long[] removeImage;

    private MultipartFile multipartFile;
    private MultipartFile[] catalogs;

}
