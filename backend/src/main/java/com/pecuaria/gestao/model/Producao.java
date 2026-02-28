package com.pecuaria.gestao.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "producoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipo; // Leite, Ovos, Carne, Lã, etc.

    @Column(nullable = false)
    private Double quantidade;

    @Column(nullable = false)
    private String unidadeMedida; // Litros, Kg, Unidades

    @Column(nullable = false)
    private LocalDate data;

    private String observacao;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal; // Opcional: associar a um animal específico (ex: vaca leiteira)

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
