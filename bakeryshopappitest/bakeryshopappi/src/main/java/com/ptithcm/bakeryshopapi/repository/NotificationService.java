package com.ptithcm.bakeryshopapi.repository;


import com.ptithcm.bakeryshopapi.entity.Notification;
import com.ptithcm.bakeryshopapi.repository.INotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    INotificationRepository notificationRepository;

//    @Override
//    public List<Notification> loadNotification(boolean read, boolean deliver) {
    public List<Notification> loadNotification() {
        return notificationRepository.findTop10NotificationByOrderByCreatedAtDesc();
//        return notificationRepository.getNotificationByReadIsFalseAndDeliverIsTrue();
//        return notificationRepository.getNotificationByReadEqualsAndDeliverEquals(read, deliver);
    }

//    @Override
    public Notification modifyNotification(Long id) {
        Notification notification = notificationRepository.findById(id).get();
        notification.setRead(true);
        notification.setDeliver(true);
        return notificationRepository.save(notification);
    }

//    @Override
    public Notification updateNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

//    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
