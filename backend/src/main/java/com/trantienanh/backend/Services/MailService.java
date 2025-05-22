package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.MailDTO;

public interface MailService {
    public MailDTO sendMail(MailDTO mailDTO);

    public MailDTO getAllMail();

    public MailDTO getSelectedMail(Long mailId);

    public MailDTO deleteMail(Long mailId);

    public MailDTO readMail(Long mailId);
}
