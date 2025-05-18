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
    private String memo = "default memo";

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

}