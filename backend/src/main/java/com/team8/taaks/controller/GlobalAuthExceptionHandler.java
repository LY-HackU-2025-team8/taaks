package com.team8.taaks.controller;

import com.team8.taaks.dto.ErrorResponse;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestControllerAdvice
public class GlobalAuthExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ApiResponse(
            responseCode = "default",
            description = "exception",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    public ResponseEntity<ErrorResponse> handle(Exception  ex) {
        if (ex instanceof ResponseStatusException) {
            return ResponseEntity
                    .status(((ResponseStatusException) ex).getStatusCode())
                    .body(new ErrorResponse(((ResponseStatusException) ex).getReason()));
        } else if (ex instanceof HttpMessageNotReadableException) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Bad Request: " + ex.getMessage()));
        } else if (ex instanceof BadCredentialsException) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Unauthorized: " + ex.getMessage()));
        } else if (ex instanceof HttpRequestMethodNotSupportedException) {
            return ResponseEntity
                    .status(HttpStatus.METHOD_NOT_ALLOWED)
                    .body(new ErrorResponse("Method Not Allowed: " + ex.getMessage()));
        }
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Internal Server Error: " + ex.getMessage()));
    }
}
