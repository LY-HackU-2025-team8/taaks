package com.team8.taak.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
public class GlobalAuthExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ApiResponse( 
            responseCode = "default",
            description = "exception",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    public ErrorResponse handle(Exception  ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @Schema(description = "エラー時のレスポンス")
    public record ErrorResponse(String message) { }
}
