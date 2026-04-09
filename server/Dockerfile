FROM node:20-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente y schema de Prisma
COPY prisma ./prisma
COPY src ./src

# Generar cliente Prisma para Linux
RUN npx prisma generate

EXPOSE 3001

# Al arrancar: sincroniza el schema con la BD y lanza el servidor
CMD ["/bin/sh", "-c", "npx prisma db push && npx tsx src/index.ts"]
