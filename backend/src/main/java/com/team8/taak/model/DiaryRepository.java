package com.team8.taak.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    // 追加のクエリメソッドが必要な場合はここに記述
}
