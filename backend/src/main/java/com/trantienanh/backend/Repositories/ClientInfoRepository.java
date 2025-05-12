package com.trantienanh.backend.Repositories;

import com.trantienanh.backend.Models.ClientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientInfoRepository extends JpaRepository<ClientInfo, Long> {
}
