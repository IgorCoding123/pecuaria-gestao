package com.pecuaria.gestao.service;

import com.pecuaria.gestao.model.Producao;
import com.pecuaria.gestao.repository.ProducaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProducaoService {

    @Autowired
    private ProducaoRepository repository;

    public List<Producao> findAll() {
        return repository.findAll();
    }

    public List<Producao> findByUsuarioId(Long usuarioId) {
        return repository.findByUsuarioIdOrderByDataDesc(usuarioId);
    }

    public Optional<Producao> findById(Long id) {
        return repository.findById(id);
    }

    public Producao save(Producao producao) {
        return repository.save(producao);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Producao update(Long id, Producao details) {
        return repository.findById(id).map(p -> {
            p.setTipo(details.getTipo());
            p.setQuantidade(details.getQuantidade());
            p.setUnidadeMedida(details.getUnidadeMedida());
            p.setData(details.getData());
            p.setObservacao(details.getObservacao());
            p.setAnimal(details.getAnimal());
            return repository.save(p);
        }).orElseThrow(() -> new RuntimeException("Produção não encontrada"));
    }
}
