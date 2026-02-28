package com.pecuaria.gestao.repository;

import com.pecuaria.gestao.model.RegistroSaude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroSaudeRepository extends JpaRepository<RegistroSaude, Long> {
    List<RegistroSaude> findByUsuarioIdOrderByDataAplicacaoDesc(Long usuarioId);
}
