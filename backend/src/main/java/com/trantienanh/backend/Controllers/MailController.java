package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.MailDTO;
import com.trantienanh.backend.Services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/public/send-mail")
    public ResponseEntity<MailDTO> sendMail(@RequestBody MailDTO mailDTO) {
        MailDTO response = mailService.sendMail(mailDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
