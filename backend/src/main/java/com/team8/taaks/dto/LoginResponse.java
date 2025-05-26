package com.team8.taaks.dto;
import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponse(
    @Schema(required = true)
    String token, 
    @Schema(required = true)
    UsersResponse user
) {}
