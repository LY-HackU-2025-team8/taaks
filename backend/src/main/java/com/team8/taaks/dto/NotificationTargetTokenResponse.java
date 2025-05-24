package com.team8.taaks.dto;

import java.time.OffsetDateTime;

public record NotificationTargetTokenResponse(
    Long id,
    String targetToken,
    Long userId, // Or a UserSummaryDto if you need more user details
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
