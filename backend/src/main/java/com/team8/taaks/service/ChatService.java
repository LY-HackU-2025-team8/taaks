package com.team8.taaks.service;

import com.team8.taaks.dto.GeneratedTask;
import java.util.List;

public interface ChatService {
  int getLoadScore(String prompt);

  List<GeneratedTask> getSuggestedTasks(String prompt);
}
