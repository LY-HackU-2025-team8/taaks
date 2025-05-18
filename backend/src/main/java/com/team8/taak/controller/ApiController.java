package com.team8.taak.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;

import com.team8.taak.model.TaakUser;
import com.team8.taak.model.TaakTask;
import com.team8.taak.model.TaakTaskRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class ApiController {
    private final TaakTaskRepository taakTaskRepository;
    public ApiController(TaakTaskRepository taakTaskRepository) {
        this.taakTaskRepository = taakTaskRepository;
    }

    @GetMapping("/")
    public ResponseEntity<String> Hello() {
        return ResponseEntity.ok("Hello, World!");
    }
    
    // テスト用のエンドポイント
    @GetMapping("/auth-check")
    public String getAuthenticatedUsername(@AuthenticationPrincipal TaakUser user, @RequestParam(name = "param", required = false) String param) {
        return String.format("Authenticated!\nusername: %s\nparam: %s", user.getUsername(), param);
    }

    // 全ユーザのタスク一覧を取得する
    @GetMapping("/tasks")
    public String getAllTasks(@AuthenticationPrincipal TaakTask task) {
        return task.getTitle();
    }
    
    // タスク一覧の取得
    @GetMapping("/tasks/{user_id}")
    public Optional<TaakTask> getTasks(@PathVariable Long user_id) {
        return taakTaskRepository.findByUserId(user_id);
    }
}
