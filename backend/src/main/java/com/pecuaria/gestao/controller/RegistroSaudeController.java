package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.RegistroSaude;
import com.pecuaria.gestao.model.Usuario;
import com.pecuaria.gestao.repository.UsuarioRepository;
import com.pecuaria.gestao.service.RegistroSaudeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saude")
public class RegistroSaudeController {

    @Autowired
    private RegistroSaudeService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<RegistroSaude> getAll(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return service.findByUsuarioId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroSaude> getById(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RegistroSaude create(@RequestBody RegistroSaude registro, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
        registro.setUsuario(usuario);
        return service.save(registro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroSaude> update(@PathVariable Long id, @RequestBody RegistroSaude registro) {
        try {
            return ResponseEntity.ok(service.update(id, registro));
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
