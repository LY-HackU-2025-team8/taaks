package com.team8.taaks.controller;

import com.team8.taaks.dto.DiaryRequest;
import com.team8.taaks.dto.DiaryResponse;
import com.team8.taaks.dto.ErrorResponse;
import com.team8.taaks.model.Diary;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.DiaryRepository;
import com.team8.taaks.specification.DiarySpecification;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.net.URI;
import java.time.LocalDate;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/diaries")
public class DiariesController {
  @Autowired private DiaryRepository diaryRepository;

  @GetMapping
  @Operation(
      summary = "Get diaries",
      responses = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved diaries")
      })
  public ResponseEntity<Page<DiaryResponse>> diariesGet(
      @PageableDefault(size = 10, page = 0, sort = "id", direction = Direction.ASC) @ParameterObject
          Pageable pageable,
      @AuthenticationPrincipal TaakUser user,
      @RequestParam(name = "date_eq", required = false) LocalDate dateEq,
      @RequestParam(name = "date_gt", required = false) LocalDate dateGt,
      @RequestParam(name = "date_lt", required = false) LocalDate dateLt) {
    Specification<Diary> spec = Specification.where(null);
    if (dateEq != null) {
      spec = spec.and(DiarySpecification.dateEquals(dateEq));
    }
    if (dateGt != null) {
      spec = spec.and(DiarySpecification.dateGreaterThan(dateGt));
    }
    if (dateLt != null) {
      spec = spec.and(DiarySpecification.dateLessThan(dateLt));
    }
    spec = spec.and(DiarySpecification.hasUserId(user.getId()));
    Page<Diary> diaries = diaryRepository.findAll(spec, pageable);
    Page<DiaryResponse> diaryResponses =
        diaries.map(
            diary ->
                new DiaryResponse(
                    diary.getTitle(), diary.getBody(), diary.getDate(), diary.getId()));
    return ResponseEntity.ok(diaryResponses);
  }

  @PostMapping
  @Operation(
      summary = "Create a new diary",
      responses = {@ApiResponse(responseCode = "201", description = "Diary created successfully")})
  public ResponseEntity<DiaryResponse> diariesPost(
      @RequestBody DiaryRequest diaryRequest, @AuthenticationPrincipal TaakUser user) {
    Diary diary = new Diary();
    diary.setTitle(diaryRequest.getTitle());
    diary.setBody(diaryRequest.getBody());
    diary.setDate(diaryRequest.getDate());
    diary.setUser(user);
    Diary saved = diaryRepository.save(diary);
    DiaryResponse response =
        new DiaryResponse(saved.getTitle(), saved.getBody(), saved.getDate(), saved.getId());
    return ResponseEntity.created(URI.create("/diaries/" + saved.getId())).body(response);
  }

  @GetMapping("/{id}")
  @Operation(
      summary = "Get a diary by ID",
      responses = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved diary"),
        @ApiResponse(
            responseCode = "404",
            description = "Diary not found",
            content =
                @io.swagger.v3.oas.annotations.media.Content(
                    mediaType = "application/json",
                    schema =
                        @io.swagger.v3.oas.annotations.media.Schema(
                            implementation = ErrorResponse.class)))
      })
  public ResponseEntity<DiaryResponse> diariesIdGet(
      @PathVariable("id") Integer id, @AuthenticationPrincipal TaakUser user) {
    Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
    if (diaryOpt.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diary not found");
    }
    Diary diary = diaryOpt.get();
    DiaryResponse response =
        new DiaryResponse(diary.getTitle(), diary.getBody(), diary.getDate(), diary.getId());
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{id}")
  @Operation(
      summary = "Update a diary by ID",
      responses = {
        @ApiResponse(responseCode = "200", description = "Diary updated successfully"),
        @ApiResponse(
            responseCode = "404",
            description = "Diary not found",
            content =
                @io.swagger.v3.oas.annotations.media.Content(
                    mediaType = "application/json",
                    schema =
                        @io.swagger.v3.oas.annotations.media.Schema(
                            implementation = ErrorResponse.class)))
      })
  public ResponseEntity<DiaryResponse> diariesIdPut(
      @PathVariable("id") Integer id,
      @RequestBody DiaryRequest diaryRequest,
      @AuthenticationPrincipal TaakUser user) {
    Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
    if (diaryOpt.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diary not found");
    }
    Diary diary = diaryOpt.get();
    diary.setTitle(diaryRequest.getTitle());
    diary.setBody(diaryRequest.getBody());
    diary.setDate(diaryRequest.getDate());
    Diary saved = diaryRepository.save(diary);
    DiaryResponse response =
        new DiaryResponse(saved.getTitle(), saved.getBody(), saved.getDate(), saved.getId());
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  @Operation(
      summary = "Delete a diary by ID",
      responses = {
        @ApiResponse(responseCode = "204", description = "Diary deleted successfully"),
        @ApiResponse(
            responseCode = "404",
            description = "Diary not found",
            content =
                @io.swagger.v3.oas.annotations.media.Content(
                    mediaType = "application/json",
                    schema =
                        @io.swagger.v3.oas.annotations.media.Schema(
                            implementation = ErrorResponse.class)))
      })
  public ResponseEntity<Void> diariesIdDelete(
      @PathVariable("id") Integer id, @AuthenticationPrincipal TaakUser user) {
    Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
    if (diaryOpt.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diary not found");
    }
    diaryRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
