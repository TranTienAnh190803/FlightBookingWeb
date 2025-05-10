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
                                            flightDTO.getPrice(),
                                            flightDTO.getAdultPrice(),
                                            flightDTO.getChildrenPrice(),
                                            flightDTO.getBabyPrice(),
                                            flightDTO.isRoundTrip(),
                                            flightDTO.getReturnDate()
            );

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

    @Override
    public FlightDTO editFlight(Long flightId, FlightDTO flightDTO) {
        FlightDTO response = new FlightDTO();

        try {
            Flight flightNeedEdit = flightRepository.findById(flightId).orElse(null);

            if (flightNeedEdit != null) {
                Flight newFlight = new Flight(flightId,
                        flightDTO.getFlightName(),
                        flightDTO.getAirline(),
                        flightDTO.getDepartureAirport(),
                        flightDTO.getDepartureCity(),
                        flightDTO.getDepartureDate(),
                        flightDTO.getDestinationAirport(),
                        flightDTO.getDestinationCity(),
                        flightDTO.getArrivalDate(),
                        flightDTO.getCapacity(),
                        flightDTO.getRemain(),
                        flightDTO.getPlaneType(),
                        flightDTO.getPrice(),
                        flightDTO.getAdultPrice(),
                        flightDTO.getChildrenPrice(),
                        flightDTO.getBabyPrice(),
                        flightDTO.isRoundTrip(),
                        flightDTO.getReturnDate()
                );

                flightRepository.save(newFlight);
                response.setStatusCode(200);
                response.setMessage("Edited Flight Successfully");
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Flight Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightDTO deleteFlight(Long flightId) {
        FlightDTO response = new FlightDTO();

        try {
            Flight flightNeedDel = flightRepository.findById(flightId).orElse(null);

            if (flightNeedDel != null) {
                flightRepository.delete(flightNeedDel);
                response.setStatusCode(200);
                response.setMessage("Deleted Flight Successfully");
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Flight Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightDTO getSelectedFlight(Long flightId) {
        FlightDTO response = new FlightDTO();

        try {
            Flight selectedFlight = flightRepository.findById(flightId).orElse(null);

            if (selectedFlight != null) {
                response.setFlight(selectedFlight);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Flight Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightDTO searchFlight(FlightDTO flightDTO) {
        FlightDTO response = new FlightDTO();

        try {
            if (flightDTO.isRoundTrip()) {
                List<Flight> flightList = flightRepository.searchFlight(flightDTO.isRoundTrip(),
                        flightDTO.getDepartureCity(),
                        flightDTO.getDestinationCity(),
                        flightDTO.getDepartureDate(),
                        flightDTO.getReturnDate()
                );

                if (!flightList.isEmpty()) {
                    response.setFlightList(flightList);
                    response.setStatusCode(200);
                }
                else {
                    response.setStatusCode(404);
                    response.setMessage("Flight Not Found");
                }
            }
            else {
                List<Flight> flightList = flightRepository.searchFlightNoRoundTrip(flightDTO.isRoundTrip(),
                        flightDTO.getDepartureCity(),
                        flightDTO.getDestinationCity(),
                        flightDTO.getDepartureDate()
                );

                if (!flightList.isEmpty()) {
                    response.setFlightList(flightList);
                    response.setStatusCode(200);
                }
                else {
                    response.setStatusCode(404);
                    response.setMessage("Flight Not Found");
                }
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
