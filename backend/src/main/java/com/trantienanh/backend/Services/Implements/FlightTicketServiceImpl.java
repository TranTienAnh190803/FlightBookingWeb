package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.FlightHistoryDTO;
import com.trantienanh.backend.DTO.FlightTicketDTO;
import com.trantienanh.backend.DTO.UserDTO;
import com.trantienanh.backend.Models.ClientInfo;
import com.trantienanh.backend.Models.Flight;
import com.trantienanh.backend.Models.FlightTicket;
import com.trantienanh.backend.Models.User;
import com.trantienanh.backend.Repositories.ClientInfoRepository;
import com.trantienanh.backend.Repositories.FlightRepository;
import com.trantienanh.backend.Repositories.FlightTicketRepository;
import com.trantienanh.backend.Repositories.UserRepository;
import com.trantienanh.backend.Services.FlightTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FlightTicketServiceImpl implements FlightTicketService {
    @Autowired
    private FlightTicketRepository flightTicketRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientInfoRepository clientInfoRepository;

    @Override
    public FlightTicketDTO bookFlight(String username, Long flightId, FlightTicketDTO flightTicketDTO) {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);
            Flight flight = flightRepository.findById(flightId).orElse(null);
            List<ClientInfo> clientInfoList = flightTicketDTO.getClientInfoList().stream().filter(Objects::nonNull).toList();

            if (user != null && flight != null) {
                float flightPrice = flight.getPrice();
                int adultSeat = flightTicketDTO.getAdultSeat();
                int childrenSeat = flightTicketDTO.getChildrenSeat();
                int babySeat = flightTicketDTO.getBabySeat();
                float totalPrice = flightPrice + (adultSeat * flight.getAdultPrice()) + (childrenSeat * flight.getChildrenPrice()) + (babySeat * flight.getBabyPrice());
                int totalSeat = adultSeat + childrenSeat + babySeat;

                if (totalSeat <= flight.getRemain()) {
                    // Main (Add Info to FlightTicket)
                    FlightTicket bookingInfo = new FlightTicket(adultSeat,
                            childrenSeat,
                            babySeat,
                            totalPrice,
                            user,
                            flight,
                            clientInfoList
                    );

                    // Reverse (Add ticketId for ClientInfo)
                    for (ClientInfo clientInfo : clientInfoList) {
                        clientInfo.setFlightTicket(bookingInfo);
                    }

                    FlightTicket flightTicket = flightTicketRepository.save(bookingInfo);

                    if (flightTicketRepository.existsById(flightTicket.getTicketId())) {
                        flight.setRemain(flight.getRemain() - totalSeat);
                        flightRepository.save(flight);
                        response.setStatusCode(200);
                        response.setMessage("Booked Flight Successfully");
                    }
                    else {
                        response.setStatusCode(500);
                        response.setMessage("Booked Flight Fail");
                    }
                }
                else {
                    response.setStatusCode(500);
                    response.setMessage("Booked Flight Fail: The Remain Seat Is Not Enough");
                }
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Not Found Error");
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public UserDTO getContactInfo(String username) {
        UserDTO response = new UserDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {
                response.setName(user.getName());
                response.setEmail(user.getEmail());
                response.setPhoneNumber(user.getPhoneNumber());
                response.setDateOfBirth(user.getDateOfBirth());
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightTicketDTO bookingHistory(String username) {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {
                List<FlightHistoryDTO> bookingHistory = flightTicketRepository.getBookingHistory(user);
                if (bookingHistory != null) {
                    response.setFlightHistoryList(bookingHistory);
                    response.setStatusCode(200);
                }
                else {
                    response.setStatusCode(200);
                    response.setMessage("You Haven't Booking Any Flight Yet. Let's Booking A Flight For Your Vacation.");
                }
            }
            else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
