package com.team8.taak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.web.csrf.CsrfToken;


@RestController
public class LoginController {

	private final AuthenticationManager authenticationManager;
	private final SecurityContextRepository securityContextRepository;
	private final SecurityContextHolderStrategy securityContextHolderStrategy;

	public LoginController(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
		securityContextRepository = new HttpSessionSecurityContextRepository();
		securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
	}

	@GetMapping("/csrf")
	public ResponseEntity<Void> csrfToken(HttpServletRequest request) {
		CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
		if (csrfToken == null) {
			return ResponseEntity.status(404).build();
		}
		return ResponseEntity.ok()
			.header(csrfToken.getHeaderName(), csrfToken.getToken())
			.build();
	}

	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
		Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
		Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
		SecurityContext context = securityContextHolderStrategy.createEmptyContext();
		context.setAuthentication(authenticationResponse); 
		securityContextHolderStrategy.setContext(context);
		securityContextRepository.saveContext(context, request, response); 
        if (authenticationResponse.isAuthenticated()) {
            return ResponseEntity.ok().build();
        } else {
			return ResponseEntity.status(401).build();
        }
	}

	public record LoginRequest(String username, String password) {
	}

}
