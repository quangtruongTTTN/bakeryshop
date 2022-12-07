//package com.ptithcm.bakeryshopapi.repository;
//
//import com.ptithcm.bakeryshopapi.entity.GroupMember;
//import com.ptithcm.bakeryshopapi.entity.GroupOrderDetails;
//import com.ptithcm.bakeryshopapi.entity.Product;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface IGroupOrderDetailsRepository extends JpaRepository<GroupOrderDetails, Long> {
//
//    List<GroupOrderDetails> findAllByGroupMember(GroupMember groupMember);
//
//    GroupOrderDetails findByGroupMemberAndProductAndSizeOptionIdLike(GroupMember groupMember, Product product,  String sizeOptionId);
//
//}
