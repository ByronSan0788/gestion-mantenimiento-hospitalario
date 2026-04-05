package com.mantenimiento.backend.repository;

import com.mantenimiento.backend.model.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad Tecnico.
 *
 * Esta interfaz permite realizar operaciones de persistencia
 * sobre la tabla de técnicos en la base de datos.
 */
@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {

}