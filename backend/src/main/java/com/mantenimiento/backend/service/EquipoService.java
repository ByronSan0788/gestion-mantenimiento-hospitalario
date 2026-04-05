package com.mantenimiento.backend.service;

import com.mantenimiento.backend.model.Equipo;
import com.mantenimiento.backend.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio encargado de contener la lógica de negocio
 * relacionada con la entidad Equipo.
 */
@Service
public class EquipoService {

    /**
     * Inyección del repositorio de equipos para acceder
     * a las operaciones de base de datos.
     */
    @Autowired
    private EquipoRepository equipoRepository;

    /**
     * Obtiene la lista completa de equipos registrados.
     *
     * @return lista de equipos
     */
    public List<Equipo> listarEquipos() {
        return equipoRepository.findAll();
    }

    /**
     * Busca un equipo por su identificador.
     *
     * @param id identificador del equipo
     * @return un Optional con el equipo si existe
     */
    public Optional<Equipo> obtenerEquipoPorId(Long id) {
        return equipoRepository.findById(id);
    }

    /**
     * Guarda un nuevo equipo en la base de datos.
     *
     * @param equipo objeto equipo a registrar
     * @return equipo guardado
     */
    public Equipo guardarEquipo(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    /**
     * Actualiza un equipo existente.
     *
     * @param id identificador del equipo a actualizar
     * @param equipoActualizado datos nuevos del equipo
     * @return equipo actualizado
     */
    public Equipo actualizarEquipo(Long id, Equipo equipoActualizado) {
        Equipo equipo = equipoRepository.findById(id).orElse(null);

        if (equipo != null) {
            equipo.setNombre(equipoActualizado.getNombre());
            equipo.setCodigo(equipoActualizado.getCodigo());
            equipo.setMarca(equipoActualizado.getMarca());
            equipo.setModelo(equipoActualizado.getModelo());
            equipo.setSerie(equipoActualizado.getSerie());
            equipo.setArea(equipoActualizado.getArea());
            equipo.setEstado(equipoActualizado.getEstado());

            return equipoRepository.save(equipo);
        }

        return null;
    }

    /**
     * Elimina un equipo por su identificador.
     *
     * @param id identificador del equipo a eliminar
     */
    public void eliminarEquipo(Long id) {
        equipoRepository.deleteById(id);
    }
}