package com.team8.taak.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

import com.team8.taak.model.TaakTaskRepository;
import com.team8.taak.model.TaakTask;

@RestController
public class TaskController {
    private final TaakTaskRepository taakTaskRepository;
    public TaskController(TaakTaskRepository taakTaskRepository) {
        this.taakTaskRepository = taakTaskRepository;
    }

    // タスク一覧の取得
    @GetMapping("tasks/{user_id}")
    public Optional<TaakTask> getTask(@AuthenticationPrincipal @PathVariable Long user_id) {
        return taakTaskRepository.findByUserId(user_id);
    }
}
