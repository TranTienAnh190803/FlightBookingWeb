package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.UserDTO;

public interface UserManagementService {
    public UserDTO register(UserDTO registerRequest);

    public UserDTO login(UserDTO loginRequest);

    public UserDTO refreshToken(UserDTO refreshTokenRequest);
}
