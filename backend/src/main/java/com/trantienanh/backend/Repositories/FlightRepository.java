package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query(value = "SELECT * FROM Flight WHERE round_trip = :roundTrip AND departure_city = :departureCity AND destination_city = :destinationCity AND DATE(departure_date) = :departureDate AND DATE(return_date) = :returnDate", nativeQuery = true)
    List<Flight> searchFlight(@Param("roundTrip") boolean roundTrip,
                              @Param("departureCity") String departureCity,
                              @Param("destinationCity") String destinationCity,
                              @Param("departureDate") Date departureDate,
                              @Param("returnDate") Date returnDate);

    @Query(value = "SELECT * FROM Flight WHERE round_trip = :roundTrip AND departure_city = :departureCity AND destination_city = :destinationCity AND DATE(departure_date) = :departureDate", nativeQuery = true)
    List<Flight> searchFlightNoRoundTrip(@Param("roundTrip") boolean roundTrip,
                                         @Param("departureCity") String departureCity,
                                         @Param("destinationCity") String destinationCity,
                                         @Param("departureDate") Date departureDate);

    @Query("SELECT f FROM Flight f WHERE f.price <= :cheapPrice")
    List<Flight> findCheapFlight(@Param(("cheapPrice")) float cheapPrice);
}
