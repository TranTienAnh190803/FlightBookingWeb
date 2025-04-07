package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.UserDTO;
import com.trantienanh.backend.Models.User;
import com.trantienanh.backend.Repositories.UserRepository;
import com.trantienanh.backend.Services.JWTService;
import com.trantienanh.backend.Services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserManagementServiceImpl implements UserManagementService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO register(UserDTO registerRequest) {
        UserDTO response = new UserDTO();

        try {
            User user = new User();
            user.setAddress(registerRequest.getAddress());
            user.setName(registerRequest.getAddress());
            user.setRole(registerRequest.getRole());
            user.setDateOfBirth(registerRequest.getDateOfBirth());
            user.setUsername(registerRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            User userRegistered = userRepository.save(user);

            if (userRegistered.getId() > 0) {
                response.setUser(userRegistered);
                response.setMessage("Registered Successfully!");
                response.setStatusCode(200);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO login(UserDTO loginRequest) {
        UserDTO response = new UserDTO();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            User userLogin = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
            var jwtToken = jwtService.generateToken(userLogin);
            var refreshToken = jwtService.refreshToken(new HashMap<>(), userLogin);

            response.setStatusCode(200);
            response.setMessage("Logged in Successfully");
            response.setRole(userLogin.getRole());
            response.setToken(jwtToken);
            response.setRefreshToken(refreshToken);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO refreshToken(UserDTO refreshTokenRequest) {
        UserDTO response = new UserDTO();

        try {
            String username = jwtService.extractUsername(refreshTokenRequest.getToken());
            User user = userRepository.findByUsername(username).orElseThrow();

            if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
                var jwt = jwtService.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setMessage("Refreshed Token Successfully");
            }

            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
