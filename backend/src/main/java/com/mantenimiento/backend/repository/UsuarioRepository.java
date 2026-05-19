package com.mantenimiento.backend.repository;

import com.mantenimiento.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio para la entidad Usuario.
 * Permite realizar operaciones de persistencia sobre la tabla de usuarios.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su correo electrónico.
     *
     * @param correo correo del usuario
     * @return usuario encontrado si existe
     */
    Optional<Usuario> findByCorreo(String correo);
}