package com.team8.taak.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaakTask{
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Column(columnDefinition="uuid", nullable = false, updatable=false)
    private UUID id;
    
    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String title;

    // ToDo: 255字を超えた時の処理を書く
    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String memo;

    // タイムゾーンのない日時（ex. 2021-05-30T15:47:13.395703）
    @Column(nullable = false)
    private LocalDateTime dueAt;

    @Column(nullable = false, columnDefinition= "boolean default false")
    private boolean isAllDay;

    // PostgreSQLのtimestamp型
    @Column(nullable = true, columnDefinition = "timestamp default null")
    private LocalDateTime completedAt;

    // ToDo: FK制約をつける columnDefinition="bigint REFERENCES TaakUser(id)"
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private int loadScore;

    // 空のコンストラクタ
    public TaakTask(){
    }

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getMemo() {
        return memo;
    }
    public void setMemo(String memo) {
        this.memo = memo;
    }   
    public LocalDateTime getDueAt() {
        return dueAt;
    }
    public void setDueAt(LocalDateTime dueAt) {
        this.dueAt = dueAt;
    }
    public boolean getIsAllDay() {
        return isAllDay;
    }
    public void setIsAllDay(boolean isAllDay) {
        this.isAllDay = isAllDay;
    }
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public int getLoadScore() {
        return loadScore;
    }
    public void setLoadScore(int loadScore) {
        this.loadScore = loadScore;
    }

}