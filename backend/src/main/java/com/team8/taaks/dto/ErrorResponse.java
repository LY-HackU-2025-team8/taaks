package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "エラー時のレスポンス")
public record ErrorResponse(@Schema(required = true) String message) {}
