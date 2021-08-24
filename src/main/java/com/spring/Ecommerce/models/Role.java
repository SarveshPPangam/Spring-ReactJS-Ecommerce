package com.spring.Ecommerce.models;

import javax.persistence.*;

@Entity
@Table
public class Role {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String roleName;

    @OneToOne(mappedBy = "role")
    private User user;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
