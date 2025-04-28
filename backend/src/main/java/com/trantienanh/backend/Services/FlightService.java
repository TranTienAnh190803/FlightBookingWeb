package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.FlightDTO;

public interface FlightService {
    public FlightDTO addFlight(FlightDTO flightDTO);

    public FlightDTO getAllFlight();
}
