package com.team8.taak.controller;

import org.springframework.web.bind.annotation.RestController;

import com.team8.taak.model.TaakUser;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class ApiController {
    @GetMapping("/")
    public ResponseEntity<String> Hello() {
        return ResponseEntity.ok("Hello, World!");
    }
    
    // テスト用のエンドポイント
    @GetMapping("/auth-check")
    public String getAuthenticatedUsername(@AuthenticationPrincipal TaakUser user, @RequestParam(name = "param", required = false) String param) {
        return String.format("Authenticated!\nusername: %s\nparam: %s", user.getUsername(), param);
    }
}
