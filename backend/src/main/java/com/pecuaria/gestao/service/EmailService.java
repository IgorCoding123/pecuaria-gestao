package com.pecuaria.gestao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void enviarCodigoVerificacao(String destino, String nome, String codigo) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(destino);
        msg.setSubject("Gestão Rural - Código de Verificação");
        msg.setText(
                "Olá " + nome + ",\n\n" +
                        "Bem-vindo ao Sistema de Gestão Rural!\n\n" +
                        "Seu código de verificação é: " + codigo + "\n\n" +
                        "Digite este código no sistema para ativar sua conta.\n\n" +
                        "Se você não solicitou este cadastro, ignore este email.\n\n" +
                        "Atenciosamente,\nEquipe Gestão Rural");

        try {
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
        }
    }
}
