package com.mantenimiento.backend.service;

import com.mantenimiento.backend.model.OrdenTrabajo;
import com.mantenimiento.backend.repository.OrdenTrabajoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio encargado de contener la lógica de negocio
 * relacionada con la entidad OrdenTrabajo.
 */
@Service
public class OrdenTrabajoService {

    /**
     * Inyección del repositorio de órdenes de trabajo para acceder
     * a las operaciones de base de datos.
     */
    @Autowired
    private OrdenTrabajoRepository ordenTrabajoRepository;

    /**
     * Obtiene la lista completa de órdenes de trabajo registradas.
     *
     * @return lista de órdenes de trabajo
     */
    public List<OrdenTrabajo> listarOrdenesTrabajo() {
        return ordenTrabajoRepository.findAll();
    }

    /**
     * Busca una orden de trabajo por su identificador.
     *
     * @param id identificador de la orden
     * @return un Optional con la orden si existe
     */
    public Optional<OrdenTrabajo> obtenerOrdenTrabajoPorId(Long id) {
        return ordenTrabajoRepository.findById(id);
    }

    /**
     * Guarda una nueva orden de trabajo en la base de datos.
     *
     * @param ordenTrabajo objeto orden de trabajo a registrar
     * @return orden de trabajo guardada
     */
    public OrdenTrabajo guardarOrdenTrabajo(OrdenTrabajo ordenTrabajo) {
        return ordenTrabajoRepository.save(ordenTrabajo);
    }

    /**
     * Actualiza una orden de trabajo existente.
     *
     * @param id identificador de la orden a actualizar
     * @param ordenActualizada datos nuevos de la orden
     * @return orden actualizada o null si no existe
     */
    public OrdenTrabajo actualizarOrdenTrabajo(Long id, OrdenTrabajo ordenActualizada) {
        OrdenTrabajo ordenTrabajo = ordenTrabajoRepository.findById(id).orElse(null);

        if (ordenTrabajo != null) {
            ordenTrabajo.setFechaSolicitud(ordenActualizada.getFechaSolicitud());
            ordenTrabajo.setTipoMantenimiento(ordenActualizada.getTipoMantenimiento());
            ordenTrabajo.setDescripcionFalla(ordenActualizada.getDescripcionFalla());
            ordenTrabajo.setPrioridad(ordenActualizada.getPrioridad());
            ordenTrabajo.setEstado(ordenActualizada.getEstado());
            ordenTrabajo.setEquipo(ordenActualizada.getEquipo());
            ordenTrabajo.setTecnico(ordenActualizada.getTecnico());

            return ordenTrabajoRepository.save(ordenTrabajo);
        }

        return null;
    }

    /**
     * Elimina una orden de trabajo por su identificador.
     *
     * @param id identificador de la orden a eliminar
     */
    public void eliminarOrdenTrabajo(Long id) {
        ordenTrabajoRepository.deleteById(id);
    }
}