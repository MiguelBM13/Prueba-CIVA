package com.civa.bus_api.repository;

import com.civa.bus_api.model.MarcaBus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaBusRepository extends JpaRepository<MarcaBus, Long> {
    Optional<MarcaBus> findByNombreIgnoreCase(String nombre);
}
