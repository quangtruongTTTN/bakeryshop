package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.entity.Code;
import com.ptithcm.bakeryshopapi.repository.ICodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Calendar;

@Component
public class SeedCodesTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedCodesTable.class);

    private static ICodeRepository codeRepository;

    public SeedCodesTable(ICodeRepository codeRepository) {
        this.codeRepository = codeRepository;
    }

    public static void insertData() {
        long count = codeRepository.count();
        if (count == 0) {

            // Insert Code
            Calendar calendar01 = Calendar.getInstance();
            calendar01.add(Calendar.DAY_OF_YEAR, 10);
            Code code01 = new Code(1L,"V0882021035831", 1000, 2, calendar01.getTime());

            Calendar calendar02 = Calendar.getInstance();
            calendar02.add(Calendar.DAY_OF_YEAR, 20);
            Code code02 = new Code(2L,"V0882021035832", 1000, 2, calendar02.getTime());

            Calendar calendar03 = Calendar.getInstance();
            calendar03.add(Calendar.DAY_OF_YEAR, 5);
            Code code03 = new Code(4L,"V0882021035834", 3000, 2, calendar03.getTime());

            // Insert Data
            codeRepository.saveAll(Arrays.asList(code01, code02, code03));
            LOGGER.info("Code Table Seeded.");
        } else {
            LOGGER.trace("Code Seeding Not Required.");
        }
    }
}
