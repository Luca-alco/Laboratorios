package com.api.e_commerce.dto;

public class ActualizarMarca {
    private String nombre;
    private String descripcion;

    public ActualizarMarca() {}

    public ActualizarMarca(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
