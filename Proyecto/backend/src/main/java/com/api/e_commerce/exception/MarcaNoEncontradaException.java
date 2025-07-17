package com.api.e_commerce.exception;

public class MarcaNoEncontradaException extends RuntimeException {
    public MarcaNoEncontradaException(String mensaje) {
        super(mensaje);
    }
}
