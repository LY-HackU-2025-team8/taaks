package com.team8.taak.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import java.util.UUID;
import java.time.*;

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
    public void setDueAt(LocalDateTime due_at) {
        this.dueAt = due_at;
    }
    public boolean getIsAllDay() {
        return isAllDay;
    }
    public void setIsAllDay(boolean is_all_day) {
        this.isAllDay = is_all_day;
    }
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    public void setCompletedAt(LocalDateTime completed_at) {
        this.completedAt = completed_at;
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
    public void setLoadScore(int load_score) {
        this.loadScore = load_score;
    }

}