# FROM node:18-alpine
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 4000

# CMD ["npm", "run", "start"]

# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 4000

# CMD ["npm", "run", "start"]


# Usa una imagen ligera de Node
FROM node:20-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias
COPY package*.json ./

# Instala dependencias (sin build aún)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto del backend
EXPOSE 4000

# Comando por defecto para desarrollo
CMD ["npm", "run", "start"]
