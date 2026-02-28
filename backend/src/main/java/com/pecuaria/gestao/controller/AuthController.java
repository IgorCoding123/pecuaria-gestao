package com.pecuaria.gestao.controller;

import com.pecuaria.gestao.model.Usuario;
import com.pecuaria.gestao.repository.UsuarioRepository;
import com.pecuaria.gestao.security.JwtUtil;
import com.pecuaria.gestao.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:4201" })
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Map<String, String> body) {
        String nome = body.get("nome");
        String email = body.get("email");
        String senha = body.get("senha");
        String nomeFazenda = body.get("nomeFazenda");

        if (nome == null || email == null || senha == null) {
            return ResponseEntity.badRequest().body(errorMap("Nome, email e senha são obrigatórios."));
        }

        if (usuarioRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(errorMap("Este email já está cadastrado."));
        }

        if (senha.length() < 6) {
            return ResponseEntity.badRequest().body(errorMap("A senha deve ter pelo menos 6 caracteres."));
        }

        // Gerar código de 6 dígitos
        String codigo = String.format("%06d", new Random().nextInt(999999));

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha));
        usuario.setNomeFazenda(nomeFazenda != null ? nomeFazenda : "");
        usuario.setVerificado(false);
        usuario.setCodigoVerificacao(codigo);
        usuarioRepository.save(usuario);

        // Enviar email com código
        emailService.enviarCodigoVerificacao(email, nome, codigo);

        Map<String, Object> response = new HashMap<>();
        response.put("mensagem", "Cadastro realizado! Verifique seu email para ativar a conta.");
        response.put("email", email);
        response.put("requerVerificacao", true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verificar")
    public ResponseEntity<?> verificar(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String codigo = body.get("codigo");

        if (email == null || codigo == null) {
            return ResponseEntity.badRequest().body(errorMap("Email e código são obrigatórios."));
        }

        return usuarioRepository.findByEmail(email)
                .map(usuario -> {
                    if (usuario.getVerificado()) {
                        return ResponseEntity.badRequest().body((Object) errorMap("Esta conta já está verificada."));
                    }
                    if (codigo.equals(usuario.getCodigoVerificacao())) {
                        usuario.setVerificado(true);
                        usuario.setCodigoVerificacao(null);
                        usuarioRepository.save(usuario);

                        String token = jwtUtil.generateToken(email, usuario.getId(), usuario.getNome());

                        Map<String, Object> response = new HashMap<>();
                        response.put("token", token);
                        response.put("nome", usuario.getNome());
                        response.put("email", email);
                        response.put("id", usuario.getId());
                        response.put("mensagem", "Email verificado com sucesso!");

                        return ResponseEntity.ok((Object) response);
                    }
                    return ResponseEntity.badRequest().body((Object) errorMap("Código incorreto."));
                })
                .orElse(ResponseEntity.status(404).body((Object) errorMap("Usuário não encontrado.")));
    }

    @PostMapping("/reenviar-codigo")
    public ResponseEntity<?> reenviarCodigo(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        return usuarioRepository.findByEmail(email)
                .map(usuario -> {
                    String novoCodigo = String.format("%06d", new Random().nextInt(999999));
                    usuario.setCodigoVerificacao(novoCodigo);
                    usuarioRepository.save(usuario);

                    emailService.enviarCodigoVerificacao(email, usuario.getNome(), novoCodigo);

                    Map<String, String> response = new HashMap<>();
                    response.put("mensagem", "Novo código enviado para " + email);
                    return ResponseEntity.ok((Object) response);
                })
                .orElse(ResponseEntity.status(404).body((Object) errorMap("Email não encontrado.")));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.badRequest().body(errorMap("Email e senha são obrigatórios."));
        }

        return usuarioRepository.findByEmail(email)
                .map(usuario -> {
                    if (!passwordEncoder.matches(senha, usuario.getSenha())) {
                        return ResponseEntity.status(401).body((Object) errorMap("Senha incorreta."));
                    }
                    if (!usuario.getVerificado()) {
                        Map<String, Object> resp = new HashMap<>();
                        resp.put("erro", "Email ainda não verificado. Verifique sua caixa de entrada.");
                        resp.put("requerVerificacao", true);
                        resp.put("email", email);
                        return ResponseEntity.status(403).body((Object) resp);
                    }

                    String token = jwtUtil.generateToken(email, usuario.getId(), usuario.getNome());

                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("nome", usuario.getNome());
                    response.put("email", email);
                    response.put("id", usuario.getId());
                    response.put("nomeFazenda", usuario.getNomeFazenda());

                    return ResponseEntity.ok((Object) response);
                })
                .orElse(ResponseEntity.status(404).body((Object) errorMap("Usuário não encontrado.")));
    }

    private Map<String, String> errorMap(String msg) {
        Map<String, String> m = new HashMap<>();
        m.put("erro", msg);
        return m;
    }
}
