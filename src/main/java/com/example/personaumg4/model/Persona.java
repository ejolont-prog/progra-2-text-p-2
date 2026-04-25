package com.example.personaumg4.model;

import com.example.personaumg4.rest.CarrerasREST;
import jakarta.persistence.*;
import lombok.Data;


import java.io.Serializable;

@Entity
@Data
@Table(name = "persona")
public class Persona implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private Integer edad;
    private String cui;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_pais", referencedColumnName = "id_pais")
    private Pais pais;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado", referencedColumnName = "id")
    private Estado estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_carrera", referencedColumnName = "id")
    private Carreras carreras;

    @Column(name = "estado_p")
    private String estadoP;
}