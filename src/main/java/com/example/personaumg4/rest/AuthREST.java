package com.example.personaumg4.rest;

import com.example.personaumg4.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthREST {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credenciales) {
        String token = authService.login(credenciales.get("usuario"), credenciales.get("contrasena"));
        return Map.of("token", token);
    }
}