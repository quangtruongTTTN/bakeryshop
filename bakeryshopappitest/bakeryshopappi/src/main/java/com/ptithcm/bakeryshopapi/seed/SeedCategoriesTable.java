package com.ptithcm.bakeryshopapi.seed;

import com.ptithcm.bakeryshopapi.entity.Category;
import com.ptithcm.bakeryshopapi.repository.ICategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SeedCategoriesTable {
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedCategoriesTable.class);

    private static ICategoryRepository categoryRepository;

    public SeedCategoriesTable(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public static void insertData() {
        long count = categoryRepository.count();
        if (count == 0) {
            // Insert Categories
            Category category01 = new Category(1, "Bánh Mì Ngọt ");
            Category category02 = new Category(2, "Snack");
            Category category03 = new Category(3, "Product");
            Category category04 = new Category(4, "Bánh đặc biệt");
            Category category05 = new Category(5, "Bánh cà phê");
            Category category06 = new Category(6, "Bánh hạnh nhân");
            Category category07 = new Category(7, "Bánh sinh nhật");
            Category category08 = new Category(8, "Bánh bông lan");

            // Insert Data
            categoryRepository.saveAll(Arrays.asList(category01, category02, category03, category04, category05, category06, category07,category08));
            LOGGER.info("Categories Table Seeded.");
        } else {
            LOGGER.trace("Categories Seeding Not Required.");
        }
    }
}
