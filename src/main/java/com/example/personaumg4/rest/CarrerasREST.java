package com.example.personaumg4.rest;

import com.example.personaumg4.model.Carreras;
import com.example.personaumg4.service.CarrerasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carreras")
@CrossOrigin(origins = "*")
public class CarrerasREST {

    @Autowired
    private CarrerasService carrerasService;

    @GetMapping
    public ResponseEntity<List<Carreras>> getAllCarreras(){
        return ResponseEntity.ok(carrerasService.findAll());
    }

}