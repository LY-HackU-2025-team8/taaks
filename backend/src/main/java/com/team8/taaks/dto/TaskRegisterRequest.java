package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public record TaskRegisterRequest(
    @Schema(required = true) String title,
    @Schema(required = true) String memo,
    @Schema(required = true) LocalDateTime dueAt,
    @Schema(required = true) boolean isAllDay,
    LocalDateTime completedAt,
    @Schema(required = true) int loadScore,
    List<ZonedDateTime> scheduledAt,
    boolean autoCalculateLoadScore) {}
