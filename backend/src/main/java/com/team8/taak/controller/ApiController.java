package com.team8.taak.controller;

import org.springframework.web.bind.annotation.RestController;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class ApiController {
    @GetMapping("/")
    public String getMethodName(@AuthenticationPrincipal UserDetails user) {
        return String.format("Authenticated: %s", user.getUsername());
    }
    
}
