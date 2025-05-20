package com.team8.taak.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taak.model.TaakTask;
import com.team8.taak.model.TaakTaskRepository;
import com.team8.taak.model.TaakUser;

@RestController
public class TaskController {
    // タスク登録・更新のリクエストボディ
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

    public static class TaskResponse {
        private UUID id;
        private String title;
        private String memo;
        private LocalDateTime dueAt;
        private boolean isAllDay;
        private LocalDateTime completedAt;
        private Long userId;
        private int loadScore;
        public UUID getId() {
            return id;
        }
        public void setId(UUID id) {
            this.id = id;
        }
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
    public List<TaskResponse> getTask(@AuthenticationPrincipal TaakUser user) {
        return taakTaskRepository.findByUser(user).stream().map(task -> {
            TaskResponse taskResponse = new TaskResponse();
            taskResponse.setId(task.getId());
            taskResponse.setTitle(task.getTitle());
            taskResponse.setMemo(task.getMemo());
            taskResponse.setDueAt(task.getDueAt());
            taskResponse.setIsAllDay(task.getIsAllDay());
            taskResponse.setCompletedAt(task.getCompletedAt());
            taskResponse.setUserId(user.getId());
            taskResponse.setLoadScore(task.getLoadScore());
            return taskResponse;
        }).collect(Collectors.toList());
    }

    // タスクの詳細取得
    @GetMapping("tasks/{taskId}")
    public Optional<TaskResponse> getTaskDetail(@AuthenticationPrincipal TaakUser user, @PathVariable UUID taskId) {
        Optional<TaakTask> task = taakTaskRepository.findById(taskId);
        if (!task.isPresent()) {
            return Optional.empty();
        }
        // 他人のタスクを取得しようとした場合は空のOptionalを返す
        if (!task.get().getUser().getId().equals(user.getId())) {
            return Optional.empty();
        }
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(task.get().getId());
        taskResponse.setTitle(task.get().getTitle());
        taskResponse.setMemo(task.get().getMemo());
        taskResponse.setDueAt(task.get().getDueAt());
        taskResponse.setIsAllDay(task.get().getIsAllDay());
        taskResponse.setCompletedAt(task.get().getCompletedAt());
        taskResponse.setUserId(user.getId());
        taskResponse.setLoadScore(task.get().getLoadScore());
        return Optional.of(taskResponse);
    }

    // タスクの登録
    @PostMapping("/tasks")
    public ResponseEntity<String> createTask(@AuthenticationPrincipal TaakUser user, @RequestBody TaskRequest taskRequest) {
        Long userId = user.getId();
        TaakTask task = new TaakTask();
        task.setUserId(userId);
        task.setTitle(taskRequest.getTitle());
        task.setMemo(taskRequest.getMemo());
        task.setDueAt(taskRequest.getDueAt());
        task.setIsAllDay(taskRequest.getIsAllDay());
        task.setCompletedAt(taskRequest.getCompletedAt());
        task.setLoadScore(taskRequest.getLoadScore());
        TaakTask registeredTask = taakTaskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).header("Location", "/tasks/" + registeredTask.getId()).body("{message: 'new task created', task: " + registeredTask.toString() + "}");
    }

    // タスクの更新
    @PutMapping("tasks/{taskId}")
    public ResponseEntity<String> updateTask(@AuthenticationPrincipal TaakUser user, @PathVariable UUID taskId, @RequestBody TaskRequest taskRequest) {
        Optional<TaakTask> optionalTask = taakTaskRepository.findById(taskId);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(404).body("Task not found");
        }
        TaakTask existingTask = optionalTask.get();
        // 他人のタスクを更新しようとした場合は403エラーを返す
        if (!existingTask.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You do not have permission to update this task");
        }
        existingTask.setTitle(taskRequest.getTitle());
        existingTask.setMemo(taskRequest.getMemo());
        existingTask.setDueAt(taskRequest.getDueAt());
        existingTask.setIsAllDay(taskRequest.getIsAllDay());
        existingTask.setCompletedAt(taskRequest.getCompletedAt());
        existingTask.setLoadScore(taskRequest.getLoadScore());
        taakTaskRepository.save(existingTask);
        return ResponseEntity.ok("Task updated successfully");
    }
}
