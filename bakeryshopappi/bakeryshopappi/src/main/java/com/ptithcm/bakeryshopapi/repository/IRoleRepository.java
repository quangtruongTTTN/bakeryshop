package com.ptithcm.bakeryshopapi.repository;

import com.ptithcm.bakeryshopapi.config.ERole;
import com.ptithcm.bakeryshopapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
