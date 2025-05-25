package com.team8.taaks.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;

public interface TaakTaskRepository extends CrudRepository<TaakTask, Integer>, JpaSpecificationExecutor<TaakTask> {
    List<TaakTask> findByUser(TaakUser user);
    Optional<TaakTask> findByIdAndUserId(Integer id, Long userId);
}
