package com.team8.taaks.config;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.team8.taaks.model.NotificationTargetToken;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.model.TaskReminder;
import com.team8.taaks.repository.NotificationTargetTokenRepository;
import com.team8.taaks.repository.TaskReminderRepository;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class NotificationBatchConfig {

  private final TaskReminderRepository taskReminderRepository;
  private final NotificationTargetTokenRepository notificationTargetTokenRepository;

  public NotificationBatchConfig(
      TaskReminderRepository taskReminderRepository,
      NotificationTargetTokenRepository notificationTargetTokenRepository) {
    this.taskReminderRepository = taskReminderRepository;
    this.notificationTargetTokenRepository = notificationTargetTokenRepository;
  }

  @Bean
  public Job notificationJob(JobRepository jobRepository, PlatformTransactionManager txManager) {
    return new JobBuilder("notificationJob", jobRepository)
        .start(sendMessageStep(jobRepository, txManager))
        .build();
  }

  @Bean
  public Step sendMessageStep(JobRepository jobRepository, PlatformTransactionManager txManager) {
    return new StepBuilder("notificationStep", jobRepository)
        .tasklet(
            (contribution, chunkContext) -> {
              System.out.println("Starting notification task...");
              List<TaskReminder> notificationTasks =
                  taskReminderRepository.findByNotifiedAtIsNullAndScheduledAtBefore(
                      ZonedDateTime.now());
              notificationTasks.forEach(
                  notificationTask -> {
                    String messageBody = notificationTask.getTask().getTitle();
                    TaakUser targetUser = notificationTask.getTask().getUser();
                    List<NotificationTargetToken> notificationTargetTokens =
                        notificationTargetTokenRepository.findByUserId(targetUser.getId());
                    notificationTargetTokens.forEach(
                        notificationTargetToken -> {
                          String registrationToken = notificationTargetToken.getTargetToken();
                          if (registrationToken == null || registrationToken.isEmpty()) {
                            System.err.println("No registration token found for user");
                            return;
                          }
                          Message message =
                              Message.builder()
                                  .setToken(registrationToken)
                                  .putData("body", messageBody)
                                  .build();
                          // GOOGLE_APPLICATION_CREDENTIALS must be set in the environment to
                          // authenticate with Firebase
                          // see https://firebase.google.com/docs/cloud-messaging/auth-server?hl=ja
                          try {
                            String response = FirebaseMessaging.getInstance().send(message);
                            System.out.println("Successfully sent message: " + response);
                          } catch (FirebaseMessagingException e) {
                            System.err.println("Failed to send message: " + e.getMessage());
                          }
                        });
                  });
              return RepeatStatus.FINISHED;
            },
            txManager)
        .build();
  }
}
