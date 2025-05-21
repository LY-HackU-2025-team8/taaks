package com.team8.taaks.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface TaakTaskRepository extends CrudRepository<TaakTask, Integer> {
    List<TaakTask> findByUser(TaakUser user);
    Optional<TaakTask> findByIdAndUserId(Integer id, Long userId);
}
