package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.entity.WheelHistory;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import com.ptithcm.bakeryshopapi.repository.IWheelHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

@Component
public class SeedWheelHistory {


    private static IUserRepository userRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedWheelHistory.class);

    private static IWheelHistoryRepository wheelHistoryRepository;

    public SeedWheelHistory(IWheelHistoryRepository wheelHistoryRepository,IUserRepository userRepository) {
        this.wheelHistoryRepository = wheelHistoryRepository;
        this.userRepository = userRepository;
    }

    public static void insertData() throws ParseException {
        long count = wheelHistoryRepository.count();
        User user = userRepository.findUserById(2);
        User user1 = userRepository.findUserById(3);
        User user2 = userRepository.findUserById(4);
        if (count == 0) {
            
            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

            // Insert WheelHistory
            WheelHistory wheelHistory01 = new WheelHistory(1L, user, "Nhận được 1000 điểm", format.parse("2021/08/04 09:37:12"));
            WheelHistory wheelHistory02 = new WheelHistory(2L, user1, "Nhận được mã Voucher", format.parse("2021/07/14 19:37:12"));
            WheelHistory wheelHistory03 = new WheelHistory(3L, user, "Nhận được mã Voucher", format.parse("2021/06/11 09:17:12"));
            WheelHistory wheelHistory04 = new WheelHistory(4L, user1, "Nhận được 500 điểm", format.parse("2021/3/02 09:37:10"));
            WheelHistory wheelHistory05 = new WheelHistory(5L, user, "Nhận được 1500 điểm", format.parse("2021/04/04 08:11:12"));
            WheelHistory wheelHistory06 = new WheelHistory(6L, user1, "Nhận được mã Voucher", format.parse("2021/07/05 01:17:12"));
            WheelHistory wheelHistory07 = new WheelHistory(7L, user2, "Nhận được 1000 điểm", format.parse("2021/01/04 01:37:12"));

            // Insert Data
            wheelHistoryRepository.saveAll(Arrays.asList(
                    wheelHistory01, wheelHistory02, wheelHistory03, wheelHistory04,
                    wheelHistory05, wheelHistory06, wheelHistory07
            ));
            LOGGER.info("WheelHistory Table Seeded.");
        } else {
            LOGGER.trace("WheelHistory Seeding Not Required.");
        }
    }

}
