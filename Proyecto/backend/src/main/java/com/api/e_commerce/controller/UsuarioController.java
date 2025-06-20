package com.api.e_commerce.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.AuthResponse;
import com.api.e_commerce.dto.LoginRequest;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.security.JwtUtil;
import com.api.e_commerce.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    //private final UsuarioService usuarioService;
    private final List<Usuario> usuarios = new ArrayList<>();
    private Long idCounter = 1L;
    

    @Autowired
    private JwtUtil jwtUtil;

    // @Autowired
    // public UsuarioController(UsuarioService usuarioService, JwtUtil jwtUtil) {
    //     this.usuarioService = usuarioService;
    //     this.jwtUtil = jwtUtil;
    //}
    

    // Public endpoint (no requiere autenticación)
    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("This is a public endpoint.");
    }

    // Login endpoint (devuelve un JWT real)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginUser) {
        for (Usuario usuario : usuarios) {
            if (usuario.getUsuario().equals(loginUser.getUsuario()) && usuario.getPassword().equals(loginUser.getPassword())) {
                String token = jwtUtil.generateToken(usuario.getUsuario(), usuario.getRole());

                return ResponseEntity.ok().body(java.util.Map.of(
                        "token", token,
                        "roles", usuario.getRole()
                ));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        usuario.setId(idCounter++);
        usuarios.add(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    // User endpoint (requiere USER o ADMIN role)
    @GetMapping("/usuario")
    public ResponseEntity<String> userEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER") || a.getAuthority().equals("ADMIN"))) {
            return ResponseEntity.ok("Hello USER or ADMIN!");
        }
       
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires USER or ADMIN role");
    }

    // Admin endpoint (requiere ADMIN role)
    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            return ResponseEntity.ok("Hello ADMIN!");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires ADMIN role");
    }


    // Create user (POST)
    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario) {
        usuario.setId(idCounter++);
        usuarios.add(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    // Update user (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable Long id, @RequestBody Usuario updatedUser) {
        for (Usuario usuario : usuarios) {
            if (usuario.getId().equals(id)) {
                usuario.setUsuario(updatedUser.getUsuario());
                usuario.setPassword(updatedUser.getPassword());
                usuario.setRole(updatedUser.getRole());
                return ResponseEntity.ok(usuario);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete user (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean removed = usuarios.removeIf(user -> user.getId().equals(id));
        if (removed) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}