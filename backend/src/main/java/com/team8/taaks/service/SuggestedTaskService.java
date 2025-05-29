package com.team8.taaks.service;

import com.team8.taaks.dto.TaskResponse;
import com.team8.taaks.model.TaakUser;

public interface SuggestedTaskService {
  public TaskResponse getSuggestedTasks(TaakUser user);
}
