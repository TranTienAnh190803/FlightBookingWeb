package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.DTO.ClientInfoDTO;
import com.trantienanh.backend.Models.ClientInfo;
import com.trantienanh.backend.Models.FlightTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientInfoRepository extends JpaRepository<ClientInfo, Long> {

    @Query("SELECT new com.trantienanh.backend.DTO.ClientInfoDTO(" +
            "c.clientId, c.firstName, c.lastName, c.gender, c.dateOfBirth, c.ageCategory, c.passport" +
            ") " +
            "FROM ClientInfo c WHERE c.flightTicket.ticketId = :ticketId")
    List<ClientInfoDTO> findClientList(@Param("ticketId") Long ticketId);
}
