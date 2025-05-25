package com.team8.taaks.config;

import java.util.List;
import java.time.ZonedDateTime;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.team8.taaks.repository.TaskReminderRepository;
import com.team8.taaks.model.TaskReminder;

@Configuration
public class NotificationBatchConfig {

    private final TaskReminderRepository taskReminderRepository;

    public NotificationBatchConfig(TaskReminderRepository taskReminderRepository) {
        this.taskReminderRepository = taskReminderRepository;
    }

    @Bean
    public Job notificationJob(JobRepository jobRepository, PlatformTransactionManager txManager) {
        return new JobBuilder("notificationJob", jobRepository)
                .start(sendMessageStep(jobRepository, txManager))
                .build();
    }

    @Bean
    public Step sendMessageStep(JobRepository jobRepository, PlatformTransactionManager txManager) {
        return new StepBuilder("helloStep", jobRepository)
                .tasklet((contribution, chunkContext) -> {

                    List<TaskReminder> notificationTasks = taskReminderRepository.findByNotifiedAtIsNullAndScheduledAtBefore(ZonedDateTime.now());
                    notificationTasks.forEach(n -> {
                        String registrationToken = "dummy";
                        String messageBody = "Hello, World! Yes We Can!";
                        Message message = Message.builder()
                                .setToken(registrationToken)
                                .putData("body", messageBody)
                                .build();
                        // GOOGLE_APPLICATION_CREDENTIALS must be set in the environment to authenticate with Firebase
                        try {
                            String response = FirebaseMessaging.getInstance().send(message);
                            System.out.println("Successfully sent message: " + response);
                        } catch (FirebaseMessagingException e) {
                            System.err.println("Failed to send message: " + e.getMessage());
                        }
                    });
                    return RepeatStatus.FINISHED;
                }, txManager)
                .build();
    }
}   
