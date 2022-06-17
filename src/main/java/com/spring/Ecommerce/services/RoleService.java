package com.spring.Ecommerce.services;

import com.spring.Ecommerce.models.Role;
import com.spring.Ecommerce.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Role getRoleByRoleName(String roleName){
        return roleRepository.findRoleByRoleName(roleName);
    }
}
