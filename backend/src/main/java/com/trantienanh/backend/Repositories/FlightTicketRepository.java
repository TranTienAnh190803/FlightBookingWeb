package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.FlightTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {
}
