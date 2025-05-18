package com.trantienanh.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.trantienanh.backend.Models.ClientInfo;
import com.trantienanh.backend.Models.Flight;
import com.trantienanh.backend.Models.FlightTicket;
import com.trantienanh.backend.Models.User;

import java.util.Date;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FlightTicketDTO {
    private int adultSeat;

    private int childrenSeat;

    private int babySeat;

    private float totalPrice;

    private Date bookingDate;

    private User user;

    private Flight flight;

    private List<ClientInfo> clientInfoList;

    private int statusCode;

    private String message;

    private FlightTicket flightTicket;

    private List<FlightTicket> flightTicketList;

    // Record
    private List<FlightHistoryDTO> flightHistoryList;

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

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public FlightTicket getFlightTicket() {
        return flightTicket;
    }

    public void setFlightTicket(FlightTicket flightTicket) {
        this.flightTicket = flightTicket;
    }

    public List<FlightTicket> getFlightTicketList() {
        return flightTicketList;
    }

    public void setFlightTicketList(List<FlightTicket> flightTicketList) {
        this.flightTicketList = flightTicketList;
    }

    public List<FlightHistoryDTO> getFlightHistoryList() {
        return flightHistoryList;
    }

    public void setFlightHistoryList(List<FlightHistoryDTO> flightHistoryList) {
        this.flightHistoryList = flightHistoryList;
    }
}
