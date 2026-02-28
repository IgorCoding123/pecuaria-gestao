package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.Animal;
import com.pecuaria.gestao.model.Producao;
import com.pecuaria.gestao.model.Transacao;
import com.pecuaria.gestao.model.RegistroSaude;
import com.pecuaria.gestao.repository.AnimalRepository;
import com.pecuaria.gestao.repository.ProducaoRepository;
import com.pecuaria.gestao.repository.TransacaoRepository;
import com.pecuaria.gestao.repository.RegistroSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

        @Autowired
        private AnimalRepository animalRepository;
        @Autowired
        private ProducaoRepository producaoRepository;
        @Autowired
        private TransacaoRepository transacaoRepository;
        @Autowired
        private RegistroSaudeRepository saudeRepository;

        @GetMapping("/resumo")
        public Map<String, Object> getResumoGeral(Authentication auth) {
                Long userId = (Long) auth.getPrincipal();
                Map<String, Object> resumo = new HashMap<>();

                List<Animal> animais = animalRepository.findByUsuarioId(userId);
                resumo.put("totalAnimais", animais.size());
                resumo.put("animaisPorTipo", animais.stream()
                                .collect(Collectors.groupingBy(Animal::getTipo, Collectors.counting())));
                resumo.put("animaisPorFinalidade", animais.stream()
                                .collect(Collectors.groupingBy(Animal::getFinalidade, Collectors.counting())));
                resumo.put("totalQuantidadeAnimais", animais.stream()
                                .mapToInt(Animal::getQuantidade).sum());

                List<Producao> producoes = producaoRepository.findByUsuarioIdOrderByDataDesc(userId);
                resumo.put("totalProducoes", producoes.size());
                resumo.put("producaoPorTipo", producoes.stream()
                                .collect(Collectors.groupingBy(Producao::getTipo,
                                                Collectors.summingDouble(Producao::getQuantidade))));

                List<Transacao> transacoes = transacaoRepository.findByUsuarioIdOrderByDataDesc(userId);
                double totalReceitas = transacoes.stream()
                                .filter(t -> "RECEITA".equals(t.getTipo()))
                                .mapToDouble(Transacao::getValor).sum();
                double totalDespesas = transacoes.stream()
                                .filter(t -> "DESPESA".equals(t.getTipo()))
                                .mapToDouble(Transacao::getValor).sum();
                resumo.put("totalReceitas", totalReceitas);
                resumo.put("totalDespesas", totalDespesas);
                resumo.put("saldo", totalReceitas - totalDespesas);
                resumo.put("despesasPorCategoria", transacoes.stream()
                                .filter(t -> "DESPESA".equals(t.getTipo()))
                                .collect(Collectors.groupingBy(Transacao::getCategoria,
                                                Collectors.summingDouble(Transacao::getValor))));
                resumo.put("receitasPorCategoria", transacoes.stream()
                                .filter(t -> "RECEITA".equals(t.getTipo()))
                                .collect(Collectors.groupingBy(Transacao::getCategoria,
                                                Collectors.summingDouble(Transacao::getValor))));

                List<RegistroSaude> registrosSaude = saudeRepository.findByUsuarioIdOrderByDataAplicacaoDesc(userId);
                resumo.put("totalRegistrosSaude", registrosSaude.size());
                resumo.put("saudePorTipo", registrosSaude.stream()
                                .collect(Collectors.groupingBy(RegistroSaude::getTipo, Collectors.counting())));

                resumo.put("animais", animais);
                resumo.put("producoes", producoes);
                resumo.put("transacoes", transacoes);
                resumo.put("registrosSaude", registrosSaude);

                return resumo;
        }
}
