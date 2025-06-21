package com.api.e_commerce.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity(name = "productos")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;  
    private double precio; 
    private String descripcion;
    private int stock;
    private String imagen;
    private String brand;
    private String line;
    private String model;
    
    // Campos adicionales para compatibilidad con el frontend
    private String categoria;
    private String marca;
    private String talle;
    private String estado;
    
    @JsonIgnoreProperties({"productos"})
    @ManyToMany(fetch= FetchType.LAZY)
    @JoinTable(
        name = "productos_categorias",
        joinColumns = @JoinColumn(name = "producto_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Categoria> categorias = new ArrayList<>(); // Relación con la entidad Categoria
}