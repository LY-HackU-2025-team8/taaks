package com.team8.taaks.service;

import com.team8.taaks.config.JwtTokenUtil;
import com.team8.taaks.config.JwtTokenUtil.JwtToken;
import com.team8.taaks.dto.LoginRequest;
import com.team8.taaks.dto.LoginServiceResponse;
import com.team8.taaks.model.TaakUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
  private final AuthenticationManager authenticationManager;
  private final SecurityContextRepository securityContextRepository;
  private final SecurityContextHolderStrategy securityContextHolderStrategy;
  private final JwtTokenUtil jwtTokenUtil;

  public LoginServiceImpl(
      AuthenticationManager authenticationManager,
      SecurityContextRepository securityContextRepository,
      SecurityContextHolderStrategy securityContextHolderStrategy,
      JwtTokenUtil jwtTokenUtil) {
    this.jwtTokenUtil = jwtTokenUtil;
    this.securityContextHolderStrategy = securityContextHolderStrategy;
    this.authenticationManager = authenticationManager;
    this.securityContextRepository = securityContextRepository;
  }

  @Override
  public LoginServiceResponse login(
      LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
    Authentication authenticationRequest =
        UsernamePasswordAuthenticationToken.unauthenticated(
            loginRequest.username(), loginRequest.password());
    Authentication authenticationResponse;
    SecurityContext context = securityContextHolderStrategy.createEmptyContext();
    authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
    context.setAuthentication(authenticationResponse);
    if (authenticationResponse.isAuthenticated()) {
      TaakUser user = (TaakUser) authenticationResponse.getPrincipal();
      JwtToken token = jwtTokenUtil.generateToken(user);
      securityContextHolderStrategy.setContext(context);
      securityContextRepository.saveContext(context, request, response);
      return new LoginServiceResponse(user, token);
    } else {
      throw new BadCredentialsException("Invalid username or password");
    }
  }
}
