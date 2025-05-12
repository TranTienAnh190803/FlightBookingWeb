package com.trantienanh.backend.Models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class ClientInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;

    private String firstName;

    private String lastName;

    private boolean gender;

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    private String ageCategory;

    private String passport;

    @ManyToOne
    @JoinColumn(name = "ticketId")
    private FlightTicket flightTicket;

    public ClientInfo() {
    }

    public ClientInfo(String firstName, String lastName, boolean gender, Date dateOfBirth, String ageCategory, String passport, FlightTicket flightTicket) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.ageCategory = ageCategory;
        this.passport = passport;
        this.flightTicket = flightTicket;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAgeCategory() {
        return ageCategory;
    }

    public void setAgeCategory(String ageCategory) {
        this.ageCategory = ageCategory;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public FlightTicket getFlightTicket() {
        return flightTicket;
    }

    public void setFlightTicket(FlightTicket flightTicket) {
        this.flightTicket = flightTicket;
    }
}
