package com.mantenimiento.backend.service;

import com.mantenimiento.backend.model.Tecnico;
import com.mantenimiento.backend.repository.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio encargado de contener la lógica de negocio
 * relacionada con la entidad Tecnico.
 */
@Service
public class TecnicoService {

    /**
     * Inyección del repositorio de técnicos para acceder
     * a las operaciones de base de datos.
     */
    @Autowired
    private TecnicoRepository tecnicoRepository;

    /**
     * Obtiene la lista completa de técnicos registrados.
     *
     * @return lista de técnicos
     */
    public List<Tecnico> listarTecnicos() {
        return tecnicoRepository.findAll();
    }

    /**
     * Busca un técnico por su identificador.
     *
     * @param id identificador del técnico
     * @return un Optional con el técnico si existe
     */
    public Optional<Tecnico> obtenerTecnicoPorId(Long id) {
        return tecnicoRepository.findById(id);
    }

    /**
     * Guarda un nuevo técnico en la base de datos.
     *
     * @param tecnico objeto técnico a registrar
     * @return técnico guardado
     */
    public Tecnico guardarTecnico(Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    /**
     * Actualiza un técnico existente.
     *
     * @param id identificador del técnico a actualizar
     * @param tecnicoActualizado datos nuevos del técnico
     * @return técnico actualizado o null si no existe
     */
    public Tecnico actualizarTecnico(Long id, Tecnico tecnicoActualizado) {
        Tecnico tecnico = tecnicoRepository.findById(id).orElse(null);

        if (tecnico != null) {
            tecnico.setNombres(tecnicoActualizado.getNombres());
            tecnico.setApellidos(tecnicoActualizado.getApellidos());
            tecnico.setDocumento(tecnicoActualizado.getDocumento());
            tecnico.setEspecialidad(tecnicoActualizado.getEspecialidad());
            tecnico.setTelefono(tecnicoActualizado.getTelefono());
            tecnico.setCorreo(tecnicoActualizado.getCorreo());

            return tecnicoRepository.save(tecnico);
        }

        return null;
    }

    /**
     * Elimina un técnico por su identificador.
     *
     * @param id identificador del técnico a eliminar
     */
    public void eliminarTecnico(Long id) {
        tecnicoRepository.deleteById(id);
    }
}