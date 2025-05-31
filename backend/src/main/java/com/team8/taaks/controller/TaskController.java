package com.team8.taaks.controller;

import com.team8.taaks.dto.TaskRegisterRequest;
import com.team8.taaks.dto.TaskRequest;
import com.team8.taaks.dto.TaskResponse;
import com.team8.taaks.model.TaakTask;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.model.TaskReminder;
import com.team8.taaks.repository.TaakTaskRepository;
import com.team8.taaks.repository.TaskReminderRepository;
import com.team8.taaks.service.OpenAiChatService;
import com.team8.taaks.specification.TaakTaskSpecification;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = {"localhost:3000", "https://taak.app"})
@RestController
@RequestMapping("/tasks")
public class TaskController {
  private final TaakTaskRepository taakTaskRepository;
  private final TaskReminderRepository taskReminderRepository;

  // 環境変数が必要：OPENAI_API_KEY, OPENAI_ORG_ID, OPENAI_PROJECT_ID
  private final OpenAiChatService openAiChatService = new OpenAiChatService();

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
    return ResponseEntity.ok(taskResponse);
  }

  // タスクの登録
  @PostMapping
  public ResponseEntity<TaskResponse> createTask(
      @AuthenticationPrincipal TaakUser user, @RequestBody TaskRegisterRequest taskRequest) {
    TaakTask task = new TaakTask();
    task.setUser(user);
    task.setTitle(taskRequest.title());
    task.setMemo(taskRequest.memo());
    task.setDueAt(taskRequest.dueAt());
    task.setIsAllDay(taskRequest.isAllDay());
    task.setCompletedAt(taskRequest.completedAt());
    if (taskRequest.autoCalculateLoadScore()) {
      // 負荷スコアをLLMで自動計算
      List<TaakTask> existingTasks =
          taakTaskRepository.findAllByUserIdAndDueAtBetween(
              user.getId(),
              LocalDateTime.now().minusDays(7), // 過去7日間のタスクを考慮
              LocalDateTime.now());
      System.out.println(existingTasks);
      String prompt = "### 指示,\n"
            + //
            "バディの追加したタスクを解析して、ストレスレベルを返答してください。\n"
            + "### 背景,\n"
            + "あなたのバディが１日の見通しを立てられるように、タスクの負荷スコアを考える必要があります。 \n"
            + "### 出力のフォーマット,\n"
            + "負荷スコアを1~10の間で算出してください。返答は数字のみでお願いします。 \n"
            // + "### 考え方,\n"
            // + "負荷スコアはタスクの難しさやストレスレベルを表す指標です。タスクの内容、期限までの時間、タスクの重要度などを考慮して、1から10の範囲でスコアを算出してください。\n"
            + "### 例題,\n"
            + "タイトル： 部屋の掃除をする"
            + "\n期限までの時間（hours）： 24\n"
            + "出力： 2\n"
            + existingTasks.stream()
              .limit(5)
              .map(t -> "\nタイトル： " + t.getTitle()
                + "\n出力： " + t.getLoadScore() + "\n")
              .reduce("", (a, b) -> a + b)
            + "### 入力"
            + "タイトル： " + taskRequest.title()
            + "\n期限までの時間（hours）： "
            + Duration.between(LocalDateTime.now(), taskRequest.dueAt()).toHours();
        System.out.println(prompt);
      try {
        int loadScore =
            openAiChatService.calcLoadScore(prompt
              );
        task.setLoadScore(loadScore);
      } catch (Exception e) {
        // OpenAI APIの呼び出しに失敗した場合は、負荷スコアを0に設定
        task.setLoadScore(0);
        System.err.println("An error occurred while communicating: " + e.getMessage());
      }
    } else {
      task.setLoadScore(taskRequest.loadScore());
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
    return ResponseEntity.created(URI.create("/tasks/" + registeredTask.getId()))
        .body(taskResponse);
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

  // タスクの削除
  @Transactional
  @Operation(
      summary = "タスクの削除",
      description = "指定したIDのタスクを削除します。",
      responses = {@ApiResponse(responseCode = "204", description = "削除成功（No Content）")})
  @DeleteMapping("/{taskId}")
  public ResponseEntity<Void> deleteTask(
      @AuthenticationPrincipal TaakUser user, @PathVariable("taskId") Integer taskId) {
    Optional<TaakTask> optionalTask = taakTaskRepository.findById(taskId);
    if (optionalTask.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
    }
    TaakTask existingTask = optionalTask.get();
    // 他人のタスクを削除しようとした場合は403エラーを返す
    if (!existingTask.getUser().getId().equals(user.getId())) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN, "You do not have permission to delete this task");
    }
    taskReminderRepository.deleteAllByTaskId(taskId);
    taakTaskRepository.delete(existingTask);
    return ResponseEntity.noContent().build();
  }
}
