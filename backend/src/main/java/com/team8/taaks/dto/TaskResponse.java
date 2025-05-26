package com.team8.taaks.dto;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record TaskResponse(
    @Schema(required=true)
    Integer id,
    @Schema(required=true)
    String title,
    @Schema(required=true)
    String memo,
    @Schema(required=true)
    LocalDateTime dueAt,
    @Schema(required=true)
    boolean isAllDay,
    LocalDateTime completedAt,
    @Schema(required=true)
    int loadScore,
    @Schema(required=true)
    List<ZonedDateTime> scheduledAt
) {}
