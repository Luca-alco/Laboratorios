package com.api.e_commerce.repository;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, buscar productos por nombre o precio
    List<Producto> findByUsuario(Usuario usuario);
}
