package com.team8.taaks.service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.StructuredResponse;
import com.openai.models.responses.StructuredResponseCreateParams;
import com.team8.taaks.controller.OpenAiApiException;
import com.team8.taaks.dto.GeneratedTask;
import com.team8.taaks.dto.GeneratedTasks;
import com.team8.taaks.dto.LlmResponse;
import java.util.List;
import java.util.Optional;

public class OpenAiChatService implements ChatService {
  public int calcLoadScore(String prompt) {
    OpenAIClient client;
    try {
      // 3つの環境変数が必要：OPENAI_API_KEY, OPENAI_ORG_ID, OPENAI_PROJECT_ID
      // 値自体はダミーでも動く
      client = OpenAIOkHttpClient.fromEnv();
    } catch (Exception e) {
      throw new RuntimeException("Failed to initialize OpenAI client", e);
    }
    StructuredResponseCreateParams<LlmResponse> params =
        ResponseCreateParams.builder()
            .input(prompt)
            .text(LlmResponse.class)
            .model(ChatModel.GPT_4_1)
            .build();
    StructuredResponse<LlmResponse> response = client.responses().create(params);
    try {
      Optional<LlmResponse> outputOptional =
          response.output().stream()
              .flatMap(item -> item.message().stream())
              .flatMap(msg -> msg.content().stream())
              .flatMap(content -> content.outputText().stream())
              .findFirst();
      if (outputOptional.isEmpty()) {
        System.err.println("Failed to get load score from OpenAI API");
      }
      int loadScore = outputOptional.get().loadScore();
      // System.out.println("負荷スコア: " + loadScore);
      return loadScore;
    } catch (OpenAiApiException e) {
      throw new OpenAiApiException(
          e.getStatusCode(), e.getErrorBody() != null ? e.getErrorBody() : "Unknown error");
    }
  }

  public List<GeneratedTask> generateTasks(String prompt) {
    OpenAIClient client;
    try {
      // 3つの環境変数が必要：OPENAI_API_KEY, OPENAI_ORG_ID, OPENAI_PROJECT_ID
      // 値自体はダミーでも動く
      client = OpenAIOkHttpClient.fromEnv();
    } catch (Exception e) {
      throw new RuntimeException("Failed to initialize OpenAI client", e);
    }
    StructuredResponseCreateParams<GeneratedTasks> params =
        ResponseCreateParams.builder()
            .input(prompt)
            .text(GeneratedTasks.class)
            .model(ChatModel.GPT_4_1)
            .build();
    StructuredResponse<GeneratedTasks> response = client.responses().create(params);
    try {
      Optional<GeneratedTasks> outputOptional =
          response.output().stream()
              .flatMap(item -> item.message().stream())
              .flatMap(msg -> msg.content().stream())
              .flatMap(content -> content.outputText().stream())
              .findFirst();
      List<GeneratedTask> generatedTasks = outputOptional.get().tasks();
      return generatedTasks;
    } catch (OpenAiApiException e) {
      System.err.println("Failed to generate tasks from OpenAI API: " + e.getMessage());
      throw new OpenAiApiException(
          e.getStatusCode(), e.getErrorBody() != null ? e.getErrorBody() : "Unknown error");
    }
  }

  @Override
  public int getLoadScore(String prompt) {
    return calcLoadScore(prompt);
  }

  @Override
  public List<GeneratedTask> getSuggestedTasks(String prompt) {
    List<GeneratedTask> generatedTasks = generateTasks(prompt);
    System.out.println("Generated tasks: " + generatedTasks);
    return generatedTasks;
  }
}
