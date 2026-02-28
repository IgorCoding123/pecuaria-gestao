package com.pecuaria.gestao.repository;

import com.pecuaria.gestao.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByUsuarioId(Long usuarioId);
}
