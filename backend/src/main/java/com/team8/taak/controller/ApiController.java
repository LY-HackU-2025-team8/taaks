package com.team8.taak.controller;

import org.springframework.web.bind.annotation.RestController;

import com.team8.taak.model.TaakUser;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class ApiController {
    @GetMapping("/")
    public String getMethodName(@AuthenticationPrincipal TaakUser user) {
        return String.format("Authenticated: %s", user.getUsername());
    }
    
}
