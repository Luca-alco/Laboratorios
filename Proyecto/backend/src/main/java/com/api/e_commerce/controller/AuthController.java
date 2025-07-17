package com.api.e_commerce.controller;

import com.api.e_commerce.security.JwtUtil;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElse(null);

        if (usuario == null || !passwordEncoder.matches(password, usuario.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRole());
        System.out.println("TOKEN JWT: " + token);
        return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
    }
}
