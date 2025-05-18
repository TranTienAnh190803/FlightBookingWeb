package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.DTO.FlightHistoryDTO;
import com.trantienanh.backend.Models.FlightTicket;
import com.trantienanh.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {

    @Query(
            "SELECT new com.trantienanh.backend.DTO.FlightHistoryDTO(" +
                    "f.ticketId, f.adultSeat, f.childrenSeat, f.babySeat, f.totalPrice, f.bookingDate, f.user.id, f.flight.id" +
                    ")" +
                    "FROM FlightTicket f WHERE f.user = :user " +
                    "ORDER BY f.bookingDate DESC"
    )
    List<FlightHistoryDTO> getBookingHistory(@Param("user") User user);
}
