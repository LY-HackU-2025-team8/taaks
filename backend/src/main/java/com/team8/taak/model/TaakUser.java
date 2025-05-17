package com.team8.taak.model;

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

/**
 * Represents a user in the system, mapped to the 'taak_user' table.
 *
 * Database mapping:
 * - id: Primary key, auto-generated (bigint)
 * - username: Unique username (varchar(255)), maps to 'username' column
 * - password: User's password (varchar(255)), maps to 'password' column
 * - nickName: User's nickname (varchar(255)), maps to 'nick_name' column
 * - lineSub: Unique LINE sub identifier (varchar(255)), maps to 'line_sub' column
 * - roles: List of roles, mapped to 'taak_user_roles' table (one-to-many)
 *
 * The roles field uses @ElementCollection to map the user's roles to the 'taak_user_roles' table, where each role is a varchar(255) associated with the user's id.
 *
 * This class comment and design were created by human instruction to Copilot (AI).
 */
@Entity
public class TaakUser implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ログインに使用するユーザー名 (e.g., yamamura)
    @Column(unique = true)
    private String username;

    // ハッシュされたパスワード (e.g., $2a$10$E9j5v1Q0Z3x5z5z5z5z5zO)
    private String password;

    // アプリケーションで使用するユーザーの呼称 (e.g., 山村)
    private String nickName;    

    // LINEでログインを実装するときに使用するユーザーの識別子
    // 現状では使っていない
    @Column(unique = true)
    private String lineSub;
    @ElementCollection(fetch = FetchType.EAGER)
    
    //This is required by implementation of UserDetails
    private List<String> roles = new ArrayList<>();
    

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
    public String getNickName() {
        return nickName;
    }
    public void setNickName(String nickName) {
        this.nickName = nickName;
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
    
}
