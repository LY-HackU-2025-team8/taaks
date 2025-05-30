package com.team8.taaks.repository;

import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TaakTaskRepository
    extends CrudRepository<TaakTask, Integer>, JpaSpecificationExecutor<TaakTask> {
  List<TaakTask> findByUser(TaakUser user);

  Optional<TaakTask> findByIdAndUserId(Integer id, Long userId);

  List<TaakTask> findAllByUserIdAndDueAtBetween(
      @Param("userId") Long userId,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);

  @Query(
      "SELECT SUM(t.loadScore) * 4 FROM TaakTask t WHERE t.user.id = :userId AND t.dueAt >= :start AND t.dueAt <= :end")
  Optional<Long> sumQuadrupleLoadScoreForCompletedTasksBetweenDueDates(
      @Param("userId") Long userId,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);

  @Query(
      "SELECT COUNT(t) FROM TaakTask t WHERE t.user.id = :userId AND t.completedAt IS NULL AND t.dueAt >= :start AND t.dueAt <= :end")
  Long countUncompletedTasksBetweenDueDates(
      @Param("userId") Long userId,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);

  @Query(
      "SELECT COUNT(t) FROM TaakTask t WHERE t.user.id = :userId AND t.dueAt >= :start AND t.dueAt <= :end")
  Long countTasksBetweenDueDates(
      @Param("userId") Long userId,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);
}
