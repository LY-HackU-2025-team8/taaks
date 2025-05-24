package com.team8.taaks.controller;

import com.team8.taaks.dto.ErrorResponse;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestControllerAdvice
public class GlobalAuthExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ApiResponse( 
            responseCode = "default",
            description = "exception",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    public ErrorResponse handle(Exception  ex) {
        if (ex instanceof ResponseStatusException) {
            return new ErrorResponse(((ResponseStatusException) ex).getReason());
        }
        return new ErrorResponse(ex.getMessage());
    }

}
