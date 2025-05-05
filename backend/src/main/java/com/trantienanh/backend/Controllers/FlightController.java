package com.trantienanh.backend.Controllers;

import com.trantienanh.backend.DTO.FlightDTO;
import com.trantienanh.backend.Repositories.FlightRepository;
import com.trantienanh.backend.Services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/admin-user/get-selected-flight")
    public ResponseEntity<FlightDTO> getSelectedFlight(@RequestParam("flightId") Long flightId) {
        FlightDTO response = flightService.getSelectedFlight(flightId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/admin/edit-flight")
    public ResponseEntity<FlightDTO> editFlight(@RequestParam("flightId") Long flightId, @RequestBody FlightDTO flightDTO) {
        FlightDTO response = flightService.editFlight(flightId, flightDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete-flight")
    public ResponseEntity<FlightDTO> deleteFlight(@RequestParam("flightId") Long flightId) {
        FlightDTO response = flightService.deleteFlight(flightId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
