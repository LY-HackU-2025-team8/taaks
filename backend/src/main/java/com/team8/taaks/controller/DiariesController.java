package com.team8.taaks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.team8.taaks.model.Diary;
import com.team8.taaks.model.DiaryRepository;
import com.team8.taaks.model.DiaryRequest;
import com.team8.taaks.model.DiaryResponse;
import com.team8.taaks.model.DiarySummary;
import com.team8.taaks.model.TaakUser;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class DiariesController implements DiariesApi {
    @Autowired
    private DiaryRepository diaryRepository;

    @GetMapping("/diaries")
    public ResponseEntity<Page<DiaryResponse>> diariesGet(@RequestParam (value = "page", required = false, defaultValue = "0") Integer page,
                                                  @RequestParam(value = "size", required = false, defaultValue =  "10") Integer size) {
        TaakUser user = getAuthenticatedUser();
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Page<Diary> diaries = diaryRepository.findAllByUserId(user.getId(), pageable);
        Page<DiaryResponse> diaryResponses = diaries.map(diary -> new DiaryResponse(diary.getTitle(), diary.getBody(), diary.getDate(), diary.getId()));
        return ResponseEntity.ok(diaryResponses);
    }

    @Override
    public ResponseEntity<DiaryResponse> diariesPost(@RequestBody DiaryRequest diaryRequest) {
        TaakUser user = getAuthenticatedUser();
        Diary diary = new Diary();
        diary.setTitle(diaryRequest.getTitle());
        diary.setBody(diaryRequest.getBody());
        diary.setDate(diaryRequest.getDate());
        diary.setUser(user);
        Diary saved = diaryRepository.save(diary);
        DiaryResponse response = new DiaryResponse(saved.getTitle(), saved.getBody(), saved.getDate(), saved.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<DiaryResponse> diariesIdGet(@PathVariable("id") Integer id) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
        if (diaryOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Diary diary = diaryOpt.get();
        DiaryResponse response = new DiaryResponse(diary.getTitle(), diary.getBody(), diary.getDate(), diary.getId());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<DiaryResponse> diariesIdPut(@PathVariable("id") Integer id, @RequestBody DiaryRequest diaryRequest) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
        if (diaryOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Diary diary = diaryOpt.get();
        diary.setTitle(diaryRequest.getTitle());
        diary.setBody(diaryRequest.getBody());
        diary.setDate(diaryRequest.getDate());
        Diary saved = diaryRepository.save(diary);
        DiaryResponse response = new DiaryResponse(saved.getTitle(), saved.getBody(), saved.getDate(), saved.getId());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Void> diariesIdDelete(@PathVariable("id") Integer id) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findByIdAndUserId(id, user.getId());
        if (diaryOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        diaryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 認証ユーザー取得用のヘルパー
    private TaakUser getAuthenticatedUser() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TaakUser) {
            return (TaakUser) principal;
        }
        throw new IllegalStateException("認証ユーザーが取得できません");
    }
}
