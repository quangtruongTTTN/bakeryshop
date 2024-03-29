package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.config.ERole;
import com.ptithcm.bakeryshopapi.entity.Role;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.repository.IRoleRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class SeedUsersTable {

    private static final Logger LOGGER = LoggerFactory.getLogger(SeedUsersTable.class);

    private static IUserRepository userRepository;
    private static IRoleRepository roleRepository;

    public SeedUsersTable(IUserRepository userRepository, IRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public static void insertData() throws ParseException {
        long count = userRepository.count();
        if(count == 0) {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

            // Insert User 01
            Set<Role> roles01 = new HashSet<>();
            Role roleAdmin01 = roleRepository.findByName(ERole.ROLE_ADMIN).get();
            Role roleUser01 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles01.add(roleAdmin01);
            roles01.add(roleUser01);
            User user01 = new User("admin", "Quản Trị Viên", format.parse("1995-10-29"),
                     "TP. Hồ Chí Minh", "0901858004", null, null,
                    "admin@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles01);

            // Insert User 02
            Set<Role> roles02 = new HashSet<>();
            Role roleUser02 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles02.add(roleUser02);
            User user02 = new User("quangtruong1", "Quang Trường", null,
                    "TP. Hồ Chí Minh", "0551770549",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "avatar/aq3s7uz9guufeip6mbi2", "thienthien20221@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles02);

            // Insert User 03
            Set<Role> roles03 = new HashSet<>();
            Role roleUser03 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles03.add(roleUser03);
            User user03 = new User("truongnguyen", "Trường Nguyễn", null,
                    "TP. Hồ Chí Minh", "02310114225",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "avatar/zjbljpa4ah0xrfpq23xg", "thienthien20225@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles03);

            // Insert User 04
            Set<Role> roles04 = new HashSet<>();
            Role roleUser04 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles04.add(roleUser04);
            User user04 = new User("thanhtung", "Thanh Tùng", null,
                    "TP. Hồ Chí Minh", "0589224494",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "avatar/gzigbjeriaquepwqenrb", "thanhtung@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles04);

            // Insert User 05
            Set<Role> roles05 = new HashSet<>();
            Role roleUser05 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles05.add(roleUser05);
            User user05 = new User("hungquang", "Hưng Quang", null,
                    "48, Ấp Hiền Đôn, Xã 8, Huyện Băng Chiêm Thái Nguyên", "0549445733",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "hung-quang_di964h", "ukhuat@tu.edu.vn",
                    new BCryptPasswordEncoder().encode("123456"), roles05);

            // Insert User 06
            Set<Role> roles06 = new HashSet<>();
            Role roleUser06 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles06.add(roleUser06);
            User user06 = new User("duchien", "Đức Chiến", null,
                    "85, Thôn 19, Xã 0, Huyện 62 Quảng Ninh", "0768168882",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "duc-chien_awzlp3", "tuyen.chuong@yahoo.com",
                    new BCryptPasswordEncoder().encode("123456"), roles06);

            // Insert User 07
            Set<Role> roles07 = new HashSet<>();
            Role roleUser07 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles07.add(roleUser07);
            User user07 = new User("giangdang", "Giang Đặng", null,
                    "22, Ấp 17, Thôn Tống Tuyền, Quận Cẩn Loan Phú Yên", "0560277318",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "giang-dang_v4qz28", "dien76@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles07);

            // Insert User 08
            Set<Role> roles08 = new HashSet<>();
            Role roleUser08 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles08.add(roleUser08);
            User user08 = new User("kieuvu", "Kiều Vũ", null,
                    "18, Thôn Thảo, Xã Đình Trình, Quận Đới Ngôn Chinh Bình Phước", "0765386662",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "kieu-vu_ytgvhz", "tho.giap@gmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles08);

            // Insert User 09
            Set<Role> roles09 = new HashSet<>();
            Role roleUser09 = roleRepository.findByName(ERole.ROLE_USER).get();
            roles09.add(roleUser09);
            User user09 = new User("binhnguyen", "Bình Nguyễn", null,
                    "879, Thôn Hoán Khưu, Phường Đàm Đàn Ca, Quận Phụng Thái Bình", "03501640362",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "binh-nguyen_mlycec", "nhien00@tong.com",
                    new BCryptPasswordEncoder().encode("123456"), roles09);

            // Insert User 10
            Set<Role> roles10 = new HashSet<>();
            Role roleUser10 = roleRepository.findByName(ERole.ROLE_EMPLOYEE).get();
            roles10.add(roleUser10);
            User user10 = new User("phiyen", "Phi Yên", null,
                    "3558 Phố Vương, Xã 3, Huyện Viên Hà Tĩnh", "01888839608",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1661267188/avatar/yr6gskvppu6qogjbmsgm.jpg",
                    "phi-yen_gaybrp", "thuy.pham@hotmail.com",
                    new BCryptPasswordEncoder().encode("123456"), roles10);

            // Insert User 11
            Set<Role> roles11 = new HashSet<>();
            Role roleUser11 = roleRepository.findByName(ERole.ROLE_EMPLOYEE).get();
            roles11.add(roleUser11);
            User user11 = new User("dieudien", "Điều Điền", null,
                    "0295, Ấp Thịnh Tường, Thôn Hàn Khoát, Huyện Hành Bến Tre", "02193043695",
                    "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1659378923/avatar/zjbljpa4ah0xrfpq23xg.jpg",
                    "dieu-dien_escrjg", "la.van@cam.com",
                    new BCryptPasswordEncoder().encode("123456"), roles11);

            // Insert Data
            userRepository.saveAll(Arrays.asList(
                    user01, user02, user03, user04, user05, user06,
                    user07, user08, user09, user10, user11
            ));
            LOGGER.info("Users Table Seeded.");
        } else {
            LOGGER.trace("Users Seeding Not Required.");
        }
    }

}
