package com.ptithcm.bakeryshopapi.service;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {
    private Cloudinary cloudinary;
    private String cloudName = "ptithcmn18dccn237";
    private String apiKey = "958866724455482";
    private String apiSecret = "EQ2Xj6-WW36bN8bKC1zD-CoQOnA";
    private Map<String, String> valuesMap;

    public CloudinaryService() {

        valuesMap = new HashMap<>();
        valuesMap.put("cloud_name", cloudName);
        valuesMap.put("api_key", apiKey);
        valuesMap.put("api_secret", apiSecret);
        cloudinary = new Cloudinary(valuesMap);
    }

    public Map upload(MultipartFile multipartFile, Map<String, String> options) throws IOException {
        File file = convert(multipartFile);

        Map result = cloudinary.uploader().upload(file, options);
        file.delete();
        return result;
    }

    public Map uploadFile(File file, Map<String, String> options) throws IOException {
        Map result = cloudinary.uploader().upload(file, options);
        file.delete();
        return result;
    }

    public Map delete(String id, Map<String, String> options) throws IOException {
        Map result = null;
        try {
            result = cloudinary.uploader().destroy(id, options);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }

}
