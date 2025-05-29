package com.team8.taaks.service;

import com.team8.taaks.model.TaakUser;
import java.time.LocalDate;

public interface DayService {

  public Long getLoadScoreForDay(TaakUser user, LocalDate day);

  public Long getUncompletedTaskCountForDay(TaakUser user, LocalDate day);

  public Long getTaskCountForDay(TaakUser user, LocalDate day);

  public Long getCompletedTaskCountForDay(TaakUser user, LocalDate day);
}
