package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.FlightDTO;
import com.trantienanh.backend.Repositories.FlightRepository;
import com.trantienanh.backend.Services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class FlightController {
    @Autowired
    private FlightService flightService;

    @PostMapping("/admin/add-flight")
    public ResponseEntity<FlightDTO> addFlight(@RequestBody FlightDTO flightDTO) {
        FlightDTO response = flightService.addFlight(flightDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/public/get-all-flight")
    public ResponseEntity<FlightDTO> getAllFlight() {
        FlightDTO response = flightService.getAllFlight();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/public/time")
    public String currentTime() {
        return LocalDateTime.now().toString();
    }
}
