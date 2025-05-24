package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.FlightTicketDTO;
import com.trantienanh.backend.DTO.UserDTO;
import com.trantienanh.backend.Services.FlightTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class FlightTicketController {
    @Autowired
    private FlightTicketService flightTicketService;

    @PostMapping("/user/book-flight")
    public ResponseEntity<FlightTicketDTO> bookFlight(@RequestParam("flightId") Long flightId, @RequestBody FlightTicketDTO flightTicketDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        FlightTicketDTO response = flightTicketService.bookFlight(username, flightId, flightTicketDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/user/get-contact-info")
    public ResponseEntity<UserDTO> getContactInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO response = flightTicketService.getContactInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/user/booking-history")
    public ResponseEntity<FlightTicketDTO> bookingHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        FlightTicketDTO response = flightTicketService.bookingHistory(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/user/get-selected-history")
    public ResponseEntity<FlightTicketDTO> getSelectedHistory(@RequestParam("ticketId") Long ticketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        FlightTicketDTO response = flightTicketService.getSelectedHistory(ticketId, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-booked-info")
    public ResponseEntity<FlightTicketDTO> getAllBookedInfo() {
        FlightTicketDTO response = flightTicketService.getAllBookedInfo();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/search-booked-info")
    public ResponseEntity<FlightTicketDTO> searchBookedInfo(@RequestParam("ticketId") Long ticketId) {
        FlightTicketDTO response = flightTicketService.searchBookedInfo(ticketId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/admin/get-selected-booked-info")
    public ResponseEntity<FlightTicketDTO> getSelectedBookedInfo(@RequestParam("ticketId") Long ticketId) {
        FlightTicketDTO response = flightTicketService.getSelectedBookedInfo(ticketId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
