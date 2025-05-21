package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.MailDTO;
import com.trantienanh.backend.Models.Mail;
import com.trantienanh.backend.Repositories.MailRepository;
import com.trantienanh.backend.Services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private MailRepository mailRepository;

    @Override
    public MailDTO sendMail(MailDTO mailDTO) {
        MailDTO response = new MailDTO();

        try {
            Mail sendedMail = new Mail(
                    mailDTO.getFullName(),
                    mailDTO.getEmail(),
                    mailDTO.getTitle(),
                    mailDTO.getContent(),
                    false
            );

            Mail check = mailRepository.save(sendedMail);

            if (mailRepository.existsById(check.getMailId())) {
                response.setStatusCode(200);
                response.setMessage("Sent Mail Successfully");
            }
            else {
                response.setStatusCode(500);
                response.setMessage("Sent Mail Fail");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
