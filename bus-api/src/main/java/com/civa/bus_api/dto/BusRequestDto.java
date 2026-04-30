package com.civa.bus_api.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class BusRequestDto {
    @NotBlank(message = "El número de bus es obligatorio")
    private String numeroBus;
    
    @NotBlank(message = "La placa es obligatoria")
    private String placa;
    
    private String caracteristicas;
    
    @NotNull(message = "El ID de la marca es obligatorio")
    private Long marcaId;
    
    @NotNull(message = "El estado activo es obligatorio")
    private Boolean activo;
}
