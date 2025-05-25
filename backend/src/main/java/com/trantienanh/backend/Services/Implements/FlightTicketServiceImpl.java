package com.trantienanh.backend.Services.Implements;

import com.trantienanh.backend.DTO.*;
import com.trantienanh.backend.Models.ClientInfo;
import com.trantienanh.backend.Models.Flight;
import com.trantienanh.backend.Models.FlightTicket;
import com.trantienanh.backend.Models.User;
import com.trantienanh.backend.Repositories.ClientInfoRepository;
import com.trantienanh.backend.Repositories.FlightRepository;
import com.trantienanh.backend.Repositories.FlightTicketRepository;
import com.trantienanh.backend.Repositories.UserRepository;
import com.trantienanh.backend.Services.FlightTicketService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
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

    @Autowired
    private JavaMailSender javaMailSender;

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
                        sendMail(clientInfoList, flightTicket, user.getEmail());
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

    private void sendMail(List<ClientInfo> clientInfoList, FlightTicket flightTicket, String email) throws MessagingException {
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat nf = NumberFormat.getInstance(localeVN);
        SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");

        StringBuilder htmlBody = new StringBuilder();
        htmlBody.append("<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>");
        htmlBody.append("<h1 style='color: #2c3e50;'>Thank you for choosing to book tickets at TTAFlight</h1>");
        htmlBody.append("<h1 style='color: #2c3e50;'>Here is your booking information:</h1>");
        htmlBody.append("<h3 style='color: #34495e;'>- Ticket:</h3>");
        htmlBody.append("<p><b>Ticket ID:</b> ").append(flightTicket.getTicketId()).append("</p>");
        htmlBody.append("<p><b>Total Client:</b> ").append(clientInfoList.size()).append("</p>");
        htmlBody.append("<p><b>Total Price:</b> ").append(nf.format(flightTicket.getTotalPrice())).append(" VNĐ</p>");
        htmlBody.append("<p><b>Booking Date:</b> ").append(df.format(flightTicket.getBookingDate())).append("</p>");
        htmlBody.append("<h3 style='color: #34495e;'>- Client:</h3>");
        htmlBody.append("<table style='border-collapse: collapse; width: 100%; font-size: 14px;'>");
        htmlBody.append("<thead>");
        htmlBody.append("<tr style='background-color: #f2f2f2;'>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Seat</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>First Name</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Last Name</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Gender</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Date Of Birth</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Category</th>");
        htmlBody.append("<th style='border: 1px solid #ccc; padding: 8px;'>Passport/ID</th>");
        htmlBody.append("</tr>");
        htmlBody.append("</thead>");
        htmlBody.append("<tbody>");
        for (ClientInfo clientInfo : clientInfoList) {
            String gender = clientInfo.isGender() ? "Male" : "Female";
            String passport = clientInfo.getPassport() == null ? "" : clientInfo.getPassport();
            htmlBody.append("<tr>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(clientInfo.getClientId()).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(clientInfo.getFirstName()).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(clientInfo.getLastName()).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(gender).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(df.format(clientInfo.getDateOfBirth())).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(clientInfo.getAgeCategory()).append("</td>");
            htmlBody.append("<td style='border: 1px solid #ccc; padding: 8px;'>").append(passport).append("</td>");
            htmlBody.append("</tr>");
        }
        htmlBody.append("</tbody>");
        htmlBody.append("</table>");
        htmlBody.append("</div>");

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("TTAFlight@example.com");
        helper.setTo(email);
        helper.setSubject("Booked Flight Successfully");
        helper.setText(htmlBody.toString(), true);

        javaMailSender.send(message);
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
                    response.setMessage("You Haven't Booked Any Flight Yet.");
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

    @Override
    public FlightTicketDTO getSelectedHistory(Long ticketId, String username) {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            User user = userRepository.findByUsername(username).orElse(null);
            FlightHistoryDTO selectedHistory = flightTicketRepository.getSelectedFlightHistory(ticketId, user).orElse(null);
            List<ClientInfoDTO> clientInfoList = clientInfoRepository.findClientList(ticketId);

            if (selectedHistory != null && clientInfoList != null) {
                response.setClientInfoDTO(clientInfoList);
                response.setFlightHistory(selectedHistory);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Ticket Not Exist");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightTicketDTO getAllBookedInfo() {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            List<BookedInfoDTO> bookedInfoList = flightTicketRepository.getAllBookedInfo();

            if (!bookedInfoList.isEmpty()) {
                response.setBookedInfoList(bookedInfoList);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("No One Has Booked A Flight Yet.");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightTicketDTO getSelectedBookedInfo(Long ticketId) {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            BookedInfoDTO selectedBookedInfo = flightTicketRepository.getSelectedBookedInfo(ticketId).orElse(null);
            List<ClientInfoDTO> clientInfoList = clientInfoRepository.findClientList(ticketId);

            if (selectedBookedInfo != null) {
                response.setBookedInfo(selectedBookedInfo);
                response.setClientInfoDTO(clientInfoList);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Ticket Not Exist");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    @Override
    public FlightTicketDTO searchBookedInfo(Long ticketId) {
        FlightTicketDTO response = new FlightTicketDTO();

        try {
            BookedInfoDTO selectedBookedInfo = flightTicketRepository.getSelectedBookedInfo(ticketId).orElse(null);

            if (selectedBookedInfo != null) {
                response.setBookedInfo(selectedBookedInfo);
                response.setStatusCode(200);
            }
            else {
                response.setStatusCode(404);
                response.setMessage("Ticket Not Exist");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }
}
