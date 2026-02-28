package com.pecuaria.gestao.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "registros_saude")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroSaude implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipo; // Vacina, Medicamento, Vermífugo, Consulta Veterinária

    @Column(nullable = false)
    private String descricao; // Nome da vacina/medicamento

    @Column(nullable = false)
    private LocalDate dataAplicacao;

    private LocalDate proximaDose; // Data do próximo reforço/dose

    private String veterinario;

    private String observacao;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
