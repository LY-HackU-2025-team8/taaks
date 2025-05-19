package com.team8.taak.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    // userIdで日記を取得
    Optional<Diary> findByIdAndUserId(Integer id, Long userId);
    List<Diary> findAllByUserId(Long userId);
}
