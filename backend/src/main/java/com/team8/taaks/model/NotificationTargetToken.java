package com.team8.taaks.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

/**
 * Represents a user's notification target device token.
 *
 * <p>Database mapping: - id: Primary key, auto-generated (BIGINT) - user_id: Foreign key to the
 * user (BIGINT, NOT NULL) - target_token: Device token for notifications (TEXT, UNIQUE, NOT NULL) -
 * created_at: Timestamp of creation (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
 * - updated_at: Timestamp of last update (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT
 * CURRENT_TIMESTAMP)
 */
@Entity
@Table(
    name = "notification_target_token",
    indexes = {@Index(name = "idx_notification_target_token_user_id", columnList = "user_id")})
public class NotificationTargetToken {

  /** Unique identifier (Primary key, auto-generated) */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** User associated with this token (Foreign key: user_id) */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private TaakUser user;

  /** Notification target device token (UNIQUE, NOT NULL) */
  @Column(name = "target_token", nullable = false, unique = true, columnDefinition = "TEXT")
  private String targetToken;

  /** Record creation timestamp (NOT NULL, DEFAULT CURRENT_TIMESTAMP) */
  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private OffsetDateTime createdAt;

  /** Record last update timestamp (NOT NULL, DEFAULT CURRENT_TIMESTAMP) */
  @Column(
      name = "updated_at",
      nullable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
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

  public TaakUser getUser() {
    return user;
  }

  public void setUser(TaakUser user) {
    this.user = user;
  }

  public String getTargetToken() {
    return targetToken;
  }

  public void setTargetToken(String targetToken) {
    this.targetToken = targetToken;
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
