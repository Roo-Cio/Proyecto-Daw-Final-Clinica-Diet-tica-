<p align="center">
  <img src="/assets/favicon.png" alt="Imagen de Laravel 12" width="300">
</p>

# Clínica MV

**Clínica MV** es una plataforma web integral diseñada para la **gestión de consultas y seguimiento** entre especialistas y pacientes. Nace con el objetivo de **optimizar la atención clinica**, centralizar la información y ofrecer un entorno digital seguro y eficiente tanto para profesionales de la salud como para sus pacientes.

---

## Propósito y necesidades que cubre

El sistema responde a una necesidad cada vez más evidente en el ámbito sanitario: **digitalizar la gestión de citas, historiales médicos y documentación clínica**, facilitando además la **comunicación telemática** mediante videoconferencias seguras.

Entre sus objetivos principales se encuentran:

- Simplificar la **gestión administrativa** de la clínica.
- Ofrecer una **atención personalizada** y continua a cada paciente.
- Centralizar en un único espacio la **información médica, documentos y citas.**
- Reducir el uso de papel y mejorar la **trazabilidad y seguridad** de los datos clínicos.

---

## A quién va dirigido

La aplicación está orientada principalmente a:

- **Especialistas en de la salud**, que requieren una herramienta eficiente para gestionar sus pacientes, citas, historiales y documentos.
- **Administradores**, encargados de la administración general de clínicas, la gestión de usuarios y personal especialista.

---

## Funcionamiento general

El sistema se estructura en torno a tres áreas principales:

### 1. Gestión de usuarios y roles

Los usuarios se registran por una de las dos vias posibles, de forma personal por uno de los especialistas donde se le asigna el rol de usuario o paciente según el criterio del especialista, o de forma telemática desde la parte publica del sistema, donde se le asigna el rol de paciente. Cada rol dispone de un área privada con funcionalidades específicas.

### 2. Gestión de citas

Permite programar, modificar o cancelar citas tanto presenciales como telemáticas. Las videollamadas se realizan mediante **integración con Jitsi Meet**, garantizando comunicación segura y sin necesidad de instalar software adicional.

### 3. Historiales y documentos clínicos

Los especialistas pueden registrar evoluciones médicas, compartir documentos en PDF o imagen con sus pacientes, y mantener un historial completo de cada caso.  
Los pacientes, por su parte, pueden subir archivos personales (como analíticas o informes) y acceder a los documentos compartidos por su especialista.

---

## Arquitectura y tecnologías utilizadas

<image src="/assets/front_laravel_12.png" alt="Imagen de Laravel 12">

### Backend (API REST con Laravel)

El backend está desarrollado en **PHP utilizando el framework Laravel 12**, bajo una arquitectura **API RESTful**.  
Entre sus principales características técnicas destacan:

- **Autenticación segura** mediante Laravel Sanctum.  
- **Gestión de roles y permisos** con Spatie Laravel Permissions.  
- **Eloquent ORM** para el manejo de la base de datos MySQL.  
- **Migraciones y Seeders** para la creación automatizada de estructuras y datos base.  
- **Controladores REST** con buenas prácticas: validaciones, logs de auditoría y respuestas normalizadas en formato JSON.  
- **SoftDeletes y trazabilidad de acciones** para garantizar integridad y reversibilidad de datos.  
- **Notificaciones por correo electrónico** integradas con **Brevo (Sendinblue)**.
- Sistema de citas unificado (consulta + seguimiento)
- Subida y gestión de documentos por rol
- Historial médico con trazabilidad de entradas
- Registro de acciones (logs) con fines de auditoría

El backend actúa como el **núcleo lógico del sistema**, procesando peticiones, validando datos y ofreciendo servicios a través de endpoints accesibles solo mediante tokens autenticados.


#### Tecnologías utilizadas

- **Laravel 12**
- **PHP 8.2+**
- **SQLite / MySQL**
- **Spatie Laravel-Permission** (gestión de roles y permisos)
- **Laravel Sanctum** (autenticación vía token)
- **Eloquent** como ORM
- **Seeders y Factories** para datos de prueba
---

### Frontend (Interfaz web con Angular)

<image src="/assets/front_angular_19.png" alt="Imagen de Angular 19">

El frontend está desarrollado en **Angular 18 (standalone components)** y ofrece una experiencia fluida, moderna y adaptable a cualquier dispositivo.  
Entre sus aspectos técnicos más relevantes:

- **Interfaz modular y reutilizable**, con componentes como tablas dinámicas, modales, formularios y calendario interactivo.  
- **Consumo de API REST** para comunicación directa con el backend.  
- **Protección de rutas** mediante guards y roles definidos.  
- **Diseño responsivo** con **Bootstrap 5** y personalización de colores a partir del valor configurado en la base de datos (`color_tema`).  
- **Integración de FullCalendar** para la visualización de citas.  
- **Exportación de datos** (PDF y CSV) desde componentes genéricos.  
- **Animaciones suaves** mediante GSAP para una presentación visual atractiva.

El frontend funciona como una **SPA (Single Page Application)**, donde cada usuario accede a un entorno personalizado según su rol, manteniendo siempre la seguridad y fluidez en la navegación.

---


## Seguridad y buenas prácticas

El sistema ha sido diseñado con un enfoque prioritario en la **seguridad, mantenibilidad y usabilidad**:

- Tokens de autenticación y control de sesiones con **Sanctum**.  
- Validaciones en servidor y cliente para prevenir errores o accesos indebidos.  
- Logs de auditoría automáticos para registrar las acciones relevantes.  
- Control de acceso a documentos y citas según el rol autenticado.

---

## Arquitectura del servicio

El sistema **Clínica Dietética MV** se despliega mediante una **infraestructura basada en contenedores Docker**, organizada en múltiples servicios interconectados que garantizan seguridad, escalabilidad y mantenimiento sencillo.


#### Frontend (Nginx + Angular)

El **frontend** está desarrollado en **Angular** y se distribuye como una **Single Page Application (SPA)** servida mediante **Nginx**.
Actúa como la interfaz de usuario, comunicándose exclusivamente con la API mediante peticiones HTTPS autenticadas con **Laravel Sanctum**.
El intercambio está protegido por **CORS** y los dominios permitidos se definen en el archivo de entorno (``.env`` del backend).

- Framework: Angular 18
- Servidor web: Nginx (contenedor ligero y eficiente)
- Comunicación: API REST (token con Laravel Sanctum)

#### API (Nginx + Laravel)

La **API REST** se sirve también mediante **Nginx**, que actúa como proxy interno hacia un contenedor **PHP-FPM** encargado de ejecutar el framework **Laravel**.
Aquí reside toda la **lógica de negocio**, cuando recibe peticiones que requieren lógica de aplicación (por ejemplo, autenticación, gestión de citas o historiales), las reenvía al servicio **php** en el puerto interno **9000**, donde **PHP-FPM** ejecuta el framework Laravel.

- Framework: Laravel 12
- Servidor de aplicaciones: PHP-FPM
- Funciones principales:
    - Validación y autenticación de usuarios (Sanctum)
    - Gestión de roles y permisos (Spatie)
    - Manejo de datos clínicos y documentos
    - Comunicación con colas y base de datos
- Dominio: `https://api.clinicamv.lol`

#### PHP (PHP-FPM – Worker Principal)
Este servicio ejecuta los procesos PHP del backend, incluyendo **Artisan, migraciones, seeders, y tareas síncronas**.
Laravel accede directamente a la **base de datos MySQL** a través de la red interna Docker, utilizando credenciales definidas en variables de entorno.
Cuando se generan procesos en segundo plano (como el envío de correos o notificaciones), estos se publican en la cola de trabajos, que son procesados de manera asíncrona por el servicio **queue**.

#### Queue (Laravel Worker)

El servicio de **queue** ejecuta en segundo plano los procesos diferidos mediante **Laravel Queue.**
Esto permite gestionar tareas asincrónicas como:
- Envío de correos electrónicos (integración con Brevo).
- Procesamiento de notificaciones.
- Limpieza o generación periódica de datos.
Comando principal:
```bash
php artisan queue:work
```

#### Base de Datos (MySQL 8)
<image src="/assets/front-mysql.jpg" alt="Imagen de MySQL">

La persistencia de datos se gestiona mediante **MySQL 8**, almacenando información de usuarios, citas, historiales, logs y configuraciones del sistema.
El acceso está restringido a los contenedores de Laravel y phpMyAdmin dentro de la red interna.

- Motor: MySQL 8.0
- Persistencia: Volumen Docker dedicado (``/var/lib/mysql``)
- Seguridad: Usuario, contraseña y host configurados mediante variables de entorno (``.env``)

#### phpMyAdmin
<image src="/assets/front_phpmyadmin.png" alt="Imagen de php myadmin">

Herramienta de administración visual de la base de datos, **accesible únicamente desde entorno local o desarrollo.**
Facilita la inspección y depuración de datos durante el proceso de desarrollo.

Acceso: ``http://localhost:8082``

Uso: Consultas SQL, revisión de migraciones y testing manual.

---

#### Instalación (local)
```bash
# 1) Clonar el repo
git clone https://github.com/tu-usuario/clinica-dietetica-api.git
cd clinica-dietetica-api

# 2) Dependencias PHP
composer install

# 3) Variables de entorno
cp .env.example .env

# 4) Generar APP_KEY
php artisan key:generate

# 5) Configurar DB en .env (DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD)

# 6) Migrar y seedear
php artisan migrate --seed

# 7) Enlazar storage
php artisan storage:link

# 8) (Opcional) limpiar/cachar config y rutas
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache

# 9) Levantar servidor local
php artisan serve

```
---

<p align="center"><b>© 2026 Clínica MV | Desarrollado por Rocio Gordo</b></p>

