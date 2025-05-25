package com.team8.taaks.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

/**
 * Represents a diary entry in the system, mapped to the 'diary' table.
 *
 * Database mapping:
 * - id: Primary key, auto-generated (int)
 * - title: Title of the diary (varchar, NOT NULL, default: '')
 * - body: Body text (text, NOT NULL, default: '')
 * - date: Date of the diary (date, NOT NULL)
 * - user: Foreign key to the user who wrote the diary (user_id, int, NOT NULL)
 *
 * The 'user' field is mapped as @ManyToOne to the TaakUser (taak_user) table, representing the author of the diary entry.
 *
 * This class comment and design were created by human instruction to Copilot (AI).
 */
@Entity
@Table(name = "diary")
public class Diary {
    /** Diary ID (Primary key, auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** Title of the diary (NOT NULL, default: '') */
    @Column(nullable = false)
    private String title = "";

    /** Body text (NOT NULL, default: '') */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String body = "";

    /** Date of the diary (NOT NULL) */
    @Column(nullable = false)
    private LocalDate date;

    /**
     * The user who wrote the diary (foreign key: user_id)
     * Many-to-one relationship to TaakUser entity
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private TaakUser user;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt;

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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public TaakUser getUser() {
        return user;
    }

    public void setUser(TaakUser user) {
        this.user = user;
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
