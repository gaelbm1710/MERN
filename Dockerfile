# Paso 1: Construir la aplicación React
# Utilizar una imagen de Node.js como base
FROM node:20.11.0-alpine as build-stage

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación React
RUN yarn build

# Paso 2: Ejecutar la aplicación utilizando un servidor Node.js
# Iniciar desde una imagen de Node.js limpia
FROM node:20.11.0-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el resultado de la compilación desde el paso de construcción
COPY --from=build-stage /app/build ./build

# Instalar un servidor HTTP global para servir la aplicación
RUN yarn global add serve

# Exponer el puerto que el servidor HTTP utilizará
EXPOSE 80

# Comando para iniciar el servidor HTTP
CMD ["serve", "-s", "build", "-l", "80"]
