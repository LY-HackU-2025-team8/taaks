package com.team8.taaks.controller;

import com.team8.taaks.dto.DayResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.service.DayService;
import java.time.LocalDate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/days")
public class DaysController {

  private final DayService dayService;

  public DaysController(DayService dayService) {
    this.dayService = dayService;
  }

  @GetMapping("/{day}")
  public ResponseEntity<DayResponse> diarySummary(
      @AuthenticationPrincipal TaakUser user, @PathVariable("day") LocalDate day) {
    Long loadScore = dayService.getLoadScoreForDay(user, day);
    Long uncompletedTaskCount = dayService.getUncompletedTaskCountForDay(user, day);
    Long taskCount = dayService.getTaskCountForDay(user, day);
    Long completedTaskCount = taskCount - uncompletedTaskCount;
    DayResponse response =
        new DayResponse(day, loadScore, uncompletedTaskCount, completedTaskCount, taskCount);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/today")
  public ResponseEntity<DayResponse> todaySummary(@AuthenticationPrincipal TaakUser user) {
    return diarySummary(user, LocalDate.now());
  }
}
