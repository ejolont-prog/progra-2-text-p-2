package com.example.personaumg4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.personaumg4.model.Pais;
import com.example.personaumg4.repository.PaisRepository;

import java.util.List;

@Service
public class PaisService {


    @Autowired
    private PaisRepository paisRepository;


    public List<Pais> findAll() {
        return paisRepository.findAll();
    }


}

