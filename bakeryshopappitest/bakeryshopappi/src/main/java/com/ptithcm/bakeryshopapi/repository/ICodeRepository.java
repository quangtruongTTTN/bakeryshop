package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ICodeRepository extends JpaRepository<Code, Long> {

    List<Code> findAllByEndDateGreaterThanEqualAndDeletedAtNull(Date date);

    List<Code> findAllByEndDateGreaterThanEqualAndDeletedAtNullAndUserId(Date endDate, long userId);

    Boolean existsByCodeName(String codeName); // Exception: exist
//    Boolean existsByCodeNameAndUserIdNotNull(String codeName); // Exception: exist
    Boolean existsByCodeNameAndDeletedAtNotNull(String codeName); // Exception: exist

//    Boolean existsByUserNameUse(String userNameUse); // Exception: exist

    Boolean existsByCodeNameAndEndDateLessThanEqual(String codeName, Date date); // Exception: exist and expiry date

    Optional<Code> findByCodeName(String codeName); // Find code by code name

//    Boolean existsByCodeName(String codeName); // Exception: used
}
