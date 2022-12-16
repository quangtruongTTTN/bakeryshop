package com.ptithcm.bakeryshopapi.service;

import com.ptithcm.bakeryshopapi.entity.PasswordResetToken;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.repository.IPasswordResetTokenRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class UserService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IPasswordResetTokenRepository passwordResetTokenRepository;

    public void updateResetPasswordToken(String token, String email){
        User user = userRepository.findUserByEmail(email);
        if (user != null) {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByUser_Id(user.getId());
            if(passwordResetToken==null){
                passwordResetToken = new PasswordResetToken(token,user);
            }else{
                passwordResetToken.setToken(token);
                passwordResetToken.setExpiryDate(new Date());
            }
            passwordResetTokenRepository.save(passwordResetToken);
//            user.setResetPasswordToken(token);
//            userRepository.save(user);
        }
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        passwordResetTokenRepository.delete(passwordResetTokenRepository.findByUser_Id(user.getId()));
//        user.setResetPasswordToken(null);
        userRepository.save(user);

    }
}