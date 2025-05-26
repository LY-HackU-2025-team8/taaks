package com.team8.taaks.dto;
import io.swagger.v3.oas.annotations.media.Schema;

public record UsersResponse(
    @Schema(required = true)
    String username, 
    @Schema(required = true)
    Long id
) {}
