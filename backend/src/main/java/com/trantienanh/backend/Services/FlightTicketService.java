package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.FlightTicketDTO;

public interface FlightTicketService {
    public FlightTicketDTO bookFlight(String username, Long flightId, FlightTicketDTO flightTicketDTO);
}
