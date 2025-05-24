package com.team8.taaks.repository;

import com.team8.taaks.model.TaskRemind;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface TaskRemindRepository extends JpaRepository<TaskRemind, Long> {

    /**
     * Finds all notifications scheduled at or after a given start time and before a given end time.
     *
     * @param scheduledAtStart The inclusive start ZonedDateTime for the scheduled_at field.
     * @param scheduledAtEnd The exclusive end ZonedDateTime for the scheduled_at field.
     * @return A list of Notification entities that fall within the specified time range.
     *         Returns an empty list if no notifications are found in that range.
     */
    List<TaskRemind> findByScheduledAtGreaterThanEqualAndScheduledAtBefore(ZonedDateTime scheduledAtStart, ZonedDateTime scheduledAtEnd);

    /**
     * Finds all notifications scheduled at or after a given ZonedDateTime.
     *
     * @param scheduledTime The ZonedDateTime to compare against the scheduled_at field.
     * @return A list of Notification entities scheduled at or after the given time.
     */
    List<TaskRemind> findByScheduledAtGreaterThanEqual(ZonedDateTime scheduledTime);

    /**
     * Finds all notifications scheduled before a given ZonedDateTime.
     *
     * @param scheduledTime The ZonedDateTime to compare against the scheduled_at field.
     * @return A list of Notification entities scheduled before the given time.
     */
    List<TaskRemind> findByScheduledAtBefore(ZonedDateTime scheduledTime);
}
