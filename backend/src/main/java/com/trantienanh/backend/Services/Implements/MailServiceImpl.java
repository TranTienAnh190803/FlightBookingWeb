package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.MailDTO;
import com.trantienanh.backend.Models.Mail;
import com.trantienanh.backend.Repositories.MailRepository;
import com.trantienanh.backend.Services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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

    @Override
    public MailDTO getAllMail() {
        MailDTO response = new MailDTO();

        try {
            List<Mail> mailList = mailRepository.getAllMailByDate();

            if (!mailList.isEmpty()) {
                response.setMailList(mailList);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("There Is No Mail");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public MailDTO getSelectedMail(Long mailId) {
        MailDTO response = new MailDTO();

        try {
            Mail mail = mailRepository.findById(mailId).orElse(null);

            if (mail != null) {
                response.setMail(mail);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Mail Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public MailDTO deleteMail(Long mailId) {
        MailDTO response = new MailDTO();

        try {
            mailRepository.deleteById(mailId);

            if (!mailRepository.existsById(mailId)) {
                response.setStatusCode(200);
                response.setMessage("Delete Mail Successfully");
            }
            else {
                response.setStatusCode(500);
                response.setMessage("Delete Mail Fail");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public MailDTO readMail(Long mailId) {
        MailDTO response = new MailDTO();

        try {
            Mail mail = mailRepository.findById(mailId).orElse(null);

            if (mail != null) {
                mail.setStatus(true);
                mailRepository.save(mail);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Mail Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
