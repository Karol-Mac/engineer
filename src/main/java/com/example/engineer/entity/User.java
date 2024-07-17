package com.example.engineer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String username;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private Boolean isBlocked;      //isBlocked = can add comments ?
    private Boolean isDeleted;
    private Boolean isDarkModeOn;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "reporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports;

    @ManyToMany
    @JoinTable(
            name = "favourites",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id")
    )
    private List<Product> favouriteProducts;



    //UserDetails implementation:
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }

    //email is returned, because this is unique user identifier (not username)
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired(){
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked(){
        return !isBlocked;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled(){
        return !isBlocked;
    }
}
