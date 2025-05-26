package com.team8.taaks.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record GenericMessageResponse(@Schema(required = true) String message) {}
