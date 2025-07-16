# Estágio 1: Build da Aplicação (Builder)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Estágio 2: Servidor de Produção (Final)
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio de 'build' para a pasta padrão do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expõe a porta 80 (porta padrão do Nginx) dentro do contêiner
EXPOSE 80