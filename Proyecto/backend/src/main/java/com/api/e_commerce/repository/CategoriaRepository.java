package com.api.e_commerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.e_commerce.model.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // JpaRepository ya proporciona los métodos básicos CRUD:
    // findAll(), findById(), save(), deleteById(), etc.
}