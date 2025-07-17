package com.api.e_commerce.service;

import com.api.e_commerce.model.Marca;
import com.api.e_commerce.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> obtenerTodas() {
        return marcaRepository.findAll();
    }

    public Optional<Marca> obtenerPorId(Long id) {
        return marcaRepository.findById(id);
    }

    public Marca crearMarca(Marca marca) {
        if (marcaRepository.existsByNombre(marca.getNombre())) {
            throw new RuntimeException("La marca ya existe");
        }
        if (marca.getNombre() == null || marca.getNombre().isBlank()) {
            throw new RuntimeException("El nombre no puede estar vacío");
        }
        if (marca.getDescripcion() == null || marca.getDescripcion().isBlank()) {
            throw new RuntimeException("La descripción no puede estar vacía");
        }
        return marcaRepository.save(marca);
    }

    public void eliminarMarca(Long id) {
        if (!marcaRepository.existsById(id)) {
            throw new RuntimeException("Marca no encontrada");
        }
        marcaRepository.deleteById(id);
    }
}