package com.mantenimiento.backend.service;

import com.mantenimiento.backend.model.Usuario;
import com.mantenimiento.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio encargado de la lógica de negocio del módulo de usuarios.
 */
@Service
public class UsuarioService {

    /**
     * Inyección del repositorio de usuarios.
     */
    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Codificador BCrypt para cifrar contraseñas antes de guardarlas.
     */
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Obtiene la lista completa de usuarios registrados.
     *
     * @return lista de usuarios
     */
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    /**
     * Busca un usuario por su identificador.
     *
     * @param id identificador del usuario
     * @return un Optional con el usuario si existe
     */
    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    /**
     * Registra un nuevo usuario.
     * Antes de guardar, valida que el correo no exista y cifra la contraseña.
     *
     * @param usuario datos del usuario a registrar
     * @return usuario guardado
     */
    public Usuario registrarUsuario(Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("Ya existe un usuario registrado con ese correo");
        }

        // Cifrar la contraseña antes de guardarla en la base de datos
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        return usuarioRepository.save(usuario);
    }
}
