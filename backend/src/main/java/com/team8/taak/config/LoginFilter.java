package com.team8.taak.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/* * LoginFilterは、ユーザーの認証を行うフィルターです。
 * ユーザー名とパスワードを受け取り、JWTトークンを生成します。
 * トークンは、認証が成功した場合にレスポンスヘッダーに追加されます。
 */
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final String jwtSecret;

    public LoginFilter(AuthenticationManager authenticationManager, String jwtSecret) {
        this.authenticationManager = authenticationManager;
        this.jwtSecret = jwtSecret;
        setFilterProcessesUrl("/login"); // /loginで動作
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Map<String, String> creds = new ObjectMapper().readValue(
                request.getInputStream(),
                new TypeReference<Map<String, String>>() {}
            );
            String username = creds.get("username");
            String password = creds.get("password");
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
            return authenticationManager.authenticate(authToken);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDetails user = (UserDetails) authResult.getPrincipal();
        String token = JWT.create()
                .withSubject(user.getUsername())
                .withClaim("username", user.getUsername())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000)) // 1日有効
                .sign(Algorithm.HMAC256(jwtSecret));
        response.setHeader("X-AUTH-TOKEN", "Bearer " + token);
        Map<String, String> body = new HashMap<>();
        body.put("token", token);
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), body);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        Map<String, String> body = new HashMap<>();
        body.put("error", "Authentication failed");
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), body);
    }
}
