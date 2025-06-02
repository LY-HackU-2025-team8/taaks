package com.team8.taaks.repository;

import com.team8.taaks.model.TaskReminder;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskReminderRepository extends JpaRepository<TaskReminder, Long> {

  /**
   * Finds all task reminders scheduled at or after a given start time and before a given end time.
   *
   * @param scheduledAtStart The inclusive start ZonedDateTime for the scheduled_at field.
   * @param scheduledAtEnd The exclusive end ZonedDateTime for the scheduled_at field.
   * @return A list of TaskReminder entities that fall within the specified time range. Returns an
   *     empty list if no task reminders are found in that range.
   */
  List<TaskReminder> findByScheduledAtGreaterThanEqualAndScheduledAtBefore(
      ZonedDateTime scheduledAtStart, ZonedDateTime scheduledAtEnd);

  /**
   * Finds all task reminders scheduled at or after a given ZonedDateTime.
   *
   * @param scheduledTime The ZonedDateTime to compare against the scheduled_at field.
   * @return A list of TaskReminder entities scheduled at or after the given time.
   */
  List<TaskReminder> findByScheduledAtGreaterThanEqual(ZonedDateTime scheduledTime);

  /**
   * Finds all task reminders scheduled before a given ZonedDateTime.
   *
   * @param scheduledTime The ZonedDateTime to compare against the scheduled_at field.
   * @return A list of TaskReminder entities scheduled before the given time.
   */
  List<TaskReminder> findByScheduledAtBefore(ZonedDateTime scheduledTime);

  /**
   * Finds all task reminders associated with a given task ID.
   *
   * @param taskId The ID of the task.
   * @return A list of TaskReminder entities for the specified task ID.
   */
  List<TaskReminder> findAllByTaskId(Integer taskId);

  /**
   * Deletes all task reminders associated with a given task ID.
   *
   * @param taskId The ID of the task whose reminders are to be deleted.
   */
  void deleteAllByTaskId(Integer taskId);

  /**
   * Finds all task reminders that have not been notified and are scheduled before the current time.
   *
   * @param scheduledAt The ZonedDateTime to compare against the scheduled_at field.
   * @return A list of TaskReminder entities that have not been notified and are due.
   */
  List<TaskReminder> findByNotifiedAtIsNullAndScheduledAtBetween(
      ZonedDateTime startTime, ZonedDateTime endTime);
}
