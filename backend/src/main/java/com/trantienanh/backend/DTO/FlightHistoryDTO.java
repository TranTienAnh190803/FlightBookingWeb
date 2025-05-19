package com.trantienanh.backend.DTO;

import java.util.Date;

public record FlightHistoryDTO(
        Long ticketId,
        int adultSeat,
        int childrenSeat,
        int babySeat,
        float totalPrice,
        Date bookingDate,
        Long flightId,
        String flightName,
        String departureAirport,
        Date departureDate
) {}