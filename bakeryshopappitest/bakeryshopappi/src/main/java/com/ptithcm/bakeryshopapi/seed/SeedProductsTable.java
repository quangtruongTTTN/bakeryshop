package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.entity.*;
import com.ptithcm.bakeryshopapi.repository.*;
//import com.ptithcm.bakeryshopapi.entity.AdditionOption;
import com.ptithcm.bakeryshopapi.entity.Category;
import com.ptithcm.bakeryshopapi.entity.Product;
import com.ptithcm.bakeryshopapi.entity.SizeOption;
import com.ptithcm.bakeryshopapi.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class SeedProductsTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedProductsTable.class);

    private static IProductRepository productRepository;

    private static ICategoryRepository categoryRepository;

    private static ISizeOptionRepository sizeOptionRepository;

//    private static IAddOptionRepository addOptionRepository;

    private static ISaleOffRepository saleOffRepository;

    public SeedProductsTable(IProductRepository productRepository, ICategoryRepository categoryRepository, ISizeOptionRepository sizeOptionRepository,  ISaleOffRepository saleOffRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.sizeOptionRepository = sizeOptionRepository;
//        this.addOptionRepository = addOptionRepository;
        this.saleOffRepository = saleOffRepository;
    }


    public static void insertData() {
        long count = productRepository.count();

        if (count == 0) {
            // Insert Products
            // Insert Product1
            Category category01 = categoryRepository.findById(1L).get();
            Category category04 = categoryRepository.findById(4L).get();
            Category category05 = categoryRepository.findById(5L).get();
            Set<SizeOption> sizeOptions01 = new HashSet<>();
            SizeOption sizeOption01 = sizeOptionRepository.findById(1L).get();
            SizeOption sizeOption02 = sizeOptionRepository.findById(1L).get();
            SizeOption sizeOption04 = sizeOptionRepository.findById(4L).get();
            sizeOptions01.add(sizeOption01);
            sizeOptions01.add(sizeOption02);
            sizeOptions01.add(sizeOption04);
//            Set<AdditionOption> addOptions01 = new HashSet<>();
//            AdditionOption addOption01 = addOptionRepository.findById(1L).get();
//            AdditionOption addOption02 = addOptionRepository.findById(1L).get();
//            addOptions01.add(addOption01);
            Product product01 = new Product("P0882022035821","Bánh Flødebolle", "Bánh Flødebolle", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659794437/image/lhvbl129hhissbohv05v.jpg", "banh",
                     category04, sizeOptions01);

            // Insert Product2
            Product product02 = new Product("P0882022035822","Mizu shingen mochi", "Mizu shingen mochi", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659796097/image/am07pgr9jjyhauh7g0o1.jpg", "banh1",
                     category04, sizeOptions01);

            // Insert Product3
            Set<SizeOption> sizeOptions03 = new HashSet<>();
            SizeOption sizeOption03 = sizeOptionRepository.findById(3L).get();
            sizeOptions03.add(sizeOption01);
            sizeOptions03.add(sizeOption03);
            Product product03 = new Product("P0882022035823","Quindim- Brazil", "Quindim- Brazil", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659796439/image/khb2mpohaooxzn8ueac6.jpg", "image/khb2mpohaooxzn8ueac6",
                     category01, sizeOptions03);

//             Insert Product4
            Set<SizeOption> sizeOptions04 = new HashSet<>();
            sizeOptions04.add(sizeOption01);
            sizeOptions04.add(sizeOption03);
            Product product04 = new Product("P0882022035824","Bánh Lamingtons- Úc", "Bánh Lamingtons- Úc", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659796559/image/kwz0pijnjzptlq7d5916.jpg", "image/kwz0pijnjzptlq7d5916",
                     category01, sizeOptions04);

            // Insert Product5

            Product product05 = new Product("P0882022035825","Bánh Tiramisu- Ý", "Bánh Tiramisu- Ý", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659797317/image/afrgx8qcalbbaipc9h7r.jpg", "image/afrgx8qcalbbaipc9h7r",
                     category01, sizeOptions03);

            // Insert Product6
            Product product06 = new Product("P0882022035826","Bánh Apple Pie- Mỹ", "Bánh Apple Pie- Mỹ", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659797499/image/dsobxytg6w7fgbmjgm5x.jpg", "image/dsobxytg6w7fgbmjgm5x",
                     category01, sizeOptions03);

            // Insert Product7
            Product product07 = new Product("P0882022035827","Bánh Black Forest- Đức", "Bánh Black Forest- Đức", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659801340/image/egir9lshsfugy1dewdj9.jpg", "image/egir9lshsfugy1dewdj9",
                     category01, sizeOptions03);

            // Insert Product8
            Set<SizeOption> sizeOptions05 = new HashSet<>();
            sizeOptions05.add(sizeOption01);
            sizeOptions05.add(sizeOption02);


            Product product08 = new Product("P0882022035828","Bánh Yorkshire pudding- Anh Quốc", "Bánh Yorkshire pudding- Anh Quốc", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659803420/image/fkd1h5jjv5x6u9956xqk.jpg", "image/fkd1h5jjv5x6u9956xqk",
                     category05, sizeOptions05);

            //Insert Product 9
            Set<SizeOption> sizeOptions06 = new HashSet<>();
            sizeOptions06.add(sizeOption01);
            sizeOptions06.add(sizeOption02);
            sizeOptions06.add(sizeOption04);

            Product product09 = new Product("P0882022035829","Bánh Pastel de Nata- Bồ Đào Nha", "Bánh Pastel de Nata- Bồ Đào Nha", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659803318/image/clm0tjyvqqbk3xgn8id8.jpg", "image/clm0tjyvqqbk3xgn8id8",
                     category05, sizeOptions06);
            //Insert Product 10
            Category category02 = categoryRepository.findById(1L).get();
            Product product10 = new Product("P1482022025430", "Gyeongdan (Bánh gạo viên)- Hàn Quốc", "Gyeongdan (Bánh gạo viên)- Hàn Quốc", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463675/image/aqkegz2gohva1gvt3ueh.jpg", "image/aqkegz2gohva1gvt3ueh",
                     category02, null);

            Product product11 = new Product("P1482022025307", "Meat Pie- Úc", "Meat Pie- Úc", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463592/image/o6mipkmf1g3pfyfwzslq.jpg", "image/o6mipkmf1g3pfyfwzslq",
                     category02, null);

            Product product12 = new Product("P1482022025237", "Sakura Ukishima- Nhật Bản", "Sakura Ukishima- Nhật Bản", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463562/image/pnmobcuveuqfzxzevhwm.jpg", "image/pnmobcuveuqfzxzevhwm",
                     category02, null);

            //Insert snack04
            Product product13 = new Product("P1482022025114", "Rosca de Reyes- Tây Ban Nha", "Rosca de Reyes- Tây Ban Nha", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463479/image/nsddo8crpo2hhi5hvqum.jpg", "image/nsddo8crpo2hhi5hvqum",
                     category02, null);
            //===
            Product product14 = new Product("P1482022024951", "Dango- Nhật Bản", "Dango- Nhật Bản", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463396/image/mxf6xfuekdfsxs7g3opy.jpg", "image/mxf6xfuekdfsxs7g3opy",
                     category02, null);
            Product product15 = new Product("P1482022024917", " Bánh Carac- Thụy Sĩ", " Bánh Carac- Thụy Sĩ", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463362/image/eyodygnxsrpdghx5hfwf.jpg", "image/eyodygnxsrpdghx5hfwf",
                     category02, null);

            Product product16 = new Product("P1482022024825", "Bánh trifle- Anh Quốc ", "Bánh trifle- Anh Quốc ", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463310/image/lh7svi3tnanwrwvmbf1d.jpg", "image/lh7svi3tnanwrwvmbf1d",
                     category02, null);
            Product product17 = new Product("P1482022024738", "Bánh Matcha- Nhật Bản", "Bánh Matcha- Nhật Bản", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1660463264/image/vwvwr05c0atanwglohur.jpg", "image/vwvwr05c0atanwglohur",
                     category02, null);

            //Insert Product
            //Insert product01
            Category category03 = categoryRepository.findById(3L).get();
            Product pd01 = new Product("P0882022035834", "Nước ngọt 7 Up vị chanh lon 320ml", "Nước ngọt 7 Up vị chanh lon 320ml", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659813465/image/odpg7ymheyo98xjxvfug.jpg", "image/odpg7ymheyo98xjxvfug",
                     category03, null);

            //Insert product02
            Product pd02 = new Product("P0882022035834", "Nước tăng lực Redbull ", "Nước tăng lực Redbull ", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659813688/image/hkgztylhueeeaapsn9xa.jpg", "image/hkgztylhueeeaapsn9xa",
                     category03, null);

            //Insert product03
            Product pd03 = new Product("P0882022035835", "Nước bù khoáng Revive", "Nước bù khoáng Revive", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659813862/image/dk5zpbowyscshixwbnyl.jpg", "image/dk5zpbowyscshixwbnyl",
                     category03, null);

            //Insert product04
            Product pd04 = new Product("P0882022035836", "Nước ngọt Coca Cola lon 235ml", "Nước ngọt Coca Cola lon 235ml", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659814051/image/wt2g1qhslzvplsbcxr6a.jpg", "image/wt2g1qhslzvplsbcxr6a",
                     category03, null);

            //Insert product05
            Product pd05 = new Product("P0882022035837", "Nước trái cây Ice+ vị dâu 490ml", "Nước trái cây Ice+ vị dâu 490ml", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659813967/image/q2asyieeenmzuzqcke4p.jpg", "image/q2asyieeenmzuzqcke4p",
                     category03, null);

            //Insert product06
            Product pd06 = new Product("P0882022035838", "Nước ngọt Mirinda hương cam 320ml", "Nước ngọt Mirinda hương cam 320ml", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659814294/image/gqni06vmvda8gqijzveh.jpg", "image/gqni06vmvda8gqijzveh",
                     category03, null);

            //Insert product07
            Product pd07 = new Product("P0882022035838", "Nước tăng lực Wake Up 247 vị cà phê 330ml", "Nước tăng lực Wake Up 247 vị cà phê 330ml", "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659814215/image/gegs7dcf7rvr5q1bvlko.jpg", "image/gegs7dcf7rvr5q1bvlko",
                     category03, null);

            // Insert Data
            productRepository.saveAll(Arrays.asList(product01, product02, product03, product04, product05, product06, product07, product08, product09, product10, product11, product12, product13, pd01, pd02, pd03, pd04, pd05, pd06, pd07));
//            productRepository.saveAll(Arrays.asList(product01, product02, product03));
            LOGGER.info("Products Table Seeded.");
        } else {
            LOGGER.trace("Products Seeding Not Required.");
        }
    }
}
