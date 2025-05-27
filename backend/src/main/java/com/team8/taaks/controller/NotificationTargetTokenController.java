package com.team8.taaks.controller;

import com.team8.taaks.dto.NotificationTargetTokenRequest;
import com.team8.taaks.dto.NotificationTargetTokenResponse;
import com.team8.taaks.model.NotificationTargetToken;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.NotificationTargetTokenRepository;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/notification-target-token")
public class NotificationTargetTokenController {

  private final NotificationTargetTokenRepository notificationTargetTokenRepository;

  public NotificationTargetTokenController(
      NotificationTargetTokenRepository notificationTargetTokenRepository) {
    this.notificationTargetTokenRepository = notificationTargetTokenRepository;
  }

  private NotificationTargetTokenResponse mapToResponse(NotificationTargetToken token) {
    return new NotificationTargetTokenResponse(
        token.getId(),
        token.getTargetToken(),
        token.getUser().getId(), // Assuming you want to expose userId
        token.getCreatedAt(),
        token.getUpdatedAt());
  }

  @GetMapping
  public ResponseEntity<Page<NotificationTargetTokenResponse>> getNotificationTargetTokens(
      @AuthenticationPrincipal TaakUser user,
      @RequestParam(name = "page", required = false, defaultValue = "0") int page,
      @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
    Pageable pageable = Pageable.ofSize(size).withPage(page);
    Page<NotificationTargetToken> tokens =
        notificationTargetTokenRepository.findAllByUserId(user.getId(), pageable);
    Page<NotificationTargetTokenResponse> response = tokens.map(this::mapToResponse);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<NotificationTargetTokenResponse> createNotificationTargetToken(
      @AuthenticationPrincipal TaakUser user,
      @Valid @RequestBody NotificationTargetTokenRequest request) {

    Optional<NotificationTargetToken> existingTokenOpt =
        notificationTargetTokenRepository.findByTargetTokenAndUserId(
            request.targetToken(), user.getId());
    if (existingTokenOpt.isPresent()) {
      NotificationTargetToken existingToken = existingTokenOpt.get();
      HttpHeaders responseHeaders = new HttpHeaders();
      responseHeaders.setLocation(
          URI.create("/notification-target-token/" + existingToken.getId()));
      return ResponseEntity.ok().headers(responseHeaders).body(mapToResponse(existingToken));
    }

    NotificationTargetToken newToken = new NotificationTargetToken();
    newToken.setUser(user);
    newToken.setTargetToken(request.targetToken());
    NotificationTargetToken savedToken = notificationTargetTokenRepository.save(newToken);

    return ResponseEntity.created(URI.create("/notification-target-token/" + savedToken.getId()))
        .body(mapToResponse(savedToken));
  }

  @GetMapping("/{id}")
  public ResponseEntity<NotificationTargetTokenResponse> getNotificationTargetToken(
      @AuthenticationPrincipal TaakUser user, @PathVariable(name = "id") Long id) {
    return notificationTargetTokenRepository
        .findByIdAndUserId(id, user.getId())
        .map(this::mapToResponse)
        .map(ResponseEntity::ok)
        .orElseThrow(
            () ->
                new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Notification target token not found"));
  }
}
