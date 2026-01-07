# 📱 Social Media Fullstack – Technical Assessment

## 👩‍💻 Autora
**Juliana María Florez Morales**  
Full Stack Developer  

---

## 🧠 Descripción general

Este proyecto implementa una **aplicación tipo red social**, construida con una arquitectura **Fullstack**, que permite:

- Autenticación de usuarios
- Creación de publicaciones (texto e imagen)
- Visualización de publicaciones
- Sistema de likes con comportamiento *toggle*
- Perfil de usuario
- Manejo de sesión

El sistema está compuesto por:
- **Backend:** NestJS
- **Frontend:** React + Vite
- **Base de datos:** PostgreSQL
- **Infraestructura:** Docker

---

## 🏗 Arquitectura general

El backend sigue principios de **Arquitecture Hexagonal**, separando claramente:
- Application
- Dominio
- Infraestructura

---

# 🔧 Backend – NestJS

## 🛠 Tecnologías utilizadas
- Node.js
- NestJS
- TypeORM
- PostgreSQL
- JWT
- Docker

---

## 📂 Estructura del backend

```text
src/
├── domain/
│ ├── model
│ ├── port
│ └── service
├── application/
│ ├── command
│ ├── dto
│ └── query
├── infrastructure/
│ ├── controller
│ ├── entity
│ └── adapter
│ └── provider
├── module.ts
└── main.ts
```

---

## 🔐 Seguridad
- Autenticación mediante **JWT**
- Guards y Roles (`ADMIN`, `EMPLOYEE`, `CUSTOMER`)
- Validaciones automáticas con `ValidationPipe`

---

## ❤️ Sistema de Likes (Toggle)

La lógica de likes se maneja en el backend:

- Si existe un like `(userId, postId)` → se elimina
- Si no existe → se crea

Esto permite:
- Evitar duplicados
- Cambiar de usuario sin interferencias
- Mantener consistencia de datos

---

## 🐳 Backend – Docker

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependencias primero (mejor cache)
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

EXPOSE 8080

# Dev mode (usa tu script start:dev)
CMD ["npm", "run", "start:dev"]
```

### docker-compose.yml (Frontend)

```docker-compose
version: '3.8'

services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: PeriferiaSocial
      POSTGRES_USER: PeriferiaSocial
      POSTGRES_PASSWORD: PeriferiaSocialPass
    ports:
      - "2345:5432"
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U PeriferiaSocial -d PeriferiaSocial"]
      interval: 5s
      timeout: 3s
      retries: 20

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    environment:
      PORT: 8080
      DATABASE_TYPE: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USER: PeriferiaSocial
      DATABASE_PASSWORD: PeriferiaSocialPass
      DATABASE_NAME: PeriferiaSocial
      BASE_URL: http://localhost:8080/
      TYPEORM_ENTITIES_DIR: dist/**/*.entity{.ts,.js}
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./:/app
      - /app/node_modules
      - uploads:/app/uploads
    command: npm run start:dev

volumes:
  uploads:
```

## Levantar Backend

```bash
docker compose up -d --build
```

## Backend disponible en:
```arduino
http://localhost:8080
```

Si no se desea lenvantar con el docker sino manualmente, se debe aplicar el siguiente comando

```bash
npm i
npm run start:dev
```

Esto para que instale todas las dependencias que hace que la api funciona y finalmente el otro comando para correr manualmente el backend