# Frontend de Gestión de Protectora de Animales

## Descripción General

Este proyecto es el frontend de una aplicación web para la gestión de una protectora de animales. Desarrollado en React, permite gestionar mascotas, usuarios, solicitudes de adopción y autenticación de usuarios, interactuando con un backend en Laravel.

## Tecnologías Utilizadas

- **React 18.2.0**
- **Redux Toolkit** para gestión de estado
- **React Router** para navegación
- **Styled Components** para estilos
- **Axios** para peticiones HTTP
- **TypeScript** para tipado estático

## Estructura del Proyecto

### Componentes Principales
- **Login**: Maneja la autenticación de usuarios
- **Mascotas**: Gestiona el listado, creación, edición y eliminación de mascotas
- **Usuarios**: Administra los usuarios del sistema
- **Solicitudes**: Gestiona las solicitudes de adopción

### Estado Global (Redux)
El estado global se gestiona mediante slices de Redux:
- **loginSlice**: Maneja el estado de autenticación
- **mascotasSlice**: Gestiona el estado de las mascotas
- **usuariosSlice**: Administra el estado de los usuarios
- **solicitudesSlice**: Controla el estado de las solicitudes

Cada slice implementa acciones asíncronas utilizando `createAsyncThunk` para interactuar con la API del backend.

### Servicios
Los servicios (como `MascotasService`, `UsuariosService`, etc.) encapsulan la lógica de las peticiones HTTP al backend utilizando Axios.

## Configuración y Despliegue

### Desarrollo Local
1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Inicia el servidor de desarrollo con `npm run dev`

### Utilizando Docker (Frontend + Backend)

Para una experiencia completa incluyendo el backend:

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Clona los repositorios del frontend y backend.
3. Navega hasta el directorio que contiene el archivo `docker-compose.yml`.
4. Ejecuta: `docker-compose up`

Este comando:
- Construirá las imágenes Docker para el frontend y backend.
- Clonará los repositorios de GitHub.
- Configurará y iniciará los contenedores necesarios.
- Ejecutará las migraciones y seeders de Laravel.

### Acceso Inicial
- **Usuario**: isabelroldancordoba@hotmail.com
- **Contraseña**: password

## Desarrollo y Contribución

### Guía de Contribución
1. Haz un fork del repositorio.
2. Crea una nueva rama para tu feature o bugfix.
3. Realiza tus cambios siguiendo las convenciones de código.
4. Envía un pull request con una descripción detallada.

### Convenciones de Código
- Utiliza TypeScript para todo el código.
- Sigue los principios de Clean Code.
- Documenta las funciones y componentes principales.
- Utiliza nombres descriptivos para variables y funciones.

