package com.team8.taaks.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.team8.taaks.config.JwtTokenUtil;
import com.team8.taaks.dto.ChangePasswordRequest;
import com.team8.taaks.dto.ChangeUsernameRequest;
import com.team8.taaks.dto.DeleteAccountRequest;
import com.team8.taaks.dto.GenericMessageResponse;
import com.team8.taaks.dto.LoginResponse;
import com.team8.taaks.dto.UserRegistrationRequest;
import com.team8.taaks.dto.UsersResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakUserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;

@RestController
@RequestMapping("/users")
public class TaakUserController {

    private final TaakUserRepository taakUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    public TaakUserController(TaakUserRepository taakUserRepository, PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil, UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
        this.taakUserRepository = taakUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/me")
	public ResponseEntity<UsersResponse> userInfo(@AuthenticationPrincipal TaakUser user) {
		return ResponseEntity.ok(new UsersResponse(user.getUsername(), user.getId()));
	}

    @PostMapping
    public ResponseEntity<LoginResponse> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        if (registrationRequest.password().length() < 12) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "password must be at least 12 characters");        }
        if (taakUserRepository.findByUsername(registrationRequest.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "username is already in use");
        }

        TaakUser newUser = new TaakUser();
        newUser.setUsername(registrationRequest.username());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.password()));
        TaakUser savedUser = taakUserRepository.save(newUser);
        UserDetails userDetails = userDetailsService.loadUserByUsername(registrationRequest.username());
            SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                )
            );
        String token = jwtTokenUtil.generateToken(savedUser);
        UsersResponse userResponse = new UsersResponse(savedUser.getUsername(), savedUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(new LoginResponse(token, userResponse));
    }

    @PatchMapping("/me/username")
    public ResponseEntity<UsersResponse> changeUsername(@AuthenticationPrincipal TaakUser currentUser, @RequestBody ChangeUsernameRequest changeUsernameRequest) {
        if (taakUserRepository.findByUsername(changeUsernameRequest.newUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "username is already in use");
        }
        currentUser.setUsername(changeUsernameRequest.newUsername());
        TaakUser updatedUser = taakUserRepository.save(currentUser);
        return ResponseEntity.ok(new UsersResponse(updatedUser.getUsername(), updatedUser.getId()));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<GenericMessageResponse> changePassword(@AuthenticationPrincipal TaakUser currentUser, @RequestBody ChangePasswordRequest changePasswordRequest) {
        if (!passwordEncoder.matches(changePasswordRequest.oldPassword(), currentUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new GenericMessageResponse("current password is incorrect"));
        }
        if (changePasswordRequest.newPassword().length() < 12) {
            return ResponseEntity.badRequest().body(new GenericMessageResponse("password must be at least 12 characters"));
        }

        currentUser.setPassword(passwordEncoder.encode(changePasswordRequest.newPassword()));
        taakUserRepository.save(currentUser);
        return ResponseEntity.ok(new GenericMessageResponse("password updated"));
    }

    @DeleteMapping("/me")
    public ResponseEntity<GenericMessageResponse> deleteAccount(@AuthenticationPrincipal TaakUser currentUser, @RequestBody DeleteAccountRequest deleteAccountRequest) {
        if (currentUser == null) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GenericMessageResponse("user not found"));
        }
        if (!passwordEncoder.matches(deleteAccountRequest.password(), currentUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new GenericMessageResponse("current password is incorrect"));
        }

        taakUserRepository.delete(currentUser);
        return ResponseEntity.ok(new GenericMessageResponse("account deleted"));
    }
}
