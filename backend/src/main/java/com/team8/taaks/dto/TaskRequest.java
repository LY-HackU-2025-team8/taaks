package com.team8.taaks.dto;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public record TaskRequest(
    String title,
    String memo,
    LocalDateTime dueAt,
    boolean isAllDay,
    LocalDateTime completedAt,
    int loadScore,
    List<ZonedDateTime> scheduledAt) {}
