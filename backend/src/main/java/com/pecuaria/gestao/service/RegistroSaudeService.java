package com.pecuaria.gestao.service;

import com.pecuaria.gestao.model.RegistroSaude;
import com.pecuaria.gestao.repository.RegistroSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroSaudeService {

    @Autowired
    private RegistroSaudeRepository repository;

    public List<RegistroSaude> findAll() {
        return repository.findAll();
    }

    public List<RegistroSaude> findByUsuarioId(Long usuarioId) {
        return repository.findByUsuarioIdOrderByDataAplicacaoDesc(usuarioId);
    }

    public Optional<RegistroSaude> findById(Long id) {
        return repository.findById(id);
    }

    public RegistroSaude save(RegistroSaude registro) {
        return repository.save(registro);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public RegistroSaude update(Long id, RegistroSaude details) {
        return repository.findById(id).map(r -> {
            r.setTipo(details.getTipo());
            r.setDescricao(details.getDescricao());
            r.setDataAplicacao(details.getDataAplicacao());
            r.setProximaDose(details.getProximaDose());
            r.setVeterinario(details.getVeterinario());
            r.setObservacao(details.getObservacao());
            r.setAnimal(details.getAnimal());
            return repository.save(r);
        }).orElseThrow(() -> new RuntimeException("Registro de saúde não encontrado"));
    }
}
