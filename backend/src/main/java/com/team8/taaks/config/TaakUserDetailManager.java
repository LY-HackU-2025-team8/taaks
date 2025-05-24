package com.team8.taaks.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;

import com.team8.taaks.model.TaakUser;
import com.team8.taaks.repository.TaakUserRepository;

public class TaakUserDetailManager implements UserDetailsManager{
    private final TaakUserRepository taakUserRepository;
    private final PasswordEncoder passwordEncoder;

    public TaakUserDetailManager(TaakUserRepository taakUserRepository, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.taakUserRepository = taakUserRepository;
    }

    @Override
    public boolean userExists(String username) {
        return taakUserRepository.findByUsername(username).isPresent();
    }
    @Override
        public void changePassword(String oldPassword, String newPassword) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        TaakUser user = taakUserRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        taakUserRepository.save(user);
    }
    @Override
    public void createUser(UserDetails user) {
        taakUserRepository.save((TaakUser) user);        
    }
    @Override
    public void deleteUser(String username) {
        taakUserRepository.deleteById(taakUserRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found")).getId());
    }
    @Override
    public void updateUser(UserDetails user) {
        taakUserRepository.save((TaakUser) user);        
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return taakUserRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    
}
