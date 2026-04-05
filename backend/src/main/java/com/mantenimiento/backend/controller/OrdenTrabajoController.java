package com.mantenimiento.backend.controller;

import com.mantenimiento.backend.model.OrdenTrabajo;
import com.mantenimiento.backend.service.OrdenTrabajoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar las operaciones relacionadas con la entidad OrdenTrabajo.
 *
 * Esta clase expone los endpoints de la API para listar, consultar, crear,
 * actualizar y eliminar órdenes de trabajo del sistema.
 */
@RestController
@RequestMapping("/api/ordenes-trabajo")
@CrossOrigin(origins = "*")
public class OrdenTrabajoController {

    /**
     * Inyección del servicio de órdenes de trabajo.
     */
    @Autowired
    private OrdenTrabajoService ordenTrabajoService;

    /**
     * Endpoint para listar todas las órdenes de trabajo registradas.
     *
     * Método HTTP: GET
     * URL: /api/ordenes-trabajo
     *
     * @return lista de órdenes de trabajo
     */
    @GetMapping
    public List<OrdenTrabajo> listarOrdenesTrabajo() {
        return ordenTrabajoService.listarOrdenesTrabajo();
    }

    /**
     * Endpoint para consultar una orden de trabajo por su identificador.
     *
     * Método HTTP: GET
     * URL: /api/ordenes-trabajo/{id}
     *
     * @param id identificador de la orden de trabajo
     * @return respuesta con la orden encontrada o estado 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrdenTrabajo> obtenerOrdenTrabajoPorId(@PathVariable Long id) {
        Optional<OrdenTrabajo> ordenTrabajo = ordenTrabajoService.obtenerOrdenTrabajoPorId(id);

        return ordenTrabajo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Endpoint para registrar una nueva orden de trabajo.
     *
     * Método HTTP: POST
     * URL: /api/ordenes-trabajo
     *
     * La anotación @Valid obliga a validar el objeto recibido
     * con las reglas definidas en la entidad OrdenTrabajo.
     *
     * @param ordenTrabajo objeto recibido en el cuerpo de la solicitud
     * @return orden de trabajo guardada
     */
    @PostMapping
    public OrdenTrabajo guardarOrdenTrabajo(@Valid @RequestBody OrdenTrabajo ordenTrabajo) {
        return ordenTrabajoService.guardarOrdenTrabajo(ordenTrabajo);
    }

    /**
     * Endpoint para actualizar una orden de trabajo existente.
     *
     * Método HTTP: PUT
     * URL: /api/ordenes-trabajo/{id}
     *
     * @param id identificador de la orden a actualizar
     * @param ordenActualizada datos actualizados de la orden
     * @return respuesta con la orden actualizada o estado 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrdenTrabajo> actualizarOrdenTrabajo(
            @PathVariable Long id,
            @Valid @RequestBody OrdenTrabajo ordenActualizada) {

        OrdenTrabajo ordenTrabajo = ordenTrabajoService.actualizarOrdenTrabajo(id, ordenActualizada);

        if (ordenTrabajo != null) {
            return ResponseEntity.ok(ordenTrabajo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint para eliminar una orden de trabajo por su identificador.
     *
     * Método HTTP: DELETE
     * URL: /api/ordenes-trabajo/{id}
     *
     * @param id identificador de la orden a eliminar
     * @return respuesta sin contenido si se elimina correctamente
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOrdenTrabajo(@PathVariable Long id) {
        ordenTrabajoService.eliminarOrdenTrabajo(id);
        return ResponseEntity.noContent().build();
    }
}