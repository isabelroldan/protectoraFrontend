# Utilizamos la imagen base de Node para compilar la app
FROM node:20 AS build

# Especificamos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos del frontend al contenedor
COPY . .

# Instalamos las dependencias y generamos el build de producción
RUN npm install && npm run build

# Usamos Apache como servidor web
FROM httpd:2.4

# Especificamos el directorio de trabajo
WORKDIR /usr/local/apache2/htdocs

# Copiamos los archivos de la carpeta de build al servidor Apache
COPY --from=build /app/dist ./
