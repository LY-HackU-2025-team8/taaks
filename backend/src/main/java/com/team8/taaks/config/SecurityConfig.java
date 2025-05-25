package com.team8.taaks.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team8.taaks.dto.ErrorResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakUserRepository;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http, 
        AuthenticationManager authenticationManager, 
        TaakUserDetailManager taakUserDetailManager,
        JwtTokenUtil jwtTokenUtil
        ) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .cors(cors -> {}) // CORS有効化
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/api/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/users").permitAll() // POST /users を許可
                .anyRequest().authenticated())
            .exceptionHandling( exception -> exception
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    String body = new ObjectMapper()
                        .writeValueAsString(
                            new ErrorResponse(authException.getMessage())
                        );
                    response.getWriter().write(body);
                }))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(new AuthorizeFilter(taakUserDetailManager, jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
                                                        PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); // ここでTaakUserDetailManagerが渡される
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsManager users(TaakUserRepository taakUserRepository, PasswordEncoder passwordEncoder) {
        // テスト用の一時ユーザーをDBに登録処理
        TaakUser user = new TaakUser();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("password"));
        user.getRoles().add("USER");
        TaakUserDetailManager manager =  new TaakUserDetailManager(taakUserRepository, passwordEncoder);
        if(! manager.userExists(user.getUsername())) manager.createUser(user);
        return manager;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(java.util.List.of("*")); // Spring 6以降はこちらを推奨
        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(java.util.List.of("*", "Content-Type")); // Content-Typeを明示
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
