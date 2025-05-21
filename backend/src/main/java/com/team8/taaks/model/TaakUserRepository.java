package com.team8.taaks.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface TaakUserRepository extends CrudRepository<TaakUser, Long> {
    Optional<TaakUser> findByUsername(String username);
    Optional<TaakUser> findByLineSub(String lineSub);

    @Modifying
    @Transactional
    @Query("UPDATE TaakUser u SET u.password = :password WHERE u.username = :username")
    void changePassword(@Param("username") String username, @Param("password") String password); 
}
