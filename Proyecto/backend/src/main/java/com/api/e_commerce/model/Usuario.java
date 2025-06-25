package com.api.e_commerce.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "usuarios")  
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    @Column(unique = true)
    private String email;
    private String usuario;
    private String password;
    private String telefono;
    @Enumerated(EnumType.STRING)
    private Role role; // Enum para definir roles de usuario
    
    @OneToMany(mappedBy = "usuario",cascade= CascadeType.ALL)
    List<Pedido> pedidos; // Relación con la entidad Pedido

    @OneToMany(mappedBy = "usuario",cascade= CascadeType.ALL)
    List<Producto> productos; // Relación con la entidad Producto, un usuario tiene varios productos a su nombre

    // Constructor, getters y setters pueden ser generados por Lombok
    // o puedes definirlos manualmente si lo prefieres.

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Example implementation, adjust as needed
        return List.of(new SimpleGrantedAuthority("ROLE_" + (role != null ? role.name() : "USER")));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Adjust logic as needed
    }
}
