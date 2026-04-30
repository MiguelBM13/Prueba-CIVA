package com.civa.bus_api.service;

import com.civa.bus_api.dto.BusResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BusService {
    Page<BusResponseDto> getAllBuses(Pageable pageable);
    BusResponseDto getBusById(Long id);
    BusResponseDto createBus(com.civa.bus_api.dto.BusRequestDto request);
    BusResponseDto updateBus(Long id, com.civa.bus_api.dto.BusRequestDto request);
}
