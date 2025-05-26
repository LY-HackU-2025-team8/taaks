package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.OffsetDateTime;

public record NotificationTargetTokenResponse(
    @Schema(required = true) Long id,
    @Schema(required = true) String targetToken,
    @Schema(required = true) Long userId, // Or a UserSummaryDto if you need more user details
    @Schema(required = true) OffsetDateTime createdAt,
    @Schema(required = true) OffsetDateTime updatedAt) {}
