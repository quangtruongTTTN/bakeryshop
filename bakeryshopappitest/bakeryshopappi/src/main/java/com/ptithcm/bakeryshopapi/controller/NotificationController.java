package com.ptithcm.bakeryshopapi.controller;


import com.ptithcm.bakeryshopapi.entity.Notification;
import com.ptithcm.bakeryshopapi.repository.INotificationRepository;
import com.ptithcm.bakeryshopapi.repository.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
//@CrossOrigin("*")
public class NotificationController {
    @Autowired
    NotificationService notificationService;
//    @Autowired
//    INotificationRepository notificationRepository;

    @GetMapping("/load-notification")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> loadNotification(){
        return new ResponseEntity<>(notificationService.loadNotification(), HttpStatus.OK);
//        return new ResponseEntity(notificationRepository.findAll(), HttpStatus.OK);
//        return new ResponseEntity<>(notificationService.loadNotification(false, true), HttpStatus.OK);
    }

    @GetMapping("/read-notification")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> readNotification(@RequestParam("id") long id){
//    public ResponseEntity<?> readNotification(@RequestParam("id") Long id){
        return new ResponseEntity<>(notificationService.modifyNotification(id), HttpStatus.OK);
    }
    @GetMapping("/push-notification")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> pushNotification(){
//        List<Notification> notifications = notificationService.loadNotification(false, false);
        List<Notification> notifications = notificationService.loadNotification();
        for (Notification n: notifications){
            n.setDeliver(true);
            notificationService.updateNotification(n);
        }
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }
}
