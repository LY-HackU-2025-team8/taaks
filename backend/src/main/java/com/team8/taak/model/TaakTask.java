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
    private UUID id;
    
    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String title;

    // ToDo: 255字を超えた時の処理を書く
    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String memo;

    // タイムゾーンのない日時（ex. 2021-05-30T15:47:13.395703）
    @Column(nullable = false)
    private LocalDateTime due_at;

    @Column(nullable = false, columnDefinition= "boolean default false")
    private boolean is_all_day;

    // PostgreSQLのtimestamp型
    @Column(nullable = true, columnDefinition = "timestamp default null")
    private LocalDateTime completed_at;

    // ToDo: FK制約をつける
    @Column(nullable = false, columnDefinition="bigint REFERENCES TaakUser(id)")
    private Long user_id;

    @Column(nullable = false)
    private int load_score;

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
        return due_at;
    }
    public void setDueAt(LocalDateTime due_at) {
        this.due_at = due_at;
    }
    public boolean getIsAllDay() {
        return is_all_day;
    }
    public void setIsAllDay(boolean is_all_day) {
        this.is_all_day = is_all_day;
    }
    public LocalDateTime getCompletedAt() {
        return completed_at;
    }
    public void setCompletedAt(LocalDateTime completed_at) {
        this.completed_at = completed_at;
    }
    public Long getUserId() {
        return user_id;
    }
    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }
    public int getLoadScore() {
        return load_score;
    }
    public void setLoadScore(int load_score) {
        this.load_score = load_score;
    }

}