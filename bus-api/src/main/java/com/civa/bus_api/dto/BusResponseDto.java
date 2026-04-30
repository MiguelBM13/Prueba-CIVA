package com.civa.bus_api.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BusResponseDto {
    private Long id;
    private String numeroBus;
    private String placa;
    private LocalDateTime fechaCreacion;
    private String caracteristicas;
    private String marcaNombre;
    private Boolean activo;
}
