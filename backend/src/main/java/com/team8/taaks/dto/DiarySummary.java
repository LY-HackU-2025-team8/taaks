package com.team8.taaks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Objects;
import javax.annotation.Generated;
import javax.validation.constraints.*;

/** DiarySummary */
@Generated(
    value = "org.openapitools.codegen.languages.SpringCodegen",
    date = "2025-05-19T22:09:31.658172211+09:00[Asia/Tokyo]",
    comments = "Generator version: 7.13.0")
public class DiarySummary {

  private Integer id;

  private String title;

  public DiarySummary() {
    super();
  }

  /** Constructor with only required parameters */
  public DiarySummary(Integer id, String title) {
    this.id = id;
    this.title = title;
  }

  public DiarySummary id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   *
   * @return id
   */
  @NotNull
  @Schema(name = "id", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public DiarySummary title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   *
   * @return title
   */
  @NotNull
  @Schema(name = "title", example = "お出かけ", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("title")
  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DiarySummary diarySummary = (DiarySummary) o;
    return Objects.equals(this.id, diarySummary.id)
        && Objects.equals(this.title, diarySummary.title);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, title);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DiarySummary {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
