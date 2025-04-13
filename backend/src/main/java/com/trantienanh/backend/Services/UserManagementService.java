package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

public interface UserManagementService {
    public UserDTO register(UserDTO registerRequest);

    public UserDTO login(UserDTO loginRequest);

    public UserDTO refreshToken(UserDTO refreshTokenRequest);

    public UserDTO getProfile(String username);

    public UserDTO uploadAvatar(String username, MultipartFile file);

    public UserDTO getAvatar(String username);
}
