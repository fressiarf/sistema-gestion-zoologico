# Sistema de Gestión de Zoológico

Aplicación web para la gestión del **Zoológico TerraNova**: autenticación de usuarios, panel de administración (animales, recintos, horarios, membresías y landing page) y sitio público para visitantes.

Stack: **HTML · CSS · JavaScript (ES Modules) · Node.js · Express · LocalStorage · SweetAlert2 · Phosphor Icons**

---

## Estructura

```
backend/              Servidor estático (Express) + lógica de negocio (POO)
backend/classes/      Clases del dominio: Animal, Mamifero, Ave, Reptil, Usuario, Autenticacion, Zoologico
backend/js/           Scripts de página: login, registro, dashboard
backend/services/     Servicios de datos: storageService (CRUD LocalStorage) y dataService (configuración)
frontend/             Sitio web público (Visitantes)
frontend/src/pages/   Páginas HTML: index, login, registro, dashboard, recintos, horarios, membresías
frontend/src/css/     Hojas de estilo por página
frontend/src/img/     Recursos gráficos
```

---

## Requisitos

- Node.js 18+
- Navegador moderno con soporte para ES Modules

> **Nota:** La persistencia de datos usa `localStorage` del navegador, por lo que no se requiere base de datos externa.

---

## Puesta en marcha

```bash
cd backend
npm install
npm run dev        # Arranca el servidor en http://localhost:3001
```

Abre `http://localhost:3001` en el navegador. El servidor sirve estáticamente las páginas de `frontend/`.

---

## Scripts

| Script        | Acción                                  |
|---------------|-----------------------------------------|
| `npm start`   | Arranca el servidor con Node.js         |
| `npm run dev` | Arranca con recarga automática (nodemon)|

---

## Cuentas de demostración

Los usuarios se crean desde la página de **Registro** (`/pages/registro.html`).

Al registrarse puedes elegir el rol:

| Rol            | Acceso                                                                          |
|----------------|---------------------------------------------------------------------------------|
| `Administrador`| Panel de control completo (animales, horarios, membresías, recintos, landing)   |
| `Visitante`    | Sitio público (recintos, horarios, membresías)                                  |

> **Acceso al panel de administrador:** tras iniciar sesión con rol Administrador se solicita un **PIN de seguridad** (`1234` por defecto).

---

## Páginas del sitio

| Página           | Ruta                       | Descripción                                          |
|------------------|----------------------------|------------------------------------------------------|
| Inicio / Landing | `/pages/index.html`        | Hero, estadísticas y sobre nosotros (editable)       |
| Recintos         | `/pages/recinto.html`      | Catálogo de recintos y exhibiciones por región       |
| Membresías       | `/pages/membresia.html`    | Planes de acceso (Pase Diario, VIP, Familiar, Socio) |
| Horarios         | `/pages/horario.html`      | Horarios de apertura, taquilla y ubicación           |
| Login            | `/pages/login.html`        | Autenticación de usuarios                            |
| Registro         | `/pages/registro.html`     | Creación de cuenta (Visitante o Administrador)       |
| Panel de control | `/pages/dashboard.html`    | Gestión completa (solo Administrador)                |

---

## Módulos principales (backend/classes)

| Archivo            | Descripción                                                                   |
|--------------------|-------------------------------------------------------------------------------|
| `animal.js`        | Clase base `Animal` (id, nombre, especie, claseAnimal)                        |
| `mamifero.js`      | Hereda de `Animal`; agrega `esMamifero`, `emitirSonido()`, `tipoMovimiento()` |
| `ave.js`           | Hereda de `Animal`; agrega `esAve`, `emitirSonido()`, `volar()`               |
| `reptil.js`        | Hereda de `Animal`; agrega `esReptil`, `emitirSonido()`, `desplazarse()`      |
| `usuario.js`       | Clase `Usuario` (id, username, password, rol); métodos de sesión              |
| `autenticacion.js` | Objeto `Autenticacion`: registro, login, logout y verificación de sesión      |
| `zoologico.js`     | Clase `Zoologico`: CRUD de animales con control de permisos por rol           |

---

## Servicios (backend/services)

| Archivo             | Descripción                                                                  |
|---------------------|------------------------------------------------------------------------------|
| `storageService.js` | CRUD completo de animales y usuarios sobre `localStorage`                    |
| `dataService.js`    | Gestión de configuración del sitio: horarios, membresías, recintos y landing |

---

## Funcionalidades del Panel de Administración

- **Animales** — Registrar (Mamífero / Ave / Reptil / Animal genérico) y eliminar del directorio.
- **Horarios** — Editar apertura, cierre, días, taquilla, estacionamiento y ubicación.
- **Membresías** — Modificar nombre, precio, período y beneficios de cada plan.
- **Recintos** — Actualizar descripción de regiones y exhibiciones individuales.
- **Landing Page** — Editar textos del hero, sección "Sobre Nosotros" y estadísticas del sitio público.

---

## Arquitectura de datos

Toda la información se persiste en `localStorage` bajo las siguientes claves:

| Clave             | Contenido                       |
|-------------------|---------------------------------|
| `usuarios_db`     | Array de usuarios registrados   |
| `usuario_actual`  | Usuario con sesión activa       |
| `animales_db`     | Directorio de animales del zoo  |
| `zoo_horarios`    | Configuración de horarios       |
| `zoo_membresias`  | Planes de membresía             |
| `zoo_recintos`    | Recintos y exhibiciones         |
| `zoo_landing`     | Textos de la landing page       |

---

## Dependencias

```json
{
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

**Frontend (CDN):**
- [SweetAlert2](https://sweetalert2.github.io/) — Modales de confirmación y alertas
- [Phosphor Icons](https://phosphoricons.com/) — Iconografía
- [Google Fonts – Outfit](https://fonts.google.com/specimen/Outfit) — Tipografía principal
