package com.team8.taaks.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.team8.taaks.dto.DayResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakTaskRepository;


@RestController
@RequestMapping("/days")
public class DaysController {
    TaakTaskRepository taakTaskRepository;
    public DaysController(TaakTaskRepository taakTaskRepository) {
        this.taakTaskRepository = taakTaskRepository;
    }
    @GetMapping("/{day}")
    public ResponseEntity<DayResponse> diarySummary(
        @AuthenticationPrincipal TaakUser user,
        @PathVariable("day") LocalDate day){
        LocalDateTime startOfDay = day.atStartOfDay();
        LocalDateTime endOfDay = LocalDateTime.of(day, LocalTime.MAX);
        Long loadScore = taakTaskRepository.sumQuadrupleLoadScoreForCompletedTasksBetweenDueDates(user.getId(), startOfDay, endOfDay).orElse(0L);
        DayResponse response = new DayResponse(day, loadScore);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/today")
    public ResponseEntity<DayResponse> todaySummary(
        @AuthenticationPrincipal TaakUser user) {
        return diarySummary(user, LocalDate.now());
    }
    
}
