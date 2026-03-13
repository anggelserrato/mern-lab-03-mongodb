# MERN Lab 03: MongoDB + Mongoose

Un laboratorio de aprendizaje que implementa un aplicativo CRUD de tareas con persistencia en MongoDB usando una arquitectura MERN (MongoDB, Express, React, Node.js).

## 📋 Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelo Task](#modelo-task)
- [API Endpoints](#api-endpoints)
- [Desarrollo](#desarrollo)

## 📦 Requisitos

- Node.js >= 18.x
- npm >= 9.x
- MongoDB >= 5.x (local o Atlas)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/anggelserrato/mern-lab-03-mongodb.git
cd mern-lab-03-mongodb
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 3. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

## 🔧 Variables de Entorno

### Servidor (`server/.env`)

Copia el archivo `.env.example` y actualiza los valores:

```bash
cp .env.example .env
```

**Archivo `.env`:**

```env
# MongoDB URI
MONGO_URI=mongodb://localhost:27017/mern-lab03

# Puerto del servidor
PORT=3000
```

**Formato de MONGO_URI:**

- **Local:** `mongodb://localhost:27017/mern-lab03`
- **MongoDB Atlas:** `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mern-lab03?retryWrites=true&w=majority`

### Cliente (`client/.env`)

El cliente se conecta al servidor en `http://localhost:3000` automáticamente.

## 📂 Estructura del Proyecto

```
mern-lab-03-mongodb/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Configuración de conexión a MongoDB
│   │   ├── controllers/
│   │   │   ├── taskController.js     # Lógica CRUD de tareas
│   │   │   └── statusController.js   # Endpoints de estado y health check
│   │   ├── models/
│   │   │   └── taskModel.js          # Modelo Mongoose de Task
│   │   ├── routes/
│   │   │   ├── taskRoutes.js         # Rutas del CRUD
│   │   │   └── statusRoutes.js       # Rutas de estado
│   │   ├── validators/
│   │   │   └── taskValidator.js      # Validaciones con Joi
│   │   ├── middlewares/
│   │   │   ├── validateObjectId.js   # Valida ObjectId de MongoDB
│   │   │   └── validateSchema.js     # Valida esquemas Joi
│   │   └── index.js                  # Punto de entrada del servidor
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DbStatus.jsx          # Indicador de conexión a BD
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   ├── tasks/
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   ├── TaskRow.jsx
│   │   │   │   └── TaskTable.jsx
│   │   │   └── ui/                   # Componentes shadcn/ui
│   │   ├── hooks/
│   │   │   └── useTasks.js           # Hook para gestión de tareas
│   │   ├── services/
│   │   │   └── taskService.js        # Cliente HTTP para API
│   │   ├── api/
│   │   │   └── apiClient.js          # Configuración Axios
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## 🗄️ Modelo Task

El modelo Task en Mongoose define la estructura de una tarea en MongoDB:

```javascript
{
  _id: ObjectId,           // ID único generado por MongoDB
  title: String,           // Nombre de la tarea (requerido, mín 3 caracteres)
  completed: Boolean,      // Estado de completitud (default: false)
  createdAt: Date,         // Timestamp de creación (auto)
  updatedAt: Date          // Timestamp de última actualización (auto)
}
```

**Validaciones:**

- `title`: Requerido, mínimo 3 caracteres
- `completed`: Boolean, por defecto `false`

**Ejemplo de documento en MongoDB:**

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Aprender Mongoose",
  "completed": false,
  "createdAt": ISODate("2026-03-13T10:30:00Z"),
  "updatedAt": ISODate("2026-03-13T10:30:00Z")
}
```

## 🔌 API Endpoints

### Health Check

#### `GET /health`

Retorna el estado de la aplicación y la conexión a la base de datos.

**Respuesta:**

```json
{
  "status": "ok",
  "database": "connected"
}
```

**Estados de BD:**

- `connected`: Mongoose está conectado a MongoDB
- `disconnected`: Sin conexión a MongoDB

---

### Tareas (CRUD)

#### `GET /api/tasks`

Obtiene todas las tareas.

**Respuesta (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Aprender Mongoose",
    "completed": false,
    "createdAt": "2026-03-13T10:30:00Z",
    "updatedAt": "2026-03-13T10:30:00Z"
  }
]
```

---

#### `GET /api/tasks/:id`

Obtiene una tarea por ID.

**Parámetros:**

- `id` (string, requerido): ObjectId de la tarea

**Respuesta (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Aprender Mongoose",
  "completed": false,
  "createdAt": "2026-03-13T10:30:00Z",
  "updatedAt": "2026-03-13T10:30:00Z"
}
```

**Errores:**

- `400`: ID inválido
- `404`: Tarea no encontrada

---

#### `POST /api/tasks`

Crea una nueva tarea.

**Body (JSON):**

```json
{
  "title": "Aprender Mongoose",
  "completed": false
}
```

**Respuesta (201):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Aprender Mongoose",
  "completed": false,
  "createdAt": "2026-03-13T10:30:00Z",
  "updatedAt": "2026-03-13T10:30:00Z"
}
```

**Validación:**

- `title`: Requerido, mínimo 3 caracteres

---

#### `PUT /api/tasks/:id`

Actualiza una tarea.

**Parámetros:**

- `id` (string, requerido): ObjectId de la tarea

**Body (JSON):**

```json
{
  "title": "Aprender Mongoose (actualizado)",
  "completed": true
}
```

**Respuesta (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Aprender Mongoose (actualizado)",
  "completed": true,
  "createdAt": "2026-03-13T10:30:00Z",
  "updatedAt": "2026-03-13T10:35:00Z"
}
```

**Errores:**

- `400`: ID inválido
- `404`: Tarea no encontrada

---

#### `DELETE /api/tasks/:id`

Elimina una tarea.

**Parámetros:**

- `id` (string, requerido): ObjectId de la tarea

**Respuesta (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Aprender Mongoose",
  "completed": false,
  "createdAt": "2026-03-13T10:30:00Z",
  "updatedAt": "2026-03-13T10:30:00Z"
}
```

**Errores:**

- `400`: ID inválido
- `404`: Tarea no encontrada

---

## 💻 Desarrollo

### Iniciar el servidor

```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Iniciar el cliente

```bash
cd client
npm run dev
```

El cliente estará disponible en `http://localhost:5173`

### Scripts disponibles

**Servidor:**

- `npm run dev`: Inicia el servidor en modo desarrollo con hot-reload

**Cliente:**

- `npm run dev`: Inicia Vite en modo desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm run lint`: Ejecuta ESLint
- `npm run preview`: Previsualiza la build de producción

## 🛠️ Stack Tecnológico

### Backend

- **Express.js 5.2**: Framework HTTP
- **Mongoose 9.2**: ODM para MongoDB
- **Joi 18.0**: Validación de datos
- **Helmet 8.1**: Seguridad HTTP
- **CORS 2.8**: Control de acceso entre dominios
- **Morgan 1.10**: Logging de requests

### Frontend

- **React 19.2**: Librería de UI
- **Vite 7.3**: Build tool
- **Axios 1.13**: Cliente HTTP
- **Tailwind CSS 4.2**: Utilidades CSS
- **shadcn/ui**: Componentes UI accesibles
- **Sonner 2.0**: Toast notifications

### Base de Datos

- **MongoDB 5+**: Base de datos NoSQL
- **Mongoose 9.2**: Schema y validación

## 📝 Licencia

ISC

## 👨‍💻 Autor

[anggelserrato](https://github.com/anggelserrato)
