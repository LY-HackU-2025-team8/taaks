package com.team8.taaks.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team8.taaks.model.Diary;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    // userIdで日記を取得
    Optional<Diary> findByIdAndUserId(Integer id, Long userId);
    List<Diary> findAllByUserId(Long userId);
    Page<Diary> findAllByUserId(Long userId, Pageable pageable);
}
