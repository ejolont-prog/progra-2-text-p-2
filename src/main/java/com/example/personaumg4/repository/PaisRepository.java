package com.example.personaumg4.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.personaumg4.model.Pais;

@Repository
public interface PaisRepository extends JpaRepository<Pais, Long>{

}
