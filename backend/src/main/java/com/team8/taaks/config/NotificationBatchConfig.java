package com.team8.taaks.config;

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

@Configuration
public class NotificationBatchConfig {

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
                    String registrationToken = "dummy";
                    String messageBody = "Hello, World! Yes We Can!";
                    Message message = Message.builder()
                            .setToken(registrationToken)
                            .putData("body", messageBody)
                            .build();
                    String response = FirebaseMessaging.getInstance().send(message);
                    System.out.println("Successfully sent message: " + response);
                    return RepeatStatus.FINISHED;
                }, txManager)
                .build();
    }
}   
