package com.mantenimiento.backend.repository;

import com.mantenimiento.backend.model.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad Equipo.
 * 
 * Esta interfaz permite realizar operaciones sobre la tabla de equipos
 * en la base de datos, como guardar, consultar, actualizar y eliminar registros.
 * 
 * Al extender JpaRepository, Spring Data JPA genera automáticamente
 * los métodos básicos de persistencia sin necesidad de escribir SQL manual.
 */
@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {

}