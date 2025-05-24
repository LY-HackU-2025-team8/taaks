package com.team8.taaks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record NotificationTargetTokenRequest(
    @NotBlank @JsonProperty("target_token") String targetToken
) {}
