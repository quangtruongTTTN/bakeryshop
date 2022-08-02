package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndDeletedAtNull(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByEmailAndEmailNotLike(String email, String email2);

    Page<User> findUsersByUsernameNotLikeAndFullNameLike(String username, String fullName, Pageable pageable);

//    @Query(value = "SELECT * FROM \"user\" U, user_role UR where U.id= UR.user_id and UR.role_id=3", nativeQuery = true)
    @Query(value = "SELECT * FROM \"user\" U, user_role UR where U.id= UR.user_id and UR.role_id=3 ", nativeQuery = true)
    Page<User> findEmployees(String username, Pageable pageable);

    //    @Query(value = "SELECT * FROM \"user\" U, user_role UR where U.id= UR.user_id and UR.role_id=3 and username like '%:fullName%'", nativeQuery = true)
//    Page<User> findEmployeesByUsernameNotLikeAndFullNameLike(String username,@Param("fullName") String fullName, Pageable pageable );
    Page<User> findUsersByUsernameNotLike(String username, Pageable pageable);

    Optional<User> findByEmail(String email);

}
