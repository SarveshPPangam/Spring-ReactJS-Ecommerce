package com.spring.Ecommerce.repository;

import com.spring.Ecommerce.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findRoleByRoleName(String roleName);

}
