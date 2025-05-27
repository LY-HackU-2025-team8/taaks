package com.team8.taaks.controller;

import com.team8.taaks.dto.TaskRequest;
import com.team8.taaks.dto.TaskResponse;
import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.model.TaskReminder;
import com.team8.taaks.dto.LlmResponse;
import com.team8.taaks.repository.TaakTaskRepository;
import com.team8.taaks.repository.TaskReminderRepository;
import com.team8.taaks.specification.TaakTaskSpecification;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.StructuredResponse;
import com.openai.models.responses.StructuredResponseCreateParams;

@CrossOrigin(origins = {"localhost:3000", "https://taak.app"})
@RestController
@RequestMapping("/tasks")
public class TaskController {
  private final TaakTaskRepository taakTaskRepository;
  private final TaskReminderRepository taskReminderRepository;

  OpenAIClient client = OpenAIOkHttpClient.fromEnv();

  public TaskController(
      TaakTaskRepository taakTaskRepository, TaskReminderRepository taskReminderRepository) {
    this.taskReminderRepository = taskReminderRepository;
    this.taakTaskRepository = taakTaskRepository;
  }

  // タスク一覧の取得
  @GetMapping
  public ResponseEntity<Page<TaskResponse>> getTask(
      @AuthenticationPrincipal TaakUser user,
      @RequestParam(name = "dueAt_gt", required = false) LocalDateTime dueAtGt,
      @RequestParam(name = "dueAt_lt", required = false) LocalDateTime dueAtLt,
      @RequestParam(name = "isAllDay_eq", required = false) Boolean isAllDayEq,
      @RequestParam(name = "isCompleted_eq", required = false) Boolean isCompletedEq,
      @PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) @ParameterObject
          Pageable pageable) {
    Specification<TaakTask> spec = Specification.where(null);
    if (dueAtGt != null) {
      spec = spec.and(TaakTaskSpecification.dueAtGreaterThan(dueAtGt));
    }
    if (dueAtLt != null) {
      spec = spec.and(TaakTaskSpecification.dueAtLessThan(dueAtLt));
    }
    if (isAllDayEq != null) {
      spec = spec.and(TaakTaskSpecification.isAllDay(isAllDayEq));
    }
    if (isCompletedEq != null) {
      spec = spec.and(TaakTaskSpecification.isCompleted(isCompletedEq));
    }
    spec = spec.and(TaakTaskSpecification.hasUserId(user.getId()));
    Page<TaakTask> tasks = taakTaskRepository.findAll(spec, pageable);
    Page<TaskResponse> taskResponses =
        tasks.map(
            task ->
                new TaskResponse(
                    task.getId(),
                    task.getTitle(),
                    task.getMemo(),
                    task.getDueAt(),
                    task.getIsAllDay(),
                    task.getCompletedAt(),
                    task.getLoadScore(),
                    taskReminderRepository.findAllByTaskId(task.getId()).stream()
                        .map(TaskReminder::getScheduledAt)
                        .toList()));
    return ResponseEntity.ok(taskResponses);
  }

  // タスクの詳細取得
  @GetMapping("/{taskId}")
  public ResponseEntity<TaskResponse> getTaskDetail(
      @AuthenticationPrincipal TaakUser user, @PathVariable("taskId") Integer taskId) {
    Optional<TaakTask> taskOpt = taakTaskRepository.findByIdAndUserId(taskId, user.getId());
    if (taskOpt.isEmpty()) {
      // ユーザー自身のタスクでない、またはタスクが存在しない場合は403または404を返す
      // ここではForbidden（アクセス権なし）を返すが、存在しない場合はNOT_FOUNDの方が適切な場合もある
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
    TaakTask task = taskOpt.get();
    TaskResponse taskResponse =
        new TaskResponse(
            task.getId(),
            task.getTitle(),
            task.getMemo(),
            task.getDueAt(),
            task.getIsAllDay(),
            task.getCompletedAt(),
            task.getLoadScore(),
            taskReminderRepository.findAllByTaskId(task.getId()).stream()
                .map(TaskReminder::getScheduledAt)
                .toList());
    return new ResponseEntity<>(taskResponse, HttpStatus.OK);
  }

  // タスクの登録
  @PostMapping
  public ResponseEntity<TaskResponse> createTask(
      @AuthenticationPrincipal TaakUser user, @RequestBody TaskRequest taskRequest) {
    TaakTask task = new TaakTask();
    task.setUser(user);
    task.setTitle(taskRequest.title());
    task.setMemo(taskRequest.memo());
    task.setDueAt(taskRequest.dueAt());
    task.setIsAllDay(taskRequest.isAllDay());
    task.setCompletedAt(taskRequest.completedAt());
    StructuredResponseCreateParams<LlmResponse> params = ResponseCreateParams.builder()
      .input("これから記入するタスクを全て1~10の値の範囲でストレスレベルを返答してください。返答は数字のみでお願いします。タスクは以下の通りです。\nタスクのタイトル：" + taskRequest.title() + "\n期限までの時間（分）" + Duration.between(LocalDateTime.now(), taskRequest.dueAt()).toMinutes())
      .text(LlmResponse.class)
      .model(ChatModel.GPT_4_1)
      .build();
    try {
      StructuredResponse<LlmResponse> response = client.responses().create(params);
      Optional<LlmResponse> outputOptional = response.output().stream().flatMap(item -> item.message().stream()).flatMap(msg -> msg.content().stream()).flatMap(content -> content.outputText().stream()).findFirst();
      if (outputOptional.isEmpty()) {
        throw new OpenAiApiException(500, "Failed to get load score from OpenAI API");
      }
      int loadScore = outputOptional.get().loadScore();
      System.out.println("負荷スコア: " + loadScore);
      task.setLoadScore(loadScore);
    } catch (OpenAiApiException e) {
      throw new OpenAiApiException(502, "An error occurred while communicating: " + e.getMessage());
    }
    TaakTask registeredTask = taakTaskRepository.save(task);
    if (taskRequest.scheduledAt() == null || taskRequest.scheduledAt().isEmpty()) {
      // スケジュールが指定されていない場合は空のリストを保存
      taskReminderRepository.saveAll(List.of());
    } else {
      taskReminderRepository.saveAll(
          taskRequest.scheduledAt().stream()
              .map(
                  scheduledAt -> {
                    TaskReminder taskReminder = new TaskReminder();
                    taskReminder.setTask(registeredTask);
                    taskReminder.setScheduledAt(scheduledAt);
                    return taskReminder;
                  })
              .toList());
    }
    TaskResponse taskResponse =
        new TaskResponse(
            registeredTask.getId(),
            registeredTask.getTitle(),
            registeredTask.getMemo(),
            registeredTask.getDueAt(),
            registeredTask.getIsAllDay(),
            registeredTask.getCompletedAt(),
            registeredTask.getLoadScore(),
            taskReminderRepository.findAllByTaskId(registeredTask.getId()).stream()
                .map(reminder -> reminder.getScheduledAt())
                .toList());
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.setLocation(URI.create("/tasks/" + registeredTask.getId()));
    return new ResponseEntity<>(taskResponse, responseHeaders, HttpStatus.CREATED);
  }

  // タスクの更新
  @PutMapping("/{taskId}")
  @Transactional
  public ResponseEntity<TaskResponse> updateTask(
      @AuthenticationPrincipal TaakUser user,
      @PathVariable("taskId") Integer taskId,
      @RequestBody TaskRequest taskRequest) {
    Optional<TaakTask> optionalTask = taakTaskRepository.findById(taskId);
    if (optionalTask.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
    }
    TaakTask existingTask = optionalTask.get();
    // 他人のタスクを更新しようとした場合は403エラーを返す
    if (!existingTask.getUser().getId().equals(user.getId())) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN, "You do not have permission to update this task");
    }
    existingTask.setTitle(taskRequest.title());
    existingTask.setMemo(taskRequest.memo());
    existingTask.setDueAt(taskRequest.dueAt());
    existingTask.setIsAllDay(taskRequest.isAllDay());
    existingTask.setCompletedAt(taskRequest.completedAt());
    existingTask.setLoadScore(taskRequest.loadScore());
    taakTaskRepository.save(existingTask);

    // リマインダーの更新: 既存のものを削除し、新しいものを登録
    taskReminderRepository.deleteAllByTaskId(taskId);
    if (taskRequest.scheduledAt() == null || taskRequest.scheduledAt().isEmpty()) {
      // スケジュールが指定されていない場合は空のリストを保存
      taskReminderRepository.saveAll(List.of());
    } else {
      taskReminderRepository.saveAll(
          taskRequest.scheduledAt().stream()
              .map(
                  scheduledAt -> {
                    TaskReminder taskReminder = new TaskReminder();
                    taskReminder.setTask(existingTask);
                    taskReminder.setScheduledAt(scheduledAt);
                    return taskReminder;
                  })
              .toList());
    }
    return ResponseEntity.ok(
        new TaskResponse(
            existingTask.getId(),
            existingTask.getTitle(),
            existingTask.getMemo(),
            existingTask.getDueAt(),
            existingTask.getIsAllDay(),
            existingTask.getCompletedAt(),
            existingTask.getLoadScore(),
            taskReminderRepository.findAllByTaskId(existingTask.getId()).stream()
                .map(reminder -> reminder.getScheduledAt())
                .toList()));
  }
}
