package com.mantenimiento.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Esta clase representa la entidad OrdenTrabajo.
 * Se usará para almacenar las órdenes de mantenimiento
 * asociadas a equipos y técnicos del sistema.
 */
@Entity
@Table(name = "ordenes_trabajo")
public class OrdenTrabajo {

    /**
     * Identificador único de la orden de trabajo.
     * Se genera automáticamente en la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Fecha en la que se registra la solicitud de mantenimiento.
     * Se maneja como texto para simplificar esta evidencia.
     */
    @NotBlank(message = "La fecha de solicitud es obligatoria")
    @Size(max = 30, message = "La fecha de solicitud no debe superar los 30 caracteres")
    private String fechaSolicitud;

    /**
     * Tipo de mantenimiento de la orden.
     * Ejemplo: Preventivo o Correctivo.
     */
    @NotBlank(message = "El tipo de mantenimiento es obligatorio")
    @Size(max = 50, message = "El tipo de mantenimiento no debe superar los 50 caracteres")
    private String tipoMantenimiento;

    /**
     * Descripción de la falla o actividad a realizar.
     */
    @NotBlank(message = "La descripción de la falla es obligatoria")
    @Size(max = 255, message = "La descripción no debe superar los 255 caracteres")
    private String descripcionFalla;

    /**
     * Nivel de prioridad de la orden.
     * Ejemplo: Alta, Media o Baja.
     */
    @NotBlank(message = "La prioridad es obligatoria")
    @Size(max = 30, message = "La prioridad no debe superar los 30 caracteres")
    private String prioridad;

    /**
     * Estado actual de la orden de trabajo.
     * Ejemplo: Pendiente, En proceso, Finalizada.
     */
    @NotBlank(message = "El estado de la orden es obligatorio")
    @Size(max = 30, message = "El estado no debe superar los 30 caracteres")
    private String estado;

    /**
     * Equipo asociado a la orden de trabajo.
     * Muchas órdenes pueden corresponder a un mismo equipo.
     */
    @ManyToOne
    @JoinColumn(name = "equipo_id")
    private Equipo equipo;

    /**
     * Técnico asignado a la orden de trabajo.
     * Muchas órdenes pueden ser atendidas por un mismo técnico.
     */
    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    /**
     * Constructor vacío requerido por JPA.
     */
    public OrdenTrabajo() {
    }

    /**
     * Constructor con parámetros para inicializar los atributos.
     */
    public OrdenTrabajo(String fechaSolicitud, String tipoMantenimiento, String descripcionFalla,
                        String prioridad, String estado, Equipo equipo, Tecnico tecnico) {
        this.fechaSolicitud = fechaSolicitud;
        this.tipoMantenimiento = tipoMantenimiento;
        this.descripcionFalla = descripcionFalla;
        this.prioridad = prioridad;
        this.estado = estado;
        this.equipo = equipo;
        this.tecnico = tecnico;
    }

    /**
     * Métodos getter y setter para acceder y modificar los atributos.
     */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(String fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getTipoMantenimiento() {
        return tipoMantenimiento;
    }

    public void setTipoMantenimiento(String tipoMantenimiento) {
        this.tipoMantenimiento = tipoMantenimiento;
    }

    public String getDescripcionFalla() {
        return descripcionFalla;
    }

    public void setDescripcionFalla(String descripcionFalla) {
        this.descripcionFalla = descripcionFalla;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    public Tecnico getTecnico() {
        return tecnico;
    }

    public void setTecnico(Tecnico tecnico) {
        this.tecnico = tecnico;
    }
}