package com.pecuaria.gestao.service;

import com.pecuaria.gestao.model.Transacao;
import com.pecuaria.gestao.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository repository;

    public List<Transacao> findAll() {
        return repository.findAll();
    }

    public List<Transacao> findByUsuarioId(Long usuarioId) {
        return repository.findByUsuarioIdOrderByDataDesc(usuarioId);
    }

    public Optional<Transacao> findById(Long id) {
        return repository.findById(id);
    }

    public Transacao save(Transacao transacao) {
        return repository.save(transacao);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Transacao update(Long id, Transacao details) {
        return repository.findById(id).map(t -> {
            t.setDescricao(details.getDescricao());
            t.setValor(details.getValor());
            t.setTipo(details.getTipo());
            t.setCategoria(details.getCategoria());
            t.setData(details.getData());
            t.setObservacao(details.getObservacao());
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Transação não encontrada"));
    }
}
