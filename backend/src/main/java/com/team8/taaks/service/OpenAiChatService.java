package com.team8.taaks.service;

import java.util.Optional;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.StructuredResponse;
import com.openai.models.responses.StructuredResponseCreateParams;
import com.team8.taaks.controller.OpenAiApiException;
import com.team8.taaks.dto.LlmResponse;

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

  @Override
  public int getLoadScore(String prompt) {
    return calcLoadScore(prompt);
  }
}
