📝 Task App - Prueba Técnica
Aplicación backend desarrollada con NestJS, utilizando TypeORM y MySQL como base de datos relacional. Esta API gestiona tareas con autenticación basada en JWT y Bcrypt.

🚀 Características
1. Autenticación con JWT.
2. Bcrypt
3. Moment
4. XLS
5. DTOs
   
Gestión y resporte de tareas.

Conexión a base de datos MySQL usando TypeORM.

📦 Requisitos

1.MySQL
2.Versión de Node.js recomendada: 18.x o superior - Óptimo: Node 18.x (LTS) o Node 20.x (actual LTS).

📦 Instalación
1. git clone https://github.com/VictorVolado1/API.git
2. cd API
3. npm install
4. variables de entorno ( Crea un .env en la raíz del proyecto con las siguientes variables:
5. crear BD tasks,
6. synchronize: true, creacion de tablas (recomendado solo en develop)
  ```env
  DB_HOST=localhost
  DB_PORT=3306            # Puedes cambiarlo si tu MySQL usa otro puerto
  DB_USER=root            # Cambiar según tu configuración local
  DB_PASS=                # Cambiar según tu configuración local
  DB_NAME=tasks
  JWT_SECRET=CONCREDITO
  JWT_EXPIRATION_TIME=600s

▶️ Ejecución
1. nest start o npm run start

El backend estará disponible por defecto en:
📍 http://localhost:3000

📁 Estructura de Carpetas del Proyecto
src/
├── auth-security/   # Módulo de autenticación y seguridad
├── common/          # Componentes y utilidades compartidas
├── tasks/           # Módulo para la gestión de tareas
├── users/           # Módulo para la gestión de usuarios
├── app.module.ts    # Módulo raíz de la aplicación
└── main.ts          # Punto de entrada principal de la aplicación
