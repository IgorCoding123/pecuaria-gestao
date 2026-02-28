package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.Transacao;
import com.pecuaria.gestao.model.Usuario;
import com.pecuaria.gestao.repository.UsuarioRepository;
import com.pecuaria.gestao.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Transacao> getAll(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return service.findByUsuarioId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> getById(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Transacao create(@RequestBody Transacao transacao, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
        transacao.setUsuario(usuario);
        return service.save(transacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> update(@PathVariable Long id, @RequestBody Transacao transacao) {
        try {
            return ResponseEntity.ok(service.update(id, transacao));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
