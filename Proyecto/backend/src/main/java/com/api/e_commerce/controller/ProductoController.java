package com.api.e_commerce.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.api.e_commerce.dto.ActualizarDescripcionRequest;
import com.api.e_commerce.dto.ActualizarPrecio;
import com.api.e_commerce.dto.ActualizarStock;
import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.ProductoRepository;
import com.api.e_commerce.service.ProductoService;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/productos") //localhost:8080/api/productos del locahost:8080/api/productos/id
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    @Autowired //inyecta automaticamente una instancia de productorepository en el controlador
    private ProductoRepository productoRepository;

    @Autowired //inyecta automaticamente una instancia de productorepository en el controlador
    private ProductoService productoService;

    @GetMapping
public List<Producto> getAllProductos() {
    System.out.println("Controller: Obteniendo todos los productos");
    List<Producto> productos = productoRepository.findAll();
    System.out.println("Controller: Se encontraron " + productos.size() + " productos");
    return productos;
}

@GetMapping("/{id}")
@Transactional(readOnly = true)
public ResponseEntity<Producto> getProductById(@PathVariable Long id) {
    try {
        System.out.println("\n------------------------------------");
        System.out.println("Controller: Recibida solicitud para producto ID: " + id);
        Producto producto = productoService.obtenerProductoPorId(id);
        System.out.println("Controller: Producto encontrado y enviando respuesta");
        System.out.println("------------------------------------\n");
        return ResponseEntity.ok(producto);
    } catch (RuntimeException e) {
        System.out.println("Controller: Error -> " + e.getMessage());
        System.out.println("------------------------------------\n");
        return ResponseEntity.notFound().build();
    }
}


    //http://localhost:8080/api/productos con metodo post http, enviar un body
    @PostMapping  //mapea una solicitud HTTP post para crear nuevos recursos

    public Producto crearProducto(@RequestBody Producto producto) {
        try{
            return productoService.crearProducto(producto);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }     
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        System.out.println("DELETE request received for id: " + id);
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error deleting product: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestBody ActualizarStock request) {
        try {
            Producto actualizado = productoService.actualizarStock(id, request.getStock());
            return ResponseEntity.ok(actualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/mis-publicaciones")
    public List<Producto> getMisPublicaciones() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return productoService.obtenerProductosPorUsuario(email);
    }

    @PatchMapping("/{id}/descripcion")
    public ResponseEntity<?> actualizarDescripcion(@PathVariable Long id, @RequestBody ActualizarDescripcionRequest request) {
        try {
            Producto actualizado = productoService.actualizarDescripcion(id, request.getDescripcion());
            return ResponseEntity.ok(actualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/precio")
    public ResponseEntity<?> actualizarPrecio(@PathVariable Long id, @RequestBody ActualizarPrecio request) {
        try {
            Producto actualizado = productoService.actualizarPrecio(id, request.getPrecio());
            return ResponseEntity.ok(actualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
