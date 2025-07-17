package com.api.e_commerce.repository;

import com.api.e_commerce.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    boolean existsByNombre(String nombre);
}