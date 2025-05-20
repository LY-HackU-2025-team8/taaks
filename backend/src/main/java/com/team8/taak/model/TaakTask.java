package com.team8.taak.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TaakTask{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(nullable = false, updatable=false)
    private Integer id;
    
    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String title;

    @Column(nullable = false, columnDefinition = "text default ''")
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private TaakUser user;

    @Column(nullable = false)
    private int loadScore;

    // 空のコンストラクタ
    public TaakTask(){
    }

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
    public TaakUser getUser() {
        return user;
    }
    public void setUser(TaakUser user) {
        this.user = user;
    }
    public int getLoadScore() {
        return loadScore;
    }
    public void setLoadScore(int loadScore) {
        this.loadScore = loadScore;
    }
}