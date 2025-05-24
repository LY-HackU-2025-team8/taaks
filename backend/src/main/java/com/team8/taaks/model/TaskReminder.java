package com.team8.taaks.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;


/**
 * Represents a task reminder to be sent, mapped to the 'task_reminder' table.
 *
 * Database mapping:
 * - id: Primary key, auto-generated (BIGINT)
 * - task_id: Foreign key to the task (BIGINT, NOT NULL)
 * - scheduled_at: Scheduled time for sending the reminder (TIMESTAMP WITH TIME ZONE, NOT NULL)
 * - created_at: Timestamp of creation (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
 * - updated_at: Timestamp of last update (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
 */
@Entity
@Table(name = "task_reminder", indexes = { 
    @Index(name = "idx_task_reminder_task_id", columnList = "task_id"),
    @Index(name = "idx_task_reminder_scheduled_at", columnList = "scheduled_at")
})
public class TaskReminder {

    /** Unique identifier (Primary key, auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Task associated with this reminder (Foreign key: task_id) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private TaakTask task; 

    /** Scheduled time for sending the reminder (NOT NULL) */
    @Column(name = "scheduled_at", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime scheduledAt;

    /** Record creation timestamp (NOT NULL, DEFAULT CURRENT_TIMESTAMP) */
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt;

    /** Record last update timestamp (NOT NULL, DEFAULT CURRENT_TIMESTAMP) */
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaakTask getTask() {
        return task;
    }

    public void setTask(TaakTask task) {
        this.task = task;
    }

    public ZonedDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(ZonedDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
