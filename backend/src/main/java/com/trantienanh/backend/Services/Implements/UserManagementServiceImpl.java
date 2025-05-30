package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.UserDTO;
import com.trantienanh.backend.Models.User;
import com.trantienanh.backend.Repositories.UserRepository;
import com.trantienanh.backend.Services.JWTService;
import com.trantienanh.backend.Services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

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
            user.setName(registerRequest.getName());
            user.setRole(registerRequest.getRole());
            user.setDateOfBirth(registerRequest.getDateOfBirth());
            user.setPhoneNumber(registerRequest.getPhoneNumber());
            user.setGender(registerRequest.isGender());
            user.setEmail(registerRequest.getEmail());
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
                response.setRole(user.getRole());
                response.setMessage("Refreshed Token Successfully");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getProfile(String username) {
        UserDTO response = new UserDTO();

        try {
            User userProfile = userRepository.findByUsername(username).orElse(null);
            if (userProfile != null) {
                response.setUser(userProfile);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO uploadAvatar(String username, MultipartFile file) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
            else {
                user.setAvatar(file.getBytes());
                user.setAvatarType(file.getContentType());
                userRepository.save(user);
                response.setStatusCode(200);
                response.setMessage("Upload success!");
            }
        } catch (IOException e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getAvatar(String username) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null || user.getAvatar() == null) {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
            else {
                response.setStatusCode(200);
                response.setAvatar(user.getAvatar());
                response.setAvatarType(user.getAvatarType());
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO updateProfile(String username, UserDTO userDTO) {
        UserDTO response = new UserDTO();

        try {
            User userUpdate = userRepository.findByUsername(username).orElse(null);
            if (userUpdate != null) {
                userUpdate.setName(userDTO.getName());
                userUpdate.setEmail(userDTO.getEmail());
                userUpdate.setPhoneNumber(userDTO.getPhoneNumber());
                userUpdate.setGender(userDTO.isGender());
                userUpdate.setDateOfBirth(userDTO.getDateOfBirth());
                userUpdate.setAddress(userDTO.getAddress());
                userRepository.save(userUpdate);
                response.setStatusCode(200);
                response.setMessage("Update Profile Success");
                response.setUser(userUpdate);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO changePassword(String username, UserDTO userDTO) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                if (passwordEncoder.matches(userDTO.getOldPassword(), user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                    userRepository.save(user);
                    response.setStatusCode(200);
                    response.setMessage("Change Password Successfully");
                }
                else {
                    response.setStatusCode(500);
                    response.setMessage("Wrong Old Password");
                }
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getAllUser() {
        UserDTO response = new UserDTO();

        try {
            List<User> allUser = userRepository.findAllByRole("USER").orElse(null);

            if (allUser != null) {
                response.setUserList(allUser);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("There Is No User");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getSelectedUser(Integer id) {
        UserDTO response = new UserDTO();

        try {
            User selectedUser = userRepository.findById(id).orElse(null);

            if (selectedUser != null) {
                response.setUser(selectedUser);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("No User Selected");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getUserAvatarById(Integer id) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findById(id).orElse(null);

            if (user != null && user.getAvatar() != null) {
                response.setStatusCode(200);
                response.setAvatar(user.getAvatar());
                response.setAvatarType(user.getAvatarType());
            }
            else {
                response.setStatusCode(404);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO resetPassword(Integer id) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findById(id).orElse(null);

            if (user != null) {
                String newPassword = "12345";
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                response.setStatusCode(200);
                response.setMessage("Reset Password Successfully. New Password is: " + newPassword);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO deleteAccount(Integer id) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findById(id).orElse(null);

            if (user != null) {
                userRepository.delete(user);
                response.setStatusCode(200);
                response.setMessage("Deleted Account Successfully");
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO registerAdmin(UserDTO userDTO) {
        UserDTO response = new UserDTO();

        try {
            User newAdmin = new User(userDTO.getName(),
                    userDTO.getUsername(),
                    passwordEncoder.encode(userDTO.getPassword()),
                    userDTO.getDateOfBirth(),
                    userDTO.getEmail(),
                    userDTO.getPhoneNumber(),
                    userDTO.getAddress(),
                    userDTO.isGender(),
                    "ADMIN");

            userRepository.save(newAdmin);

            if (newAdmin.getId() > 0) {
                response.setStatusCode(200);
                response.setMessage("Register New Admin Successfully");
            }
            else {
                response.setStatusCode(500);
                response.setMessage("Register New Admin Fail");
            }
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
