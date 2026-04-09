FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/index.js"]
