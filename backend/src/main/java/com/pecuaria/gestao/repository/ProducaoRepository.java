package com.pecuaria.gestao.repository;

import com.pecuaria.gestao.model.Producao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProducaoRepository extends JpaRepository<Producao, Long> {
    List<Producao> findByUsuarioIdOrderByDataDesc(Long usuarioId);
}
