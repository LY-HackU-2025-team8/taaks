package com.team8.taaks.service;

import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakTaskRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.springframework.stereotype.Service;

@Service
public class DayServiceImple implements DayService {
  TaakTaskRepository taakTaskRepository;

  public DayServiceImple(TaakTaskRepository taakTaskRepository) {
    this.taakTaskRepository = taakTaskRepository;
  }

  @Override
  public Long getLoadScoreForDay(TaakUser user, LocalDate day) {
    LocalDateTime startOfDay = day.atStartOfDay();
    LocalDateTime endOfDay = LocalDateTime.of(day, LocalTime.MAX);
    return taakTaskRepository
        .sumQuadrupleLoadScoreForCompletedTasksBetweenDueDates(user.getId(), startOfDay, endOfDay)
        .orElse(0L);
  }

  @Override
  public Long getTaskCountForDay(TaakUser user, LocalDate day) {
    LocalDateTime startOfDay = day.atStartOfDay();
    LocalDateTime endOfDay = LocalDateTime.of(day, LocalTime.MAX);
    return taakTaskRepository.countTasksBetweenDueDates(user.getId(), startOfDay, endOfDay);
  }

  @Override
  public Long getUncompletedTaskCountForDay(TaakUser user, LocalDate day) {
    LocalDateTime startOfDay = day.atStartOfDay();
    LocalDateTime endOfDay = LocalDateTime.of(day, LocalTime.MAX);
    return taakTaskRepository.countUncompletedTasksBetweenDueDates(
        user.getId(), startOfDay, endOfDay);
  }

  @Override
  public Long getCompletedTaskCountForDay(TaakUser user, LocalDate day) {
    Long taskCount = getTaskCountForDay(user, day);
    Long uncompletedTaskCount = getUncompletedTaskCountForDay(user, day);
    return taskCount - uncompletedTaskCount;
  }
}
