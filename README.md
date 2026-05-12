# Proyecto Backend

API REST desarrollada con Node.js, Express, MongoDB Atlas y autenticación JWT.

## URL de Producción

https://api-proyecto-backend-mt.fly.dev

## Tecnologías

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt
- Docker
- Fly.io

## Estructura del proyecto

```
src/
├── config/
│   └── database.js       # Conexión a MongoDB
├── models/
│   ├── User.js           # Schema de usuario
│   ├── Candidate.js      # Schema de candidato
│   └── Job.js            # Schema de job
├── controllers/
│   ├── authController.js
│   ├── candidateController.js
│   └── jobController.js
├── routes/
│   ├── authRoutes.js
│   ├── candidateRoutes.js
│   └── jobRoutes.js
├── middlewares/
│   └── auth.js           # Verificación JWT
└── index.js              # Punto de entrada
```

## Variables de entorno

Crea un archivo `.env` basado en `.env.example`:

| Variable    | Descripción                         |
| ----------- | ----------------------------------- |
| MONGODB_URI | URI de conexión a MongoDB Atlas     |
| JWT_SECRET  | Clave secreta para firmar JWT       |
| PORT        | Puerto del servidor (default: 8080) |

## Instalación local

```bash
git clone https://github.com/amethystusmel/api-proyecto-backend-mt.git
cd api-proyecto-backend-mt
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
```

## Docker

```bash
# Build
docker build -t api-proyecto-backend-mt .

# Run
docker run -p 8080:8080 --env-file .env api-proyecto-backend-mt
```

## Endpoints

### Auth

| Método | Endpoint              | Descripción         |
| ------ | --------------------- | ------------------- |
| POST   | /api/v1/auth/register | Registrar usuario   |
| POST   | /api/v1/auth/login    | Login y obtener JWT |

### Candidates (requieren JWT)

| Método | Endpoint               | Descripción          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/v1/candidates     | Listar candidatos    |
| POST   | /api/v1/candidates     | Crear candidato      |
| PUT    | /api/v1/candidates/:id | Actualizar candidato |
| DELETE | /api/v1/candidates/:id | Soft delete          |

### Jobs (requieren JWT)

| Método | Endpoint         | Descripción    |
| ------ | ---------------- | -------------- |
| GET    | /api/v1/jobs     | Listar jobs    |
| POST   | /api/v1/jobs     | Crear job      |
| PUT    | /api/v1/jobs/:id | Actualizar job |
| DELETE | /api/v1/jobs/:id | Soft delete    |

## Autenticación

Todas las rutas excepto `/auth/register` y `/auth/login` requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## Flujo de prueba en Postman

1. `POST /api/v1/auth/register` → crear usuario
2. `POST /api/v1/auth/login` → obtener token
3. Usar el token en el header `Authorization: Bearer <token>`
4. `POST /api/v1/candidates` → crear candidato
5. `GET /api/v1/candidates` → listar candidatos
6. `PUT /api/v1/candidates/:id` → actualizar
7. `DELETE /api/v1/candidates/:id` → soft delete

