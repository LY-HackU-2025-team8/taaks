package com.team8.taaks.controller;

public class OpenAiApiException extends RuntimeException {
    private final int statusCode;
    private final String errorBody;

    public OpenAiApiException(int statusCode, String errorBody) {
        super("OpenAI API Error: " + statusCode);
        this.statusCode = statusCode;
        this.errorBody = errorBody;
    }

    public int getStatusCode() {
        return statusCode;
    }
    public String getErrorBody() {
        return errorBody;
    }
}