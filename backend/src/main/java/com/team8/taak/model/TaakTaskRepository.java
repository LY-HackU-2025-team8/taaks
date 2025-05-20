package com.team8.taak.model;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface TaakTaskRepository extends CrudRepository<TaakTask, UUID> {
    // userIdで指定したユーザのデータを全て取得できる
    List<TaakTask> findByUser(TaakUser user);
    Optional<TaakTask> findByIdAndUserId(UUID id, Long userId);
}
