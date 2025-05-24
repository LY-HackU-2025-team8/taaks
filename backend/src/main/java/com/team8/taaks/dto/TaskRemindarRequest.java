package com.team8.taaks.dto;

import java.time.ZonedDateTime;

public record TaskRemindarRequest(
    Long task_id,
    ZonedDateTime scheduled_at
) {
}
