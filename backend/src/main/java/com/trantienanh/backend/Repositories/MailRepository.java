package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailRepository extends JpaRepository<Mail, Long> {
}
