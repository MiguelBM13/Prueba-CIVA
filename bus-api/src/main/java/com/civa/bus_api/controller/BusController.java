package com.civa.bus_api.controller;

import com.civa.bus_api.dto.BusResponseDto;
import com.civa.bus_api.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bus")
@RequiredArgsConstructor
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<Page<BusResponseDto>> getAllBuses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(busService.getAllBuses(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusResponseDto> getBusById(@PathVariable Long id) {
        return ResponseEntity.ok(busService.getBusById(id));
    }

    @PostMapping
    public ResponseEntity<BusResponseDto> createBus(@jakarta.validation.Valid @RequestBody com.civa.bus_api.dto.BusRequestDto request) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(busService.createBus(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusResponseDto> updateBus(@PathVariable Long id, @jakarta.validation.Valid @RequestBody com.civa.bus_api.dto.BusRequestDto request) {
        return ResponseEntity.ok(busService.updateBus(id, request));
    }
}
