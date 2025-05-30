package com.team8.taaks.config;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@RequiredArgsConstructor
public class NotificationJobScheduler {
  private final JobLauncher jobLauncher;
  private final Job
      notificationJob; // Spring assumes this is the job defined in NotificationBatchConfig

  @Scheduled(cron = "0 * * * * *") // Every minute
  public void launchJob() throws Exception {
    JobParameters params =
        new JobParametersBuilder()
            .addLong("timestamp", System.currentTimeMillis())
            .toJobParameters();
    jobLauncher.run(notificationJob, params);
  }
}
