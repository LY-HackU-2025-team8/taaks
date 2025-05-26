package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record ErrorResponse(@Schema(required=true, description = "エラー時のレスポンス") String message) { }
