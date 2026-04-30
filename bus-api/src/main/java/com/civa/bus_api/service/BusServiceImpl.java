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

    /**
     * Obtiene una lista paginada de todos los buses disponibles.
     * Convierte las entidades JPA a DTOs para no exponer la base de datos directamente al cliente.
     */
    @Override
    public Page<BusResponseDto> getAllBuses(Pageable pageable) {
        return busRepository.findAll(pageable).map(this::mapToDto);
    }

    /**
     * Obtiene un bus específico por su ID.
     * @throws ResponseStatusException si el bus no existe (HTTP 404).
     */
    @Override
    public BusResponseDto getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bus no encontrado"));
        return mapToDto(bus);
    }

    /**
     * Registra un nuevo bus en el sistema.
     * Verifica que la marca proporcionada (por ID) exista en la tabla MarcaBus.
     */
    @Override
    public BusResponseDto createBus(BusRequestDto request) {
        // Validación de existencia de la marca
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

    /**
     * Actualiza la información de un bus existente.
     * @param id ID del bus a actualizar.
     * @param request Datos nuevos a aplicar.
     */
    @Override
    public BusResponseDto updateBus(Long id, BusRequestDto request) {
        // Busca el bus existente
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Bus no encontrado"));

        // Verifica que la nueva marca exista
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

    /**
     * Helper pattern para mapear una entidad Bus hacia su representación BusResponseDto.
     */
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
