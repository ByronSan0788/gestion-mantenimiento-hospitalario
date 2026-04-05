package com.mantenimiento.backend.repository;

import com.mantenimiento.backend.model.OrdenTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad OrdenTrabajo.
 *
 * Esta interfaz permite realizar operaciones de persistencia
 * sobre la tabla de órdenes de trabajo en la base de datos.
 */
@Repository
public interface OrdenTrabajoRepository extends JpaRepository<OrdenTrabajo, Long> {

}