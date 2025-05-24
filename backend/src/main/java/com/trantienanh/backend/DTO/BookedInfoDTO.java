package com.trantienanh.backend.DTO;

import com.trantienanh.backend.Models.Flight;

import java.util.Date;

public record BookedInfoDTO(
        Long ticketId,
        int adultSeat,
        int childrenSeat,
        int babySeat,
        float totalPrice,
        Date bookingDate,
        String username,
        String fullname,
        String email,
        String phoneNumber,
        Flight flight
) {
}
