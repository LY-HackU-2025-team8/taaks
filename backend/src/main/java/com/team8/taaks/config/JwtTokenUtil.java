package com.team8.taaks.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.team8.taaks.model.TaakUser;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
  @Value("${jwt.secret}")
  private String jwtSecret;

  public record JwtToken(String tokenString) {}

  public JwtToken generateToken(TaakUser user) {
    return new JwtToken(
        JWT.create()
            .withSubject(user.getUsername())
            .withClaim("username", user.getUsername())
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 86400000)) // 1日有効
            .sign(Algorithm.HMAC256(jwtSecret)));
  }

  public DecodedJWT decodeToken(String token) {
    return com.auth0.jwt.JWT.require(Algorithm.HMAC256(jwtSecret)).build().verify(token);
  }
}
