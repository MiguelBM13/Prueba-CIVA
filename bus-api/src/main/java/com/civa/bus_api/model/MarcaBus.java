package com.civa.bus_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "marca_bus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaBus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;
}
