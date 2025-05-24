package com.team8.taaks.repository;

import com.team8.taaks.model.NotificationTargetToken;
import com.team8.taaks.model.TaakUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationTargetTokenRepository extends JpaRepository<NotificationTargetToken, Long> {

    /**
     * Finds all notification target tokens associated with a specific user ID.
     *
     * @param userId The ID of the user.
     * @return A list of NotificationTargetToken entities associated with the given user ID.
     *         Returns an empty list if no tokens are found for the user.
     */
    List<NotificationTargetToken> findByUserId(Long userId);

    /**
     * Finds all notification target tokens associated with a specific user entity.
     *
     * @param user The TaakUser entity.
     * @return A list of NotificationTargetToken entities associated with the given user.
     *         Returns an empty list if no tokens are found for the user.
     */
    List<NotificationTargetToken> findByUser(TaakUser user);

    /**
     * Finds a notification target token by the target token string.
     *
     * @param targetToken The device token string.
     * @return An Optional containing the NotificationTargetToken if found, or an empty Optional otherwise.
     */
    Optional<NotificationTargetToken> findByTargetToken(String targetToken);
}
