package com.team8.taaks.controller;

import com.team8.taaks.dto.LoginRequest;
import com.team8.taaks.dto.LoginResponse;
import com.team8.taaks.dto.LoginServiceResponse;
import com.team8.taaks.dto.UsersResponse;
import com.team8.taaks.service.LoginSerivce;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

  private final LoginSerivce loginService;

  public LoginController(LoginSerivce loginService) {
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(
      @RequestBody LoginRequest loginRequest,
      HttpServletRequest request,
      HttpServletResponse response) {
    LoginServiceResponse loginServiceResponse = loginService.login(loginRequest, request, response);
    response.setHeader("X-AUTH-TOKEN", "Bearer " + loginServiceResponse.token().tokenString());
    response.setContentType("application/json");
    LoginResponse loginResponse =
        new LoginResponse(
            loginServiceResponse.token().tokenString(),
            new UsersResponse(
                loginServiceResponse.user().getUsername(), loginServiceResponse.user().getId()));
    return ResponseEntity.ok(loginResponse);
  }
}
