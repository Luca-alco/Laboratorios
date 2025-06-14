package com.api.e_commerce.repository;

import com.api.e_commerce.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, buscar productos por nombre o precio
    
}
