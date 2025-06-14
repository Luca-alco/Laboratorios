package com.api.e_commerce.service;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.ProductoRepository;


@Service
@Transactional
public class ProductoService {
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
    public List<Producto> obternerTodosProductos() {
        List<Producto> productos = this.productoRepository.findAll();
        System.out.println("Service: Total productos encontrados: " + productos.size());
        productos.forEach(p -> System.out.println("Service: Producto ID: " + p.getId() + ", Nombre: " + p.getNombre()));
        return productos;
    }
    @Transactional(readOnly = true)
    public Producto obtenerProductoPorId(Long id) {
    Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    Hibernate.initialize(producto.getCategorias());
    return producto;
}

    public Producto crearProducto(Producto producto) {
        if (producto.getPrecio() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor que cero.");
        }
        if (producto.getNombre() == null || producto.getNombre().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto es requerido.");
        }
        if (Double.isNaN(producto.getPrecio()) || Double.isInfinite(producto.getPrecio())) {
            throw new IllegalArgumentException("El precio debe ser un número válido.");
        }
        return this.productoRepository.save(producto);
    }
    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        Producto productoExistente = this.obtenerProductoPorId(id);

        //actualizar solo los campos permitidos
        productoExistente.setNombre(productoActualizado.getNombre());
        productoExistente.setPrecio(productoActualizado.getPrecio());
        return this.productoRepository.save(productoExistente);
    }
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

}
