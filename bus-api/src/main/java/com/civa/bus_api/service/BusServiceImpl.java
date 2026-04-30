package com.civa.bus_api.service;

import com.civa.bus_api.dto.BusRequestDto;
import com.civa.bus_api.dto.BusResponseDto;
import com.civa.bus_api.model.Bus;
import com.civa.bus_api.model.MarcaBus;
import com.civa.bus_api.repository.BusRepository;
import com.civa.bus_api.repository.MarcaBusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {

    private final BusRepository busRepository;
    private final MarcaBusRepository marcaBusRepository;

    @Override
    public Page<BusResponseDto> getAllBuses(Pageable pageable) {
        return busRepository.findAll(pageable).map(this::mapToDto);
    }

    @Override
    public BusResponseDto getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bus no encontrado"));
        return mapToDto(bus);
    }

    @Override
    public BusResponseDto createBus(BusRequestDto request) {
        MarcaBus marca = marcaBusRepository.findById(request.getMarcaId())
                .orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Marca de bus no encontrada"));

        Bus bus = new Bus();
        bus.setNumeroBus(request.getNumeroBus());
        bus.setPlaca(request.getPlaca());
        bus.setCaracteristicas(request.getCaracteristicas());
        bus.setMarca(marca);
        bus.setActivo(request.getActivo());

        Bus savedBus = busRepository.save(bus);
        return mapToDto(savedBus);
    }

    @Override
    public BusResponseDto updateBus(Long id, BusRequestDto request) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Bus no encontrado"));

        MarcaBus marca = marcaBusRepository.findById(request.getMarcaId())
                .orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Marca de bus no encontrada"));

        bus.setNumeroBus(request.getNumeroBus());
        bus.setPlaca(request.getPlaca());
        bus.setCaracteristicas(request.getCaracteristicas());
        bus.setMarca(marca);
        bus.setActivo(request.getActivo());

        Bus updatedBus = busRepository.save(bus);
        return mapToDto(updatedBus);
    }

    private BusResponseDto mapToDto(Bus bus) {
        BusResponseDto dto = new BusResponseDto();
        dto.setId(bus.getId());
        dto.setNumeroBus(bus.getNumeroBus());
        dto.setPlaca(bus.getPlaca());
        dto.setFechaCreacion(bus.getFechaCreacion());
        dto.setCaracteristicas(bus.getCaracteristicas());
        dto.setMarcaNombre(bus.getMarca() != null ? bus.getMarca().getNombre() : null);
        dto.setActivo(bus.getActivo());
        return dto;
    }
}
