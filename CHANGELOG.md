# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Versionamiento Semántico](https://semver.org/lang/es/).

## [0.3.0] - 2026-03-13

### 🎉 Lanzamiento inicial de Lab 03: MongoDB + Mongoose

La integración completa de MongoDB con Mongoose, transformando la aplicación de tareas de un almacenamiento en memoria a una base de datos persistente.

### ✨ Agregado

#### Backend

- **Conectar a MongoDB**: Configuración de Mongoose con `.env` y `config/db.js`
  - URI configurable desde `MONGO_URI`
  - Manejo de errores de conexión con exit automático
- **Modelo Task**: Schema Mongoose con validaciones
  - Campos: `title` (requerido, min 3 chars), `completed` (default false), `createdAt`, `updatedAt`
  - Índices automáticos por timestamps
- **Controlador CRUD**: Operaciones reales con MongoDB
  - `getAllTasks()`: Obtiene todas las tareas
  - `getTaskById()`: Obtiene tarea por ID
  - `createTask()`: Crea nueva tarea
  - `updateTask()`: Actualiza tarea con `findByIdAndUpdate`
  - `deleteTask()`: Elimina tarea
  - Manejo completo con `async/await` y `try/catch`
- **Health Check**: Endpoint `/health` que retorna estado de DB
  - Mapeo de `mongoose.connection.readyState`
  - Respuesta: `{ status: "ok", database: "connected|disconnected" }`
- **Middlewares**: Validación robusta
  - `validateObjectId.js`: Valida formato ObjectId antes de operaciones
  - `validateSchema.js`: Valida payloads con esquemas Joi
- **Validadores**: Esquemas Joi para request/response
  - `createTaskSchema`: Requiere `title` (min 3 chars)
  - `updateTaskSchema`: Valida actualizaciones parciales

#### Frontend

- **Persistencia de datos**: `useTasks` hook con `useEffect`
  - Carga automática de tareas al montar componente
  - Estados: `loading`, `error`, `tasks`
  - Manejo de errores con toast notifications
- **Indicador de BD**: Componente `DbStatus`
  - Punto verde (conectado) o rojo (desconectado)
  - Consume `/api/health` periódicamente
  - Integrado en el header
- **UI mejorada**: Componentes shadcn/ui
  - Skeleton loader mientras carga
  - Mensajes de error amigables
  - Toasts de confirmación

### 🔄 Cambios

- Migración completa del controlador de tareas a Mongoose
- IDs ahora son ObjectIds en lugar de números
- Timestamps automáticos con `{ timestamps: true }`

### 🔒 Seguridad

- Validación de ObjectIds antes de consultas
- Validación de esquemas con Joi en todos los endpoints CRUD
- Helmet habilitado para headers HTTP seguros
- CORS configurado solo para `http://localhost:5173`

### 📦 Dependencias Agregadas

**Backend:**

- `mongoose ^9.2.4`: ODM para MongoDB

**Frontend:**

- Ninguna nueva (se utilizaron existentes de Lab 02)

### 📚 Documentación

- `README.md`: Guía completa de instalación y uso
- `CHANGELOG.md`: Este archivo
- `.env.example`: Plantilla de variables de entorno
- Endpoints documentados con ejemplos JSON

## [0.2.0] - MERN Lab 02

Implementación inicial del stack MERN con CRUD en memoria.

## [0.1.0] - MERN Lab 01

Configuración básica del proyecto y setup inicial.
