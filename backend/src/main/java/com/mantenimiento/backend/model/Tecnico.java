package com.mantenimiento.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Esta clase representa la entidad Tecnico.
 * Se usará para almacenar la información del personal técnico
 * encargado de realizar actividades de mantenimiento.
 */
@Entity
@Table(name = "tecnicos")
public class Tecnico {

    /**
     * Identificador único del técnico.
     * Se genera automáticamente en la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombres del técnico.
     * Campo obligatorio.
     */
    @NotBlank(message = "Los nombres del técnico son obligatorios")
    @Size(max = 100, message = "Los nombres no deben superar los 100 caracteres")
    private String nombres;

    /**
     * Apellidos del técnico.
     * Campo obligatorio.
     */
    @NotBlank(message = "Los apellidos del técnico son obligatorios")
    @Size(max = 100, message = "Los apellidos no deben superar los 100 caracteres")
    private String apellidos;

    /**
     * Número de documento del técnico.
     * Campo obligatorio.
     */
    @NotBlank(message = "El documento del técnico es obligatorio")
    @Size(max = 30, message = "El documento no debe superar los 30 caracteres")
    private String documento;

    /**
     * Especialidad del técnico.
     * Ejemplo: Biomédico, Eléctrico, Mecánico.
     */
    @NotBlank(message = "La especialidad del técnico es obligatoria")
    @Size(max = 80, message = "La especialidad no debe superar los 80 caracteres")
    private String especialidad;

    /**
     * Número de teléfono del técnico.
     */
    @Size(max = 30, message = "El teléfono no debe superar los 30 caracteres")
    private String telefono;

    /**
     * Correo electrónico del técnico.
     * Debe tener formato válido de email.
     */
    @NotBlank(message = "El correo del técnico es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 120, message = "El correo no debe superar los 120 caracteres")
    private String correo;

    /**
     * Constructor vacío requerido por JPA.
     */
    public Tecnico() {
    }

    /**
     * Constructor con parámetros para inicializar los atributos.
     */
    public Tecnico(String nombres, String apellidos, String documento, String especialidad, String telefono, String correo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.documento = documento;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.correo = correo;
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

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}