package com.team8.taak.model;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface TaakTaskRepository extends CrudRepository<TaakTask, Long> {
    // userIdで指定したユーザのデータを全て取得できる
    Optional<TaakTask> findByUserId(Long userId);
}