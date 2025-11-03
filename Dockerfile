# Build stage
FROM node:20.19.0-alpine AS builder

WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production stage
FROM nginx:alpine

# Copiar los archivos built
COPY --from=builder /app/dist/cloudflare/browser /usr/share/nginx/html

# Configuración para Angular SPA en puerto 3001
RUN echo 'server { \
    listen 3001; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]