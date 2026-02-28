package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.Animal;
import com.pecuaria.gestao.model.Usuario;
import com.pecuaria.gestao.repository.UsuarioRepository;
import com.pecuaria.gestao.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    @Autowired
    private AnimalService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Animal> getAll(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return service.findByUsuarioId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Animal create(@RequestBody Animal animal, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
        animal.setUsuario(usuario);
        return service.save(animal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> update(@PathVariable Long id, @RequestBody Animal animal) {
        try {
            return ResponseEntity.ok(service.update(id, animal));
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
