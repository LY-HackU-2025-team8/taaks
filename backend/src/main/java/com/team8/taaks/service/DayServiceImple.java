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
  public Long getUncompletedTaskCountForDay(TaakUser user, LocalDate day) {
    LocalDateTime startOfDay = day.atStartOfDay();
    LocalDateTime endOfDay = LocalDateTime.of(day, LocalTime.MAX);
    return taakTaskRepository.countUncompletedTasksBetweenDueDates(
        user.getId(), startOfDay, endOfDay);
  }
}
