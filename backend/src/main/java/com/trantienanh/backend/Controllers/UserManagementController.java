package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.UserDTO;
import com.trantienanh.backend.Models.User;
import com.trantienanh.backend.Services.UserManagementService;
import com.trantienanh.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@RestController
public class UserManagementController {
    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/public/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        UserDTO response = userManagementService.register(userDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/public/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        UserDTO response = userManagementService.login(userDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/public/refresh")
    public ResponseEntity<UserDTO> refreshToken(@RequestBody UserDTO userDTO) {
        UserDTO response = userManagementService.refreshToken(userDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin-user/get-profile")
    public ResponseEntity<UserDTO> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO response = userManagementService.getProfile(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/admin-user/upload-avatar")
    public ResponseEntity<UserDTO> uploadAvatar(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO response = userManagementService.uploadAvatar(username, file);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin-user/get-avatar")
    public ResponseEntity<byte[]> getAvatar() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO response = userManagementService.getAvatar(username);
        return ResponseEntity.status(response.getStatusCode()).contentType(MediaType.parseMediaType(response.getAvatarType())).body(response.getAvatar());
    }

    @PatchMapping("/admin-user/update-profile")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO userDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO response = userManagementService.updateProfile(username, userDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
