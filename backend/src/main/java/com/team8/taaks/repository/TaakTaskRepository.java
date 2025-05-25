package com.team8.taaks.repository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;

public interface TaakTaskRepository extends CrudRepository<TaakTask, Integer>, JpaSpecificationExecutor<TaakTask> {
    List<TaakTask> findByUser(TaakUser user);
    Optional<TaakTask> findByIdAndUserId(Integer id, Long userId);

    @Query("SELECT SUM(t.loadScore) * 4 FROM TaakTask t WHERE t.user.id = :userId AND t.dueAt >= :start AND t.dueAt <= :end AND t.completedAt IS NOT NULL")
    Optional<Long> sumQuadrupleLoadScoreForCompletedTasksBetweenDueDates(@Param("userId") Long userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
