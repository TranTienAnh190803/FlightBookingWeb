package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MailRepository extends JpaRepository<Mail, Long> {

    @Query("SELECT m FROM Mail m ORDER BY m.sendDate DESC")
    List<Mail> getAllMailByDate();
}
