package com.mantenimiento.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Esta clase representa la entidad Equipo.
 * Se usará para almacenar la información de los equipos o activos hospitalarios
 * dentro de la base de datos del sistema de gestión de mantenimiento.
 */
@Entity
@Table(name = "equipos")
public class Equipo {

    /**
     * Identificador único del equipo.
     * Se genera automáticamente en la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del equipo.
     * No puede estar vacío.
     */
    @NotBlank(message = "El nombre del equipo es obligatorio")
    @Size(max = 100, message = "El nombre no debe superar los 100 caracteres")
    private String nombre;

    /**
     * Código interno del equipo.
     * No puede estar vacío.
     */
    @NotBlank(message = "El código del equipo es obligatorio")
    @Size(max = 50, message = "El código no debe superar los 50 caracteres")
    private String codigo;

    /**
     * Marca del equipo.
     * No puede estar vacía.
     */
    @NotBlank(message = "La marca del equipo es obligatoria")
    @Size(max = 80, message = "La marca no debe superar los 80 caracteres")
    private String marca;

    /**
     * Modelo del equipo.
     * Puede venir informado según necesidad del proyecto.
     */
    @Size(max = 80, message = "El modelo no debe superar los 80 caracteres")
    private String modelo;

    /**
     * Serie del equipo.
     * Puede venir informada según necesidad del proyecto.
     */
    @Size(max = 80, message = "La serie no debe superar los 80 caracteres")
    private String serie;

    /**
     * Área o ubicación del equipo.
     * No puede estar vacía.
     */
    @NotBlank(message = "El área del equipo es obligatoria")
    @Size(max = 100, message = "El área no debe superar los 100 caracteres")
    private String area;

    /**
     * Estado del equipo.
     * No puede estar vacío.
     */
    @NotBlank(message = "El estado del equipo es obligatorio")
    @Size(max = 50, message = "El estado no debe superar los 50 caracteres")
    private String estado;

    /**
     * Constructor vacío requerido por JPA.
     */
    public Equipo() {
    }

    /**
     * Constructor con parámetros para inicializar los atributos.
     */
    public Equipo(String nombre, String codigo, String marca, String modelo, String serie, String area, String estado) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.marca = marca;
        this.modelo = modelo;
        this.serie = serie;
        this.area = area;
        this.estado = estado;
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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}