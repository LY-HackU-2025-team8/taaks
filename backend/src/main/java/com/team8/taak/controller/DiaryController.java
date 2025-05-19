package com.team8.taak.controller;

import com.team8.taak.controller.generated.api.DiaryApi;
import com.team8.taak.controller.generated.model.DiaryRequest;
import com.team8.taak.controller.generated.model.DiaryResponse;
import com.team8.taak.controller.generated.model.DiarySummary;
import com.team8.taak.model.Diary;
import com.team8.taak.model.DiaryRepository;
import com.team8.taak.model.TaakUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class DiaryController implements DiaryApi {
    @Autowired
    private DiaryRepository diaryRepository;

    @Override
    public ResponseEntity<List<DiarySummary>> diaryGet() {
        TaakUser user = getAuthenticatedUser();
        List<DiarySummary> summaries = diaryRepository.findAll().stream()
                .filter(diary -> diary.getUser().getId().equals(user.getId()))
                .map(diary -> new DiarySummary(diary.getId(), diary.getTitle()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaries);
    }

    @Override
    public ResponseEntity<DiaryResponse> diaryPost(@RequestBody DiaryRequest diaryRequest) {
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
    public ResponseEntity<DiaryResponse> diaryIdGet(@PathVariable("id") Integer id) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findById(id);
        if (diaryOpt.isEmpty() || !diaryOpt.get().getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Diary diary = diaryOpt.get();
        DiaryResponse response = new DiaryResponse(diary.getTitle(), diary.getBody(), diary.getDate(), diary.getId());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<DiaryResponse> diaryIdPut(@PathVariable("id") Integer id, @RequestBody DiaryRequest diaryRequest) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findById(id);
        if (diaryOpt.isEmpty() || !diaryOpt.get().getUser().getId().equals(user.getId())) {
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
    public ResponseEntity<Void> diaryIdDelete(@PathVariable("id") Integer id) {
        TaakUser user = getAuthenticatedUser();
        Optional<Diary> diaryOpt = diaryRepository.findById(id);
        if (diaryOpt.isEmpty() || !diaryOpt.get().getUser().getId().equals(user.getId())) {
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
