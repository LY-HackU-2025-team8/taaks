package com.team8.taaks.service;

import com.team8.taaks.dto.GeneratedTaskResponse;
import com.team8.taaks.model.TaakUser;
import java.util.List;

public interface SuggestedTaskService {
  public List<GeneratedTaskResponse> getSuggestedTasks(TaakUser user);
}
