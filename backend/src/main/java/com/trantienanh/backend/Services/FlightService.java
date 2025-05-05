package com.trantienanh.backend.Services;

import com.trantienanh.backend.DTO.FlightDTO;

public interface FlightService {
    public FlightDTO addFlight(FlightDTO flightDTO);

    public FlightDTO getAllFlight();

    public FlightDTO editFlight(Long flightId, FlightDTO flightDTO);

    public FlightDTO deleteFlight(Long flightId);

    public FlightDTO getSelectedFlight(Long flightId);
}
