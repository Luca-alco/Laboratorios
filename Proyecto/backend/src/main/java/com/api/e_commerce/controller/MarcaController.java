package com.api.e_commerce.controller;

import com.api.e_commerce.model.Marca;
import com.api.e_commerce.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = "http://localhost:5173")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public List<Marca> getAllMarcas() {
        System.out.println("Controller: Obteniendo todas las marcas");
        List<Marca> marcas = marcaService.obtenerTodas();
        System.out.println("Controller: Se encontraron " + marcas.size() + " marcas");
        return marcas;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marca> getMarcaById(@PathVariable Long id) {
        try {
            System.out.println("\n------------------------------------");
            System.out.println("Controller: Recibida solicitud para marca ID: " + id);
            Marca marca = marcaService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
            System.out.println("Controller: Marca encontrada y enviando respuesta");
            System.out.println("------------------------------------\n");
            return ResponseEntity.ok(marca);
        } catch (RuntimeException e) { //si no encuentra la marca
            System.out.println("Controller: Error -> " + e.getMessage());
            System.out.println("------------------------------------\n");
            return ResponseEntity.notFound().build();
        }
    }
    //http://localhost:8080/api/marcas
    @PostMapping
    public ResponseEntity<Marca> crearMarca(@RequestBody Marca marca) {
        try {
            Marca nueva = marcaService.crearMarca(marca);
            return ResponseEntity.ok(nueva);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMarca(@PathVariable Long id) {
        System.out.println("DELETE request received for marca id: " + id);
        try {
            marcaService.eliminarMarca(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error deleting marca: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> actualizarMarca(@PathVariable Long id, @RequestBody Marca marcaRequest) {
        Marca marca = marcaService.obtenerPorId(id)
            .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        marca.setNombre(marcaRequest.getNombre());
        marca.setDescripcion(marcaRequest.getDescripcion());
        Marca actualizada = marcaService.crearMarca(marca);
        return ResponseEntity.ok(actualizada);
    }
}