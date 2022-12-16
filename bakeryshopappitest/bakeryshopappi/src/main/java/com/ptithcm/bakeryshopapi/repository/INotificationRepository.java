package com.ptithcm.bakeryshopapi.repository;


import com.ptithcm.bakeryshopapi.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface INotificationRepository extends JpaRepository<Notification, Long> {
//    List<Notification> getNotificationByReadEqualsAndDeliverEquals(Boolean read, Boolean deliver);
//    List<Notification> getNotificationByReadIsFalseAndDeliverIsTrue(Boolean read, Boolean deliver);
    List<Notification> getNotificationByReadIsFalseAndDeliverIsTrue();
    List<Notification> findAll();
    List<Notification> findTop10NotificationByOrderByCreatedAtDesc();
//    List<Notification> findTop10NotificationOrderByCreatedAtDesc();
//    List<Notification> getNotificationByReadEquals();
}
