package com.civa.bus_api.controller;

import com.civa.bus_api.model.MarcaBus;
import com.civa.bus_api.repository.MarcaBusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/marcas")
@RequiredArgsConstructor
public class MarcaBusController {

    private final MarcaBusRepository marcaBusRepository;

    @GetMapping
    public ResponseEntity<List<MarcaBus>> getAllMarcas() {
        return ResponseEntity.ok(marcaBusRepository.findAll());
    }
}
