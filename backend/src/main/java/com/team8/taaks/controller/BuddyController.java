package com.team8.taaks.controller;

import com.team8.taaks.dto.ErrorResponse;
import com.team8.taaks.model.Buddy;
import com.team8.taaks.model.BuddyRepository;
import com.team8.taaks.model.TaakUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/buddy")
@Tag(name = "Buddy", description = "Buddy management APIs")
public class BuddyController {

    private final BuddyRepository buddyRepository;

    public BuddyController(BuddyRepository buddyRepository) {
        this.buddyRepository = buddyRepository;
    }

    @Operation(summary = "Get buddy information", description = "Retrieves the buddy information for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved buddy information",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = BuddyResponse.class))),
            @ApiResponse(responseCode = "404", description = "Buddy not found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public ResponseEntity<BuddyResponse> getBuddy(@AuthenticationPrincipal TaakUser user) {
        Buddy buddy = buddyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buddy not found"));
        return ResponseEntity.ok(new BuddyResponse(buddy));
    }

    @Operation(summary = "Create or update buddy information", description = "Creates or updates the buddy information for the authenticated user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated buddy information",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = BuddyResponse.class))),
            @ApiResponse(responseCode = "201", description = "Successfully created buddy information",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = BuddyResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request body",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PutMapping
    public ResponseEntity<BuddyResponse> upsertBuddy(@AuthenticationPrincipal TaakUser user, @Valid @RequestBody BuddyRequest buddyRequest) {
        Optional<Buddy> existingBuddyOptional = buddyRepository.findByUserId(user.getId());

        Buddy buddy;
        boolean created = false;
        if (existingBuddyOptional.isPresent()) {
            buddy = existingBuddyOptional.get();
        } else {
            buddy = new Buddy();
            buddy.setUser(user);
            created = true;
        }

        buddy.setNickname(buddyRequest.nickname());
        buddy.setHairStyleId(buddyRequest.hairStyleId());
        buddy.setClothesId(buddyRequest.clothesId());
        buddy.setColorId(buddyRequest.colorId());
        buddy.setName(buddyRequest.name());

        Buddy savedBuddy = buddyRepository.save(buddy);

        if (created) {
            return ResponseEntity.created(URI.create("/buddy")).body(new BuddyResponse(savedBuddy));
        } else {
            return ResponseEntity.ok(new BuddyResponse(savedBuddy));
        }
    }

    public record BuddyRequest(
            @NotNull String nickname,
            @NotNull Long hairStyleId,
            @NotNull Long clothesId,
            @NotNull Long colorId,
            @NotNull String name
    ) {}

    public record BuddyResponse(
            Long id,
            String nickname,
            Long hairStyleId,
            Long clothesId,
            Long colorId,
            String name,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt
    ) {
        public BuddyResponse(Buddy buddy) {
            this(
                    buddy.getId(),
                    buddy.getNickname(),
                    buddy.getHairStyleId(),
                    buddy.getClothesId(),
                    buddy.getColorId(),
                    buddy.getName(),
                    buddy.getCreatedAt(),
                    buddy.getUpdatedAt()
            );
        }
    }
}
