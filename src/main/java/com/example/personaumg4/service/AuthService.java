package com.example.personaumg4.service;

import com.example.personaumg4.model.Usuario;
import com.example.personaumg4.repository.UsuarioRepository;
import com.example.personaumg4.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Cambia esto en AuthService.java
    public String login(String username, String password) {
        Usuario user = usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // USAR ESTO SOLO SI TU DB TIENE LA CONTRASEÑA SIN ENCRIPTAR
        if (password.equals(user.getContrasena())) {
            return jwtUtil.generateToken(username);
        } else {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}