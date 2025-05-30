package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.FlightTicketDTO;
import com.trantienanh.backend.DTO.UserDTO;

public interface FlightTicketService {
    public FlightTicketDTO bookFlight(String username, Long flightId, FlightTicketDTO flightTicketDTO);

    public UserDTO getContactInfo(String username);

    public FlightTicketDTO bookingHistory(String username);

    public FlightTicketDTO getSelectedHistory(Long ticketId, String username);

    public FlightTicketDTO getAllBookedInfo();

    public FlightTicketDTO getSelectedBookedInfo(Long ticketId);

    public FlightTicketDTO searchBookedInfo(Long ticketId);
}
