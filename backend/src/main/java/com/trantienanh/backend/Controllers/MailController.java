package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.MailDTO;
import com.trantienanh.backend.Services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/public/send-mail")
    public ResponseEntity<MailDTO> sendMail(@RequestBody MailDTO mailDTO) {
        MailDTO response = mailService.sendMail(mailDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-all-mail")
    public ResponseEntity<MailDTO> getAllMail() {
        MailDTO response = mailService.getAllMail();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-selected-mail")
    public ResponseEntity<MailDTO> getSelectedMail(@RequestParam("mailId") Long mailId) {
        MailDTO response = mailService.getSelectedMail(mailId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete-mail")
    public ResponseEntity<MailDTO> deleteMail(@RequestParam("mailId") Long mailId) {
        MailDTO response = mailService.deleteMail(mailId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PatchMapping("/admin/read-mail")
    public ResponseEntity<MailDTO> readMail(@RequestParam("mailId") Long mailId) {
        MailDTO response = mailService.readMail(mailId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
