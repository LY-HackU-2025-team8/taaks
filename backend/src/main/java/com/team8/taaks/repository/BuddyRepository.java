package com.team8.taaks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team8.taaks.model.Buddy;

import java.util.Optional;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, Long> {

    /**
     * Finds a buddy by its ID and the ID of the associated user.
     * This method is used to retrieve a specific buddy for a specific user,
     * ensuring that users can only access their own buddies.
     *
     * @param id The ID of the buddy (buddy.id).
     * @param userId The ID of the user associated with the buddy (buddy.user.id).
     * @return An Optional containing the buddy if found, or an empty Optional otherwise.
     */
    Optional<Buddy> findByIdAndUserId(Long id, Long userId);

    /**
     * Finds a buddy by the ID of the associated user.
     * This method is used to retrieve the buddy for a specific user.
     *
     * @param userId The ID of the user associated with the buddy (buddy.user.id).
     * @return An Optional containing the buddy if found, or an empty Optional otherwise.
     */
    Optional<Buddy> findByUserId(Long userId);
}
