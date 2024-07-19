package com.example.engineer.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "sellers")
public class Seller implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String shopName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    private Boolean isDeleted;

    @Column(nullable = false, length = 10)
    private String KRS;

    private String imageName;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;


    //UserDetails implementation:
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }

    //same reason as In User.java
    @Override
    public String getUsername(){
        return email;
    }

    @Override
    public boolean isAccountNonExpired(){
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked(){
        return !isDeleted;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled(){
        return !isDeleted;
    }
}

