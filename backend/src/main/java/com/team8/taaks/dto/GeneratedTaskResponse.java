package com.team8.taaks.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

public record GeneratedTaskResponse(
        @Schema(required = true) String title,
        @Schema(required = true) LocalDateTime dueAt,
        @Schema(required = false) Integer loadScore) {
}
