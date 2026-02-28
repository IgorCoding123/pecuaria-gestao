package com.pecuaria.gestao.service;

import com.pecuaria.gestao.model.Animal;
import com.pecuaria.gestao.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public List<Animal> findAll() {
        return repository.findAll();
    }

    public List<Animal> findByUsuarioId(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Optional<Animal> findById(Long id) {
        return repository.findById(id);
    }

    public Animal save(Animal animal) {
        return repository.save(animal);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Animal update(Long id, Animal details) {
        return repository.findById(id).map(a -> {
            a.setNome(details.getNome());
            a.setTipo(details.getTipo());
            a.setIdade(details.getIdade());
            a.setFinalidade(details.getFinalidade());
            a.setQuantidade(details.getQuantidade());
            a.setObservacao(details.getObservacao());
            return repository.save(a);
        }).orElseThrow(() -> new RuntimeException("Animal não encontrado"));
    }
}
