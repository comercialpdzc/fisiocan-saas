FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npx prisma generate --schema=prisma/schema.prisma
EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
