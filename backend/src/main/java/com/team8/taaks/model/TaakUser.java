package com.team8.taaks.model;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index; // Add this import
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table; // Add this import

/**
 * Represents a user in the system, mapped to the 'taak_user' table.
 *
 * Database mapping:
 * - id: Primary key, auto-generated (bigint)
 * - username: Unique username (TEXT, NOT NULL), maps to 'username' column, indexed
 * - password: User's password (TEXT, NOT NULL), maps to 'password' column
 * - nickName: User's nickname (varchar(255)), maps to 'nick_name' column
 * - lineSub: Unique LINE sub identifier (TEXT), maps to 'line_sub' column
 * - roles: List of roles, mapped to 'taak_user_roles' table (one-to-many)
 *
 * The roles field uses @ElementCollection to map the user's roles to the 'taak_user_roles' table, where each role is a varchar(255) associated with the user's id.
 *
 * This class comment and design were created by human instruction to Copilot (AI).
 */
@Entity
@Table(name = "taak_user", indexes = {
    @Index(name = "idx_taakuser_username", columnList = "username")
})
public class TaakUser implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ログインに使用するユーザー名 (e.g., yamamura)
    @Column(name = "username", unique = true, nullable = false, columnDefinition = "TEXT")
    private String username;

    // ハッシュされたパスワード (e.g., $2a$10$E9j5v1Q0Z3x5z5z5z5z5zO)
    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    private String password;

    // LINEでログインを実装するときに使用するユーザーの識別子
    // 現状では使っていない
    @Column(name = "line_sub", unique = true, columnDefinition = "TEXT")
    private String lineSub;
    
    @ElementCollection(fetch = FetchType.EAGER)
    // This is required by implementation of UserDetails
    private List<String> roles = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
    

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream()
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    @Override
    public String getPassword() {
        return password;
    }
    public void setPassword(String passwordHash) {
        this.password = passwordHash;
    }
    
    public String getLineSub() {
        return lineSub;
    }
    public void setLineSub(String lineSub) {
        this.lineSub = lineSub;
    }


    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    // The following methods are required overrides from UserDetails, but are not used in this application.
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
}
