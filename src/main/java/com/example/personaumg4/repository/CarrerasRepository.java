package com.example.personaumg4.repository;

import com.example.personaumg4.model.Carreras;
import com.example.personaumg4.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrerasRepository extends JpaRepository<Carreras, Long>{

}

