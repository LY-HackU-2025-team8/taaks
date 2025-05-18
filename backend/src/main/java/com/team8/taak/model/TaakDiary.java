package com.team8.taak.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;
import java.time.LocalDate;

@Entity
public class TaakDiary{
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String title;

    @Column(nullable = false, columnDefinition = "varchar(255) default ''")
    private String body;

    private LocalDate date;

    @Column(nullable = false, columnDefinition="bigint REFERENCES TaakUser(id)")
    private Long user_id;
}