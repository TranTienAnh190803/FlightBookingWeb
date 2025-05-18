package com.trantienanh.backend.Models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class FlightTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    private int adultSeat;

    private int childrenSeat;

    private int babySeat;

    private float totalPrice;

    private Date bookingDate;

    @ManyToOne
    @JoinColumn(name = "userId", unique = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "flightId", unique = false)
    private Flight flight;

    @OneToMany(mappedBy = "flightTicket", cascade = CascadeType.ALL)
    private List<ClientInfo> clientInfoList;

    public FlightTicket() {
    }

    public FlightTicket(int adultSeat, int childrenSeat, int babySeat, float totalPrice, User user, Flight flight, List<ClientInfo> clientInfoList) {
        this.adultSeat = adultSeat;
        this.childrenSeat = childrenSeat;
        this.babySeat = babySeat;
        this.totalPrice = totalPrice;
        this.bookingDate = new Date();
        this.user = user;
        this.flight = flight;
        this.clientInfoList = clientInfoList;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public int getAdultSeat() {
        return adultSeat;
    }

    public void setAdultSeat(int adultSeat) {
        this.adultSeat = adultSeat;
    }

    public int getChildrenSeat() {
        return childrenSeat;
    }

    public void setChildrenSeat(int childrenSeat) {
        this.childrenSeat = childrenSeat;
    }

    public int getBabySeat() {
        return babySeat;
    }

    public void setBabySeat(int babySeat) {
        this.babySeat = babySeat;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public List<ClientInfo> getClientInfoList() {
        return clientInfoList;
    }

    public void setClientInfoList(List<ClientInfo> clientInfoList) {
        this.clientInfoList = clientInfoList;
    }
}
