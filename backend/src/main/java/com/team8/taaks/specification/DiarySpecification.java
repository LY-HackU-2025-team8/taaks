package com.team8.taaks.specification;

import com.team8.taaks.model.Diary;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

public class DiarySpecification {
  public static Specification<Diary> dateEquals(LocalDate dateEq) {
    return (root, query, criteriaBuilder) -> {
      if (dateEq == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("date"), dateEq);
    };
  }

  public static Specification<Diary> dateGreaterThan(LocalDate dateGt) {
    return (root, query, criteriaBuilder) -> {
      if (dateGt == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.greaterThan(root.get("date"), dateGt);
    };
  }

  public static Specification<Diary> dateLessThan(LocalDate dateLt) {
    return (root, query, criteriaBuilder) -> {
      if (dateLt == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.lessThan(root.get("date"), dateLt);
    };
  }

  public static Specification<Diary> hasUserId(Long userId) {
    return (root, query, criteriaBuilder) -> {
      if (userId == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("user").get("id"), userId);
    };
  }
}
