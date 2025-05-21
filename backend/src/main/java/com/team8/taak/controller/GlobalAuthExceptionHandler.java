package com.team8.taak.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
public class GlobalAuthExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ApiResponse(            // OpenAPI に 401 を登録
            responseCode = "default",
            description = "exception",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    public ErrorResponse handle403(Exception  ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @Schema(description = "エラー時のレスポンス")
    public record ErrorResponse(String message) { }
}
