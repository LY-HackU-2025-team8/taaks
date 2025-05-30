package com.team8.taaks.service;

import com.team8.taaks.dto.GeneratedTaskResponse;
import com.team8.taaks.model.TaakUser;

public interface SuggestedTaskService {
  public GeneratedTaskResponse getSuggestedTasks(TaakUser user);
}
