package com.team8.taaks.service;

import com.team8.taaks.dto.LoginRequest;
import com.team8.taaks.dto.LoginServiceResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
  LoginServiceResponse login(
      LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response);
}
