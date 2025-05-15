package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.FlightTicketDTO;
import com.trantienanh.backend.DTO.UserDTO;

public interface FlightTicketService {
    public FlightTicketDTO bookFlight(String username, Long flightId, FlightTicketDTO flightTicketDTO);

    public UserDTO getContactInfo(String username);
}
