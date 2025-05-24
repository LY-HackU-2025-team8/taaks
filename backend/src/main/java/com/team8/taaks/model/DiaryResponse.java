package com.team8.taaks.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import javax.annotation.Generated;

/**
 * DiaryResponse
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-05-19T22:09:31.658172211+09:00[Asia/Tokyo]", comments = "Generator version: 7.13.0")
public class DiaryResponse {

  private String title;

  private String body;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate date;

  private Integer id;

  public DiaryResponse() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public DiaryResponse(String title, String body, LocalDate date, Integer id) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.id = id;
  }

  public DiaryResponse title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   */
  @NotNull 
  @Schema(name = "title", example = "プログラミング", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("title")
  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public DiaryResponse body(String body) {
    this.body = body;
    return this;
  }

  /**
   * Get body
   * @return body
   */
  @NotNull 
  @Schema(name = "body", example = "たくさんコードを書いた", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("body")
  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public DiaryResponse date(LocalDate date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
   */
  @NotNull @Valid 
  @Schema(name = "date", example = "2025-05-18", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("date")
  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public DiaryResponse id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   */
  @NotNull 
  @Schema(name = "id", example = "123", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DiaryResponse diaryResponse = (DiaryResponse) o;
    return Objects.equals(this.title, diaryResponse.title) &&
        Objects.equals(this.body, diaryResponse.body) &&
        Objects.equals(this.date, diaryResponse.date) &&
        Objects.equals(this.id, diaryResponse.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, body, date, id);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DiaryResponse {\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    body: ").append(toIndentedString(body)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
