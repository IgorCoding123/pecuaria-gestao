package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.Producao;
import com.pecuaria.gestao.model.Usuario;
import com.pecuaria.gestao.repository.UsuarioRepository;
import com.pecuaria.gestao.service.ProducaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/producoes")
public class ProducaoController {

    @Autowired
    private ProducaoService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Producao> getAll(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return service.findByUsuarioId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producao> getById(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Producao create(@RequestBody Producao producao, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
        producao.setUsuario(usuario);
        return service.save(producao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producao> update(@PathVariable Long id, @RequestBody Producao producao) {
        try {
            return ResponseEntity.ok(service.update(id, producao));
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
