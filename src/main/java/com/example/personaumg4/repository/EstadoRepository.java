package com.example.personaumg4.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.personaumg4.model.Estado;
@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long>{

}

