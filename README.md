# Recipe App

## Descripción del Proyecto
Recipe App es una aplicación interactiva que permite a los usuarios buscar, ver y guardar recetas favoritas. Utilizando ReactJs en el frontend y NodeJs en el backend, ofrece una experiencia de usuario dinámica.

## Configuración y Ejecución Local

### Requisitos Previos
- Node.js
- XAMPP para MySQL
- Base de datos MySQL con el nombre `database_flembee`

### Configuración de la Base de Datos
1. Inicia XAMPP y asegúrate de que MySQL esté funcionando.
2. Crea una nueva base de datos llamada `database_flembee` en MySQL.
3. Importa las estructuras de las tablas desde el archivo SQL proporcionado. Este archivo contiene las estructuras necesarias para las tablas como `fb_categorias`, `fb_recetas`, entre otras.

### Instalación y Ejecución
1. Clona el repositorio.
2. Backend:
   - Navega a `\FlembeePT\node`.
   - Ejecuta `nodemon app` para iniciar el servidor backend.
3. Frontend:
   - Navega a `\FlembeePT\reactflembee`.
   - Ejecuta `npm start` para iniciar el servidor de desarrollo de React.

## Características Principales
- Búsqueda de recetas.
- Visualización de detalles de recetas.
- Guardado de recetas favoritas.

## Tecnologías Utilizadas
- Frontend: ReactJs, CSS.
- Backend: NodeJs, ExpressJs.
- Base de Datos: MySQL.

