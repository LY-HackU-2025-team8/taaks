package com.team8.taaks.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Represents a buddy in the system, mapped to the 'buddy' table.
 *
 * <p>Database mapping: - id: Primary key, auto-generated (BIGINT) - user: Foreign key to the user
 * this buddy belongs to (user_id, BIGINT, NOT NULL, UNIQUE, ON DELETE CASCADE) - nickname: Buddy's
 * nickname (TEXT, NOT NULL) - hairStyle: Foreign key to buddy_hair_style (hair_style_id, BIGINT,
 * NOT NULL) - clothes: Foreign key to buddy_clothes (clothes_id, BIGINT, NOT NULL) - color: Foreign
 * key to buddy_color (color_id, BIGINT, NOT NULL) - name: Buddy's internal name (TEXT, NOT NULL) -
 * createdAt: Timestamp of creation (TIMESTAMPTZ, NOT NULL, default: current_timestamp) - updatedAt:
 * Timestamp of last update (TIMESTAMPTZ, NOT NULL, default: current_timestamp)
 *
 * <p>Relationships: - user: One-to-one with TaakUser.
 *
 * <p>This class comment and design were created based on user instruction and similar entities.
 */
@Entity
@Table(name = "buddy")
public class Buddy {

  /** Buddy ID (Primary key, auto-generated) */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** The user this buddy belongs to (Foreign key: user_id, UNIQUE) */
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private TaakUser user;

  /** Buddy's nickname (display name) (NOT NULL) */
  @Column(nullable = false, columnDefinition = "TEXT")
  private String nickname;

  /** Hair style ID of the buddy (Foreign key: hair_style_id) */
  @Column(name = "hair_style_id", nullable = false)
  private Long hairStyleId;

  /** Clothes ID of the buddy (Foreign key: clothes_id) */
  @Column(name = "clothes_id", nullable = false)
  private Long clothesId;

  /** Theme color ID of the buddy (Foreign key: color_id) */
  @Column(name = "color_id", nullable = false)
  private Long colorId;

  /** Buddy's name (internal identifier, etc.) (NOT NULL) */
  @Column(nullable = false, columnDefinition = "TEXT")
  private String name;

  /** Timestamp of creation (NOT NULL, default: current_timestamp) */
  @CreationTimestamp
  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      columnDefinition = "TIMESTAMPTZ")
  private OffsetDateTime createdAt;

  /** Timestamp of last update (NOT NULL, default: current_timestamp) */
  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
  private OffsetDateTime updatedAt;

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

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public Long getHairStyleId() {
    return hairStyleId;
  }

  public void setHairStyleId(Long hairStyleId) {
    this.hairStyleId = hairStyleId;
  }

  public Long getClothesId() {
    return clothesId;
  }

  public void setClothesId(Long clothesId) {
    this.clothesId = clothesId;
  }

  public Long getColorId() {
    return colorId;
  }

  public void setColorId(Long colorId) {
    this.colorId = colorId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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
