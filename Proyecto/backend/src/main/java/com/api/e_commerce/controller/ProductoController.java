package com.api.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.api.e_commerce.model.Producto;
import com.api.e_commerce.repository.ProductoRepository;
import com.api.e_commerce.service.ProductoService;

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
}
