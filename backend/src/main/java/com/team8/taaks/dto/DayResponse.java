package com.team8.taaks.dto;

import java.time.LocalDate;

public record DayResponse(LocalDate date, Long loadScore, Long uncompletedTaskCount) {}
