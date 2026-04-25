package com.example.personaumg4.service;

import com.example.personaumg4.model.Carreras;
import com.example.personaumg4.repository.CarrerasRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrerasService {

    @Autowired
    private CarrerasRepository carrerasRepository;

    public List<Carreras> findAll() {
        return carrerasRepository.findAll();
    }

}