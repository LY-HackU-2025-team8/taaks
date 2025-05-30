package com.team8.taaks.service;

import com.team8.taaks.dto.GeneratedTaskResponse;
import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakTaskRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SuggestedTaskServiceImpl implements SuggestedTaskService {
  private final TaakTaskRepository taakTaskRepository;
  private final List<List<String>> suggestedTasksList;

  public SuggestedTaskServiceImpl(TaakTaskRepository taakTaskRepository) {
    this.taakTaskRepository = taakTaskRepository;
    this.suggestedTasksList =
        List.of(
            List.of("部屋の一部分を片付ける🧹", "読みたかった本を読む📕", "行きたいと思っていたカフェに行く☕️"),
            List.of("自炊をしてみよう🍚", "1週間の予定を立てる📅", "デジタルデトックスをする📱"),
            List.of("気分転換にお散歩する🚶", "机の上を片付ける🪴", "好きな音楽を流す🎧"),
            List.of("ダッシュボードを活用してタスクを整理する📃", "1日3食食べる🍗", "タスクの入れ忘れがないか確認する✅"),
            List.of("集中できる場所に移動する🏠", "忘れずご飯を食べる🍽️", "作業後のご褒美を決める🍰"),
            List.of("休む日を決める🛏️", "窓を開けて換気する🌱", "入浴剤を買って帰る🛀"));
  }

  @Override
  public List<GeneratedTaskResponse> getSuggestedTasks(TaakUser user) {
    LocalDateTime startOfToday =
        LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
    LocalDateTime endOfToday = startOfToday.plusDays(1).minusNanos(1);
    Long totalLoadScore =
        taakTaskRepository
            .sumQuadrupleLoadScoreForCompletedTasksBetweenDueDates(
                user.getId(), startOfToday, endOfToday)
            .orElse(0L);
    int listIndex = Math.min(suggestedTasksList.size() - 1, (int) (totalLoadScore / 10));
    return suggestedTasksList.get(listIndex).stream()
        .map(task -> new GeneratedTaskResponse(task, startOfToday.plusDays(1), 0))
        .toList();
  }
}
