package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.FlightDTO;
import com.trantienanh.backend.Models.Flight;
import com.trantienanh.backend.Repositories.FlightRepository;
import com.trantienanh.backend.Services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {
    @Autowired
    private FlightRepository flightRepository;

    @Override
    public FlightDTO addFlight(FlightDTO flightDTO) {
        FlightDTO response = new FlightDTO();

        try {
            Flight newFlight = new Flight(flightDTO.getFlightName(),
                                            flightDTO.getAirline(),
                                            flightDTO.getDepartureAirport(),
                                            flightDTO.getDepartureCity(),
                                            flightDTO.getDepartureDate(),
                                            flightDTO.getDestinationAirport(),
                                            flightDTO.getDestinationCity(),
                                            flightDTO.getArrivalDate(),
                                            flightDTO.getCapacity(),
                                            flightDTO.getCapacity(),
                                            flightDTO.getPlaneType(),
                                            flightDTO.getPrice());

            flightRepository.save(newFlight);
            response.setStatusCode(200);
            response.setMessage("Add Flight Successfully");
            response.setFlight(newFlight);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightDTO getAllFlight() {
        FlightDTO response = new FlightDTO();

        try {
            List<Flight> allFlight = flightRepository.findAll();

            if (allFlight != null) {
                response.setFlightList(allFlight);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("There Is No Flight");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
