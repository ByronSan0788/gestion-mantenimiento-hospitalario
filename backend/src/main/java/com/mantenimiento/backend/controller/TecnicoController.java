package com.mantenimiento.backend.controller;

import com.mantenimiento.backend.model.Tecnico;
import com.mantenimiento.backend.service.TecnicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar las operaciones relacionadas con la entidad Tecnico.
 *
 * Esta clase expone los endpoints de la API para listar, consultar, crear,
 * actualizar y eliminar técnicos del sistema.
 */
@RestController
@RequestMapping("/api/tecnicos")
@CrossOrigin(origins = "*")
public class TecnicoController {

    /**
     * Inyección del servicio de técnicos.
     */
    @Autowired
    private TecnicoService tecnicoService;

    /**
     * Endpoint para listar todos los técnicos registrados.
     *
     * Método HTTP: GET
     * URL: /api/tecnicos
     *
     * @return lista de técnicos
     */
    @GetMapping
    public List<Tecnico> listarTecnicos() {
        return tecnicoService.listarTecnicos();
    }

    /**
     * Endpoint para consultar un técnico por su identificador.
     *
     * Método HTTP: GET
     * URL: /api/tecnicos/{id}
     *
     * @param id identificador del técnico
     * @return respuesta con el técnico encontrado o estado 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Tecnico> obtenerTecnicoPorId(@PathVariable Long id) {
        Optional<Tecnico> tecnico = tecnicoService.obtenerTecnicoPorId(id);

        return tecnico.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Endpoint para registrar un nuevo técnico.
     *
     * Método HTTP: POST
     * URL: /api/tecnicos
     *
     * La anotación @Valid obliga a validar el objeto recibido
     * con las reglas definidas en la entidad Tecnico.
     *
     * @param tecnico objeto recibido en el cuerpo de la solicitud
     * @return técnico guardado
     */
    @PostMapping
    public Tecnico guardarTecnico(@Valid @RequestBody Tecnico tecnico) {
        return tecnicoService.guardarTecnico(tecnico);
    }

    /**
     * Endpoint para actualizar un técnico existente.
     *
     * Método HTTP: PUT
     * URL: /api/tecnicos/{id}
     *
     * @param id identificador del técnico a actualizar
     * @param tecnicoActualizado datos actualizados del técnico
     * @return respuesta con el técnico actualizado o estado 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Tecnico> actualizarTecnico(@PathVariable Long id, @Valid @RequestBody Tecnico tecnicoActualizado) {
        Tecnico tecnico = tecnicoService.actualizarTecnico(id, tecnicoActualizado);

        if (tecnico != null) {
            return ResponseEntity.ok(tecnico);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint para eliminar un técnico por su identificador.
     *
     * Método HTTP: DELETE
     * URL: /api/tecnicos/{id}
     *
     * @param id identificador del técnico a eliminar
     * @return respuesta sin contenido si se elimina correctamente
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTecnico(@PathVariable Long id) {
        tecnicoService.eliminarTecnico(id);
        return ResponseEntity.noContent().build();
    }
}