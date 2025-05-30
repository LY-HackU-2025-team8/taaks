package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record GeneratedTaskResponse(
    @Schema(required = true) String title,
    @Schema(required = true) LocalDateTime dueAt,
    @Schema(required = true) int loadScore) {}
