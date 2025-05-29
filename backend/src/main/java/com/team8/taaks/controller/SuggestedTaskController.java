package com.team8.taaks.controller;

import com.team8.taaks.dto.TaskResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.service.SuggestedTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/suggested-tasks")
public class SuggestedTaskController {
  private final SuggestedTaskService suggestedTaskService;

  public SuggestedTaskController(SuggestedTaskService suggestedTaskService) {
    this.suggestedTaskService = suggestedTaskService;
  }

  @GetMapping("/today")
  public ResponseEntity<TaskResponse> suggestTask(@AuthenticationPrincipal TaakUser user) {
    return ResponseEntity.ok(suggestedTaskService.getSuggestedTasks(user));
  }
}
