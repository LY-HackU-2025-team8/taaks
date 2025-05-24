package com.team8.taaks.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakTaskRepository;

@CrossOrigin(origins={"localhost:3000", "https://taak.app"})
@RestController
public class TaskController {
    // タスク登録・更新のリクエストボディ
    public static class TaskRequest {
        private String title;
        private String memo;
        private LocalDateTime dueAt;
        private boolean isAllDay;
        private LocalDateTime completedAt;
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
        public int getLoadScore() {
            return loadScore;
        }
        public void setLoadScore(int loadScore) {
            this.loadScore = loadScore;
        }
    }

    public static class TaskResponse {
        private Integer id;
        private String title;
        private String memo;
        private LocalDateTime dueAt;
        private boolean isAllDay;
        private LocalDateTime completedAt;
        private int loadScore;
        public Integer getId() {
            return id;
        }
        public void setId(Integer id) {
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
    public ResponseEntity<Page<TaskResponse>> getTask(
        @AuthenticationPrincipal TaakUser user,
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Page<TaakTask> tasks = taakTaskRepository.findAllByUserId(user.getId(), pageable);
        Page<TaskResponse> taskResponses = tasks.map(task -> {
            TaskResponse taskResponse = new TaskResponse();
            taskResponse.setId(task.getId());
            taskResponse.setTitle(task.getTitle());
            taskResponse.setMemo(task.getMemo());
            taskResponse.setDueAt(task.getDueAt());
            taskResponse.setIsAllDay(task.getIsAllDay());
            taskResponse.setCompletedAt(task.getCompletedAt());
            taskResponse.setLoadScore(task.getLoadScore());
            return taskResponse;
        });
        return ResponseEntity.ok(taskResponses);
    }

    // タスクの詳細取得
    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<TaskResponse> getTaskDetail(@AuthenticationPrincipal TaakUser user, @PathVariable Integer taskId) {
        Optional<TaakTask> task = taakTaskRepository.findByIdAndUserId(taskId, user.getId());
        if (!task.isPresent()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(task.get().getId());
        taskResponse.setTitle(task.get().getTitle());
        taskResponse.setMemo(task.get().getMemo());
        taskResponse.setDueAt(task.get().getDueAt());
        taskResponse.setIsAllDay(task.get().getIsAllDay());
        taskResponse.setCompletedAt(task.get().getCompletedAt());
        taskResponse.setLoadScore(task.get().getLoadScore());
        return new ResponseEntity<>(taskResponse, HttpStatus.OK);
    }

    // タスクの登録
    @PostMapping("/tasks")
    public ResponseEntity<TaskResponse> createTask(@AuthenticationPrincipal TaakUser user, @RequestBody TaskRequest taskRequest) {
        TaakTask task = new TaakTask();
        task.setUser(user);
        task.setTitle(taskRequest.getTitle());
        task.setMemo(taskRequest.getMemo());
        task.setDueAt(taskRequest.getDueAt());
        task.setIsAllDay(taskRequest.getIsAllDay());
        task.setCompletedAt(taskRequest.getCompletedAt());
        task.setLoadScore(taskRequest.getLoadScore());
        TaakTask registeredTask = taakTaskRepository.save(task);
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(registeredTask.getId());
        taskResponse.setTitle(registeredTask.getTitle());
        taskResponse.setMemo(registeredTask.getMemo());
        taskResponse.setDueAt(registeredTask.getDueAt());
        taskResponse.setIsAllDay(registeredTask.getIsAllDay());
        taskResponse.setCompletedAt(registeredTask.getCompletedAt());
        taskResponse.setLoadScore(registeredTask.getLoadScore());
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setLocation(URI.create("/tasks/" + registeredTask.getId()));
        return new ResponseEntity<>(taskResponse, responseHeaders, HttpStatus.CREATED);
    }

    // タスクの更新
    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<String> updateTask(@AuthenticationPrincipal TaakUser user, @PathVariable Integer taskId, @RequestBody TaskRequest taskRequest) {
        Optional<TaakTask> optionalTask = taakTaskRepository.findById(taskId);
        if (!optionalTask.isPresent()) {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        }
        TaakTask existingTask = optionalTask.get();
        // 他人のタスクを更新しようとした場合は403エラーを返す
        if (!existingTask.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>("You do not have permission to update this task", HttpStatus.FORBIDDEN);
        }
        existingTask.setTitle(taskRequest.getTitle());
        existingTask.setMemo(taskRequest.getMemo());
        existingTask.setDueAt(taskRequest.getDueAt());
        existingTask.setIsAllDay(taskRequest.getIsAllDay());
        existingTask.setCompletedAt(taskRequest.getCompletedAt());
        existingTask.setLoadScore(taskRequest.getLoadScore());
        taakTaskRepository.save(existingTask);
        return new ResponseEntity<>("Task updated successfully", HttpStatus.OK);
    }
}
