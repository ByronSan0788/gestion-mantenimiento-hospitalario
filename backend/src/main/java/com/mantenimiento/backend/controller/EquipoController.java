package com.mantenimiento.backend.controller;

import com.mantenimiento.backend.model.Equipo;
import com.mantenimiento.backend.service.EquipoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar las operaciones relacionadas con la entidad Equipo.
 *
 * Esta clase expone los endpoints de la API para listar, consultar, crear,
 * actualizar y eliminar equipos del sistema.
 */
@RestController
@RequestMapping("/api/equipos")
@CrossOrigin(origins = "*")
public class EquipoController {

    /**
     * Inyección del servicio de equipos, donde se encuentra
     * la lógica de negocio del módulo.
     */
    @Autowired
    private EquipoService equipoService;

    /**
     * Endpoint para listar todos los equipos registrados.
     *
     * Método HTTP: GET
     * URL: /api/equipos
     *
     * @return lista de equipos
     */
    @GetMapping
    public List<Equipo> listarEquipos() {
        return equipoService.listarEquipos();
    }

    /**
     * Endpoint para consultar un equipo por su identificador.
     *
     * Método HTTP: GET
     * URL: /api/equipos/{id}
     *
     * @param id identificador del equipo
     * @return respuesta con el equipo encontrado o estado 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Equipo> obtenerEquipoPorId(@PathVariable Long id) {
        Optional<Equipo> equipo = equipoService.obtenerEquipoPorId(id);

        return equipo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Endpoint para registrar un nuevo equipo.
     *
     * Método HTTP: POST
     * URL: /api/equipos
     *
     * La anotación @Valid obliga a validar el objeto recibido
     * con las reglas definidas en la entidad Equipo.
     *
     * @param equipo objeto recibido en el cuerpo de la solicitud
     * @return equipo guardado
     */
    @PostMapping
    public Equipo guardarEquipo(@Valid @RequestBody Equipo equipo) {
        return equipoService.guardarEquipo(equipo);
    }

    /**
     * Endpoint para actualizar un equipo existente.
     *
     * Método HTTP: PUT
     * URL: /api/equipos/{id}
     *
     * La anotación @Valid obliga a validar el objeto recibido
     * con las reglas definidas en la entidad Equipo.
     *
     * @param id identificador del equipo a actualizar
     * @param equipoActualizado datos actualizados del equipo
     * @return respuesta con el equipo actualizado o estado 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Equipo> actualizarEquipo(@PathVariable Long id, @Valid @RequestBody Equipo equipoActualizado) {
        Equipo equipo = equipoService.actualizarEquipo(id, equipoActualizado);

        if (equipo != null) {
            return ResponseEntity.ok(equipo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint para eliminar un equipo por su identificador.
     *
     * Método HTTP: DELETE
     * URL: /api/equipos/{id}
     *
     * @param id identificador del equipo a eliminar
     * @return respuesta sin contenido si se elimina correctamente
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEquipo(@PathVariable Long id) {
        equipoService.eliminarEquipo(id);
        return ResponseEntity.noContent().build();
    }
}