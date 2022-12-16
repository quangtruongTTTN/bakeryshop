package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.Invoice;
import com.ptithcm.bakeryshopapi.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPasswordResetTokenRepository extends JpaRepository<PasswordResetToken, String> {
    PasswordResetToken findByUser_Id(long userId);
    PasswordResetToken findByToken(String token);
}
