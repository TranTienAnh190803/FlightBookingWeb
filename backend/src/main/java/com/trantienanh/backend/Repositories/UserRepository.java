package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<List<User>> findAllByRole(String role);
}
