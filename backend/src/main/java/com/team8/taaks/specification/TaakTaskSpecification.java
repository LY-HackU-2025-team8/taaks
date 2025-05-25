package com.team8.taaks.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.team8.taaks.model.TaakTask;

public class TaakTaskSpecification {
    public static Specification<TaakTask> dueAtGreaterThan(LocalDateTime dueAtGt) {
        return (root, query, criteriaBuilder) -> {
            if (dueAtGt == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.greaterThan(root.get("dueAt"), dueAtGt);
        };
    }
    public static Specification<TaakTask> dueAtLessThan(LocalDateTime dueAtLt) {
        return (root, query, criteriaBuilder) -> {
            if (dueAtLt == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.lessThan(root.get("dueAt"), dueAtLt);
        };
    }
    public static Specification<TaakTask> isAllDay(boolean isAllDayEq) {
        return (root, query, criteriaBuilder) -> {
            if (isAllDayEq == false) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("isAllDay"), isAllDayEq);
        };
    }
    public static Specification<TaakTask> isCompleted(boolean isCompletedEq) {
        return (root, query, criteriaBuilder) -> {
            if (isCompletedEq == false) {
                return criteriaBuilder.isNull(root.get("completedAt"));
            } else {
            return criteriaBuilder.isNotNull(root.get("completedAt"));
            }
        };
    }
    public static Specification<TaakTask> hasUserId(Long userId) {
        return (root, query, criteriaBuilder) -> {
            if (userId == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("user").get("id"), userId);
        };
    }
    
}
