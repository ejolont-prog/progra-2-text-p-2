package com.example.personaumg4.service;

import com.example.personaumg4.model.Usuario;
import com.example.personaumg4.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validarLogin(String username, String password) {
        return usuarioRepository.findByUsuario(username)
                .map(u -> u.getContrasena().equals(password)) // En producción usa un encoder
                .orElse(false);
    }
}