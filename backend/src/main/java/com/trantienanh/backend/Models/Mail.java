package com.trantienanh.backend.Models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailId;

    private String fullName;

    private String email;

    private String title;

    @Column(length = 1000)
    private String content;

    private boolean status;

    private Date sendDate;

    public Mail() {
    }

    public Mail(String fullName, String email, String title, String content, boolean status) {
        this.fullName = fullName;
        this.email = email;
        this.title = title;
        this.content = content;
        this.status = status;
        this.sendDate = new Date();
    }

    public Long getMailId() {
        return mailId;
    }

    public void setMailId(Long mailId) {
        this.mailId = mailId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getSendDate() {
        return sendDate;
    }

    public void setSendDate(Date sendDate) {
        this.sendDate = sendDate;
    }
}
