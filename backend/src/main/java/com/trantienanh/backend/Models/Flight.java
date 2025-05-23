package com.trantienanh.backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private String flightName;

    private String airline;

    private String departureAirport;

    private String departureCity;

    private Date departureDate;

    private String destinationAirport;

    private String destinationCity;

    private Date arrivalDate;

    private int capacity;

    private int remain;

    private String planeType;

    private float price;

    private float adultPrice;

    private float childrenPrice;

    private float babyPrice;

    private boolean roundTrip;

    private Date returnDate;

    public Flight() {
    }

    // Constructor with flightId (for Update-Flight)
    public Flight(Long flightId, String flightName, String airline, String departureAirport, String departureCity, Date departureDate, String destinationAirport, String destinationCity, Date arrivalDate, int capacity, int remain, String planeType, float price, float adultPrice, float childrenPrice, float babyPrice, boolean roundTrip, Date returnDate) {
        this.flightId = flightId;
        this.flightName = flightName;
        this.airline = airline;
        this.departureAirport = departureAirport;
        this.departureCity = departureCity;
        this.departureDate = departureDate;
        this.destinationAirport = destinationAirport;
        this.destinationCity = destinationCity;
        this.arrivalDate = arrivalDate;
        this.capacity = capacity;
        this.remain = remain;
        this.planeType = planeType;
        this.price = price;
        this.adultPrice = adultPrice;
        this.childrenPrice = childrenPrice;
        this.babyPrice = babyPrice;
        this.roundTrip = roundTrip;
        this.returnDate = returnDate;
    }

    // Constructor without flightId (for Add-Flight)
    public Flight(String flightName, String airline, String departureAirport, String departureCity, Date departureDate, String destinationAirport, String destinationCity, Date arrivalDate, int capacity, int remain, String planeType, float price, float adultPrice, float childrenPrice, float babyPrice, boolean roundTrip, Date returnDate) {
        this.flightName = flightName;
        this.airline = airline;
        this.departureAirport = departureAirport;
        this.departureCity = departureCity;
        this.departureDate = departureDate;
        this.destinationAirport = destinationAirport;
        this.destinationCity = destinationCity;
        this.arrivalDate = arrivalDate;
        this.capacity = capacity;
        this.remain = remain;
        this.planeType = planeType;
        this.price = price;
        this.adultPrice = adultPrice;
        this.childrenPrice = childrenPrice;
        this.babyPrice = babyPrice;
        this.roundTrip = roundTrip;
        this.returnDate = returnDate;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getFlightName() {
        return flightName;
    }

    public void setFlightName(String flightName) {
        this.flightName = flightName;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public String getDestinationAirport() {
        return destinationAirport;
    }

    public void setDestinationAirport(String destinationAirport) {
        this.destinationAirport = destinationAirport;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getRemain() {
        return remain;
    }

    public void setRemain(int remain) {
        this.remain = remain;
    }

    public String getPlaneType() {
        return planeType;
    }

    public void setPlaneType(String planeType) {
        this.planeType = planeType;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getAdultPrice() {
        return adultPrice;
    }

    public void setAdultPrice(float adultPrice) {
        this.adultPrice = adultPrice;
    }

    public float getChildrenPrice() {
        return childrenPrice;
    }

    public void setChildrenPrice(float childrenPrice) {
        this.childrenPrice = childrenPrice;
    }

    public float getBabyPrice() {
        return babyPrice;
    }

    public void setBabyPrice(float babyPrice) {
        this.babyPrice = babyPrice;
    }

    public boolean isRoundTrip() {
        return roundTrip;
    }

    public void setRoundTrip(boolean roundTrip) {
        this.roundTrip = roundTrip;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
