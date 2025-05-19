package com.team8.taak.controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taak.model.TaakTask;
import com.team8.taak.model.TaakTaskRepository;
import com.team8.taak.model.TaakUser;

@RestController
public class TaskController {
    public static class TaskRequest {
        private String title;
        private String memo;
        private LocalDateTime dueAt;
        private boolean isAllDay;
        private LocalDateTime completedAt;
        private Long userId;
        private int loadScore;
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getMemo() {
            return memo;
        }
        public void setMemo(String memo) {
            this.memo = memo;
        }   
        public LocalDateTime getDueAt() {
            return dueAt;
        }
        public void setDueAt(LocalDateTime dueAt) {
            this.dueAt = dueAt;
        }
        public boolean getIsAllDay() {
            return isAllDay;
        }
        public void setIsAllDay(boolean isAllDay) {
            this.isAllDay = isAllDay;
        }
        public LocalDateTime getCompletedAt() {
            return completedAt;
        }
        public void setCompletedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
        }
        public Long getUserId() {
            return userId;
        }
        public void setUserId(Long userId) {
            this.userId = userId;
        }
        public int getLoadScore() {
            return loadScore;
        }
        public void setLoadScore(int loadScore) {
            this.loadScore = loadScore;
        }
    }

    private final TaakTaskRepository taakTaskRepository;

    public TaskController(TaakTaskRepository taakTaskRepository) {
        this.taakTaskRepository = taakTaskRepository;
    }
    
    // タスク一覧の取得
    @GetMapping("/tasks")
    public Optional<TaakTask> getTask(@AuthenticationPrincipal TaakUser user) {
        // JWTからユーザIDを抽出する処理を追加
        Long userId = user.getId();
        return taakTaskRepository.findByUserId(userId);
    }

    // タスクの詳細取得
    @GetMapping("tasks/{taskId}")
    public Optional<TaakTask> getTaskDetail(@AuthenticationPrincipal TaakUser user, @PathVariable UUID taskId) {
        return taakTaskRepository.findById(taskId);
    }

    // タスクの登録
    @PostMapping("/tasks")
    public TaakTask createTask(@AuthenticationPrincipal TaakUser user, @RequestBody TaskRequest taskRequest) {
        Long userId = user.getId();
        TaakTask task = new TaakTask();
        task.setUserId(userId);
        task.setTitle(taskRequest.getTitle());
        task.setMemo(taskRequest.getMemo());
        task.setDueAt(taskRequest.getDueAt());
        task.setIsAllDay(taskRequest.getIsAllDay());
        task.setCompletedAt(taskRequest.getCompletedAt());
        task.setLoadScore(taskRequest.getLoadScore());
        return taakTaskRepository.save(task);
    }

    // タスクの更新
    @PostMapping("tasks/{taskId}")
    public TaakTask updateTask(@AuthenticationPrincipal TaakUser user, @PathVariable UUID taskId, @RequestBody TaakTask task) {
        Optional<TaakTask> optionalTask = taakTaskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            TaakTask existingTask = optionalTask.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setMemo(task.getMemo());
            existingTask.setDueAt(task.getDueAt());
            existingTask.setIsAllDay(task.getIsAllDay());
            existingTask.setCompletedAt(task.getCompletedAt());
            existingTask.setLoadScore(task.getLoadScore());
            return taakTaskRepository.save(existingTask);
        } else {
            // タスクが見つからない場合の処理
            return null;
        }
    }
}
