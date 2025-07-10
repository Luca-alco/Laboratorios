package com.api.e_commerce.service;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.exception.PrecioNegativoException;
import com.api.e_commerce.exception.ProductoNotFoundException;
import com.api.e_commerce.model.Producto;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.ProductoRepository;
import com.api.e_commerce.repository.UsuarioRepository;


@Service
@Transactional
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository, UsuarioRepository usuarioRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
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
        .orElseThrow(() -> new ProductoNotFoundException(id));
    Hibernate.initialize(producto.getCategorias());
    return producto;
}

    public List<Producto> obtenerProductosPorUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return productoRepository.findByUsuario(usuario);
    }

    public Producto crearProducto(Producto producto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        producto.setUsuario(usuario);
        if (producto.getPrecio() <= 0) {
            throw new PrecioNegativoException();
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
    public Producto actualizarDescripcion(Long id, String descripcion) {
        Producto producto = this.obtenerProductoPorId(id);
        if (descripcion == null || descripcion.trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción no puede estar vacía");
        }
        producto.setDescripcion(descripcion);
        return this.productoRepository.save(producto);
    }

    public Producto actualizarPrecio(Long id,double newPrecio){
        Producto producto = this.obtenerProductoPorId(id);
        if (newPrecio <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }
        producto.setPrecio(newPrecio);
        return this.productoRepository.save(producto);
    }

    public Producto actualizarStock(Long id, int stock){
        Producto producto = this.obtenerProductoPorId(id);
        if (stock <= 0) {
            throw new IllegalArgumentException("La cantidad no puede ser 0");
        }
        producto.setStock(stock);
        return this.productoRepository.save(producto);
    }

}
