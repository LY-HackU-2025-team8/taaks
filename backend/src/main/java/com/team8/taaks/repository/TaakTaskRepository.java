package com.team8.taaks.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;

public interface TaakTaskRepository extends CrudRepository<TaakTask, Integer> {
    List<TaakTask> findByUser(TaakUser user);
    Optional<TaakTask> findByIdAndUserId(Integer id, Long userId);
    Page<TaakTask> findAllByUserId(Long userId, Pageable pageable);
}
