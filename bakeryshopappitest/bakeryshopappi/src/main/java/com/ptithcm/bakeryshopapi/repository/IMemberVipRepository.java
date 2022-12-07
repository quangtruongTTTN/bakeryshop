package com.ptithcm.bakeryshopapi.repository;


import com.ptithcm.bakeryshopapi.entity.MemberVip;
import com.ptithcm.bakeryshopapi.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMemberVipRepository extends JpaRepository<MemberVip, Long> {

    Optional<MemberVip> findByUser(@NonNull User user);

}
