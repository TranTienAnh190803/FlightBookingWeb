package com.trantienanh.backend.DTO;

import com.trantienanh.backend.Models.Flight;

import java.util.Date;

public record FlightHistoryDTO(
        Long ticketId,
        int adultSeat,
        int childrenSeat,
        int babySeat,
        float totalPrice,
        Date bookingDate,
        Flight flight
) {}