package com.team8.taaks.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taaks.dto.UsersResponse;
import com.team8.taaks.model.TaakUser;

@RestController
@RequestMapping("/users")
public class TaakUserController {	
    @GetMapping("/me")
	public ResponseEntity<UsersResponse> userInfo(@AuthenticationPrincipal TaakUser user) {
		return ResponseEntity.ok(new UsersResponse(user.getUsername(), user.getId()));
	}
}
