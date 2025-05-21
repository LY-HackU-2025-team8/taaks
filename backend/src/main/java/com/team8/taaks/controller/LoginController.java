package com.team8.taaks.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taaks.config.JwtTokenUtil;
import com.team8.taaks.model.TaakUser;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class LoginController {

	private final AuthenticationManager authenticationManager;
	private final SecurityContextRepository securityContextRepository;
	private final SecurityContextHolderStrategy securityContextHolderStrategy;
	private final JwtTokenUtil jwtTokenUtil;

	public LoginController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenUtil = jwtTokenUtil;
		securityContextRepository = new HttpSessionSecurityContextRepository();
		securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
	}


	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
		Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
		Authentication authenticationResponse;
		try {
			authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
		} catch (org.springframework.security.core.AuthenticationException ex) {
			return ResponseEntity.status(401).build();
		}
		SecurityContext context = securityContextHolderStrategy.createEmptyContext();
		context.setAuthentication(authenticationResponse); 
		TaakUser user = (TaakUser) authenticationResponse.getPrincipal();
		String token = jwtTokenUtil.generateToken(user);
		response.setHeader("X-AUTH-TOKEN", "Bearer " + token);
        response.setContentType("application/json");
		securityContextHolderStrategy.setContext(context);
		securityContextRepository.saveContext(context, request, response); 
        if (authenticationResponse.isAuthenticated()) {
			LoginResponse loginResponse = new LoginResponse(token, new UsersResponse(user.getUsername(), user.getNickName(), user.getId()));
            return ResponseEntity.ok(loginResponse);
        } else {
			return ResponseEntity.status(401).build();
        }
	}

	@GetMapping("/users/me")
	public ResponseEntity<UsersResponse> userInfo(@AuthenticationPrincipal TaakUser user) {
		return ResponseEntity.ok(new UsersResponse(user.getUsername(), user.getNickName(), user.getId()));
	}
	

	public record LoginRequest(String username, String password) {
	}
	public record UsersResponse(String username, String nickname, Long id) {
	}
	public record LoginResponse(String token, UsersResponse user) {
	}
}
