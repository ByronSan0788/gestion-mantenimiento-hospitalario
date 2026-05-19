# Sistema de Gestión de Mantenimiento Hospitalario

## Descripción del proyecto
Este proyecto corresponde al desarrollo de un sistema de gestión de mantenimiento hospitalario, orientado a la administración de información relacionada con equipos, técnicos y órdenes de trabajo.

La solución se encuentra estructurada en dos partes:

- **Frontend** desarrollado en React con TypeScript y Vite.
- **Backend** desarrollado en Spring Boot con Java, bajo arquitectura API REST.

El backend permite realizar operaciones de consulta, registro, actualización y eliminación de información, con persistencia en base de datos MySQL y validaciones sobre los datos recibidos.

## Objetivo del proyecto
Desarrollar una API REST para el sistema de gestión de mantenimiento hospitalario, permitiendo administrar equipos, técnicos y órdenes de trabajo, con persistencia en base de datos y pruebas funcionales mediante Postman.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- CSS

### Backend
- Java 17
- Spring Boot 3.5.13
- Spring Web
- Spring Data JPA
- MySQL Driver
- Validation
- Lombok
- Maven

### Base de datos
- MySQL

### Herramientas de apoyo
- Visual Studio Code
- MySQL Workbench
- Postman
- Git
- GitHub

## Estructura general del proyecto

```text
GESTION-MANTENIMIENTO-HOSPITALARIO/
├── backend/
│   ├── .mvn/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── public/
├── src/
├── package.json
├── vite.config.ts
└── README.md

## Requisitos previos
Antes de ejecutar el proyecto, se debe tener instalado:

- Node.js
- Java 17
- MySQL Server
- MySQL Workbench
- Git

## Configuración de la base de datos

Crear la base de datos en MySQL con el siguiente comando:

```sql
CREATE DATABASE gestion_mantenimiento_hospitalario;

## Configuración y ejecución del proyecto

### Base de datos
El proyecto utiliza la base de datos MySQL llamada:

`gestion_mantenimiento_hospitalario`

La conexión del backend se configura en el archivo:

`backend/src/main/resources/application.properties`

### Ejecución del frontend
Ubicado en la raíz del proyecto, ejecutar:

```bash
npm install
npm run dev

Ejecución del backend:
.\mvnw.cmd spring-boot:run


## Endpoints principales desarrollados

### Módulo de equipos
- `GET /api/equipos`
- `POST /api/equipos`
- `GET /api/equipos/{id}`
- `PUT /api/equipos/{id}`
- `DELETE /api/equipos/{id}`

### Módulo de usuarios
- `POST /api/usuarios/registro`
- `GET /api/usuarios`
- `GET /api/usuarios/{id}`

### Módulo de órdenes de trabajo
- `GET /api/ordenes-trabajo`
- `POST /api/ordenes-trabajo`
- `GET /api/ordenes-trabajo/{id}`
- `PUT /api/ordenes-trabajo/{id}`
- `DELETE /api/ordenes-trabajo/{id}`

## Validaciones implementadas
En la API se implementaron validaciones sobre campos obligatorios y formatos de datos, utilizando anotaciones como:

- `@NotBlank`
- `@Size`
- `@Email`

Estas validaciones permiten responder con errores controlados cuando se envía información incompleta o inválida.

## Pruebas realizadas
Las pruebas funcionales de la API se realizaron con Postman, verificando:

- consulta de registros
- creación de registros
- actualización de registros
- eliminación de registros
- validaciones con respuestas de error

## Versionamiento
El proyecto fue gestionado con herramientas de versionamiento:

- **Git** para el control local de cambios
- **GitHub** para el repositorio remoto

## Estado del proyecto
Actualmente el proyecto cuenta con:

- Backend funcional en Spring Boot
- Conexión a MySQL
- API REST implementada para usuaruis, equipos, técnicos y órdenes de trabajo
- Validaciones básicas
- Pruebas funcionales realizadas en Postman
- Versionamiento local y remoto



## Autor
**Bayron José Saumett Reyes**  
Programa: Análisis y Desarrollo de Software