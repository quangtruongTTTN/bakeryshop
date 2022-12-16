package com.ptithcm.bakeryshopapi.controller;


import com.ptithcm.bakeryshopapi.config.ERole;
import com.ptithcm.bakeryshopapi.entity.PasswordResetToken;
import com.ptithcm.bakeryshopapi.entity.Role;
import com.ptithcm.bakeryshopapi.entity.User;
import com.ptithcm.bakeryshopapi.payload.request.*;
import com.ptithcm.bakeryshopapi.payload.response.JwtResponse;
import com.ptithcm.bakeryshopapi.payload.response.MessageResponse;
import com.ptithcm.bakeryshopapi.repository.IPasswordResetTokenRepository;
import com.ptithcm.bakeryshopapi.repository.IRoleRepository;
import com.ptithcm.bakeryshopapi.repository.IUserRepository;
import com.ptithcm.bakeryshopapi.security.jwt.JwtUtils;
import com.ptithcm.bakeryshopapi.security.service.CustomizeUser;
import com.ptithcm.bakeryshopapi.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private IPasswordResetTokenRepository passwordResetTokenRepository;
    @Value("${javadocfast.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomizeUser customizeUser = (CustomizeUser) authentication.getPrincipal();
        List<String> roles = customizeUser.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        new Date(new Date().getTime() + jwtExpirationMs).getTime(),
                        customizeUser.getId(),
                        customizeUser.getUsername(),
                        customizeUser.getFullName(),
                        customizeUser.getBirthday(),
                        customizeUser.getAddress(),
                        customizeUser.getPhone(),
                        customizeUser.getLinkImage(),
                        customizeUser.getNameImage(),
                        customizeUser.getEmail(),
                        roles,
                        customizeUser.getCreatedAt(),
                        customizeUser.getUpdatedAt()
                )
        );
    }

    @PostMapping("/signupEmployee")
    public ResponseEntity<?> registerEmployee(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.ok(new MessageResponse("Tài khoản này đã được sử dụng"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Email này đã được sử dụng"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setFullName(signUpRequest.getUsername());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.size() == 0) {
            Role userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Thêm nhân viên thành công"));
    }


    @PostMapping("/signupShipper")
    public ResponseEntity<?> registerShipper(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.ok(new MessageResponse("Tài khoản này đã được sử dụng"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Email này đã được sử dụng"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setFullName(signUpRequest.getUsername());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.size() == 0) {
            Role userRole = roleRepository.findByName(ERole.ROLE_SHIPPER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Thêm Shipper thành công"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.ok(new MessageResponse("Tài khoản này đã được sử dụng"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Email này đã được sử dụng"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setFullName(signUpRequest.getUsername());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.size() == 0) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Đăng ký thành công"));
    }


    @GetMapping("/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        if (!userRepository.existsByEmailAndEmailNotLike(email, "admin@gmail.com")) {
            return ResponseEntity.ok(new MessageResponse("Email này chưa đăng ký"));
        }
        return ResponseEntity.ok(new MessageResponse("Email này đã đăng ký"));
    }

    @PostMapping("/reset-pass")
    public ResponseEntity<?> updatePassword(@RequestBody AuthRequest authRequest) {

        if (!userRepository.existsByEmail(authRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Không tìm thấy email này"));
        }

        User user = userRepository.findByEmail(authRequest.getEmail()).get();
        user.setPassword(encoder.encode(authRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> updatePasswordByUserName(@RequestBody ChangePasswordRequest changePasswordRequest) {
        if (!userRepository.existsByUsername(changePasswordRequest.getUsername())) {
            return ResponseEntity.ok(new MessageResponse("Không tìm thấy Username này"));
        }
        User user = userRepository.findByUsername(changePasswordRequest.getUsername()).get();
        if (encoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(encoder.encode(changePasswordRequest.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return ResponseEntity.ok(new MessageResponse("Mật khẩu không chính xác"));
        }
    }

    @PostMapping("/forgot_password")
    public ResponseEntity<?> processForgotPassword(@RequestBody EmailRequest request) {
        String email = request.getEmail();
        String token = RandomString.make(30);
        if (!userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Không tìm thấy Email này"));
        } else {
            try {
                userService.updateResetPasswordToken(token, email);
//            String resetPasswordLink = "http://localhost:3000" + "/api/auth/reset_password?token=" + token;
                String resetPasswordLink = "http://localhost:3000" + "/reset_password?token=" + token;
                sendEmail(email, resetPasswordLink);
//            return ResponseEntity.ok(userRepository.save(user));
//            model.addAttribute("message", "We have sent a reset password link to your email. Please check.");
                return ResponseEntity.ok(new MessageResponse("We have sent a reset password link to your email. Please check."));
            }
//        catch (CustomerNotFoundException ex) {
//            model.addAttribute("error", ex.getMessage());
//        }
            catch (UnsupportedEncodingException | MessagingException e) {
                return ResponseEntity.ok(new MessageResponse("Error while sending email"));
            }
        }


//        return "forgot_password_form";
    }

    @GetMapping("/reset_password")
    public ResponseEntity<?> showResetPasswordForm(@Param(value = "token") String token) {
//    public String showResetPasswordForm(@Param(value = "token") String token) {
//        User user = userService.getByResetPasswordToken(token);
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            return ResponseEntity.ok(new MessageResponse("Invalid Token 1"));
        }
        String result = validatePasswordResetToken(token);
        if (result == null) {

            User user = userRepository.findUserById(passwordResetToken.getUser().getId());
            if (user == null) {
                return ResponseEntity.ok(new MessageResponse(result));
            }
            return ResponseEntity.ok(new MessageResponse("OK"));
        } else {
            return ResponseEntity.ok(new MessageResponse(result));
        }

//        return "OK";
    }

    @PostMapping("/reset_password")
    public ResponseEntity<?> processResetPassword(@RequestBody ResetPasswordRequest request) {
//    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getToken();
        String result = validatePasswordResetToken(token);
        String password = request.getPassword();
        if (result == null) {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
            User user = userRepository.findUserById(passwordResetToken.getUser().getId());

            if (user == null) {
                return ResponseEntity.ok(new MessageResponse("Invalid Token 12"));
            } else {

                userService.updatePassword(user, password);
//            return ResponseEntity.ok(new MessageResponse("You have successfully changed your password."));
                return ResponseEntity.ok(new MessageResponse("Password reset successful, you can now login"));
//            model.addAttribute("message", "You have successfully changed your password.");
            }
        } else {
            return ResponseEntity.ok(new MessageResponse(result));
        }
//        User user = userService.getByResetPasswordToken(token);

//        String result = validatePasswordResetToken(token);


//        return "message";
    }

    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);

        return !isTokenFound(passToken) ? "Invalid Token"
                : passToken.isPasswordExpired() ? "Expired Token"
                : null;
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }
//    private boolean isTokenExpired(PasswordResetToken passToken) {
//        final Calendar cal = Calendar.getInstance();
//        return passToken.getExpiryDate().before(cal.getTime());
//    }

    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("contact@shopme.com", "BakeryShop Support");
        helper.setTo(recipientEmail);

        String subject = "Here's the link to reset your password";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

}
