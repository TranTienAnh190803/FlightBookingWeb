package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.FlightTicketDTO;
import com.trantienanh.backend.Services.FlightTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
