package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
