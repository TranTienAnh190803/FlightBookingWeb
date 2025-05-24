package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.DTO.BookedInfoDTO;
import com.trantienanh.backend.DTO.ClientInfoDTO;
import com.trantienanh.backend.DTO.FlightHistoryDTO;
import com.trantienanh.backend.Models.FlightTicket;
import com.trantienanh.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {

    @Query("SELECT new com.trantienanh.backend.DTO.FlightHistoryDTO(" +
                    "f.ticketId, f.adultSeat, f.childrenSeat, f.babySeat, f.totalPrice, f.bookingDate, f.flight" +
                    ") " +
                    "FROM FlightTicket f WHERE f.user = :user " +
                    "ORDER BY f.bookingDate DESC")
    List<FlightHistoryDTO> getBookingHistory(@Param("user") User user);


    @Query("SELECT new com.trantienanh.backend.DTO.FlightHistoryDTO(" +
                    "f.ticketId, f.adultSeat, f.childrenSeat, f.babySeat, f.totalPrice, f.bookingDate, f.flight" +
                    ") " +
                    "FROM FlightTicket f WHERE f.ticketId = :ticketId AND f.user = :user")
    Optional<FlightHistoryDTO> getSelectedFlightHistory(@Param("ticketId") Long ticketId, @Param("user") User user);


    @Query("SELECT new com.trantienanh.backend.DTO.BookedInfoDTO(" +
                    "f.ticketId, f.adultSeat, f.childrenSeat, f.babySeat, f.totalPrice, f.bookingDate, f.user.username, f.user.name, f.user.email, f.user.phoneNumber, f.flight" +
                    ") " +
                    "FROM FlightTicket f " +
                    "ORDER BY f.bookingDate DESC")
    List<BookedInfoDTO> getAllBookedInfo();

    @Query("SELECT new com.trantienanh.backend.DTO.BookedInfoDTO(" +
                    "f.ticketId, f.adultSeat, f.childrenSeat, f.babySeat, f.totalPrice, f.bookingDate, f.user.username, f.user.name, f.user.email, f.user.phoneNumber, f.flight" +
                    ") " +
                    "FROM FlightTicket f WHERE f.ticketId = :ticketId")
    Optional<BookedInfoDTO> getSelectedBookedInfo(@Param("ticketId") Long ticketId);
}
