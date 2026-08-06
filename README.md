# Sistema de Tickets Angular

Aplicacion web de gestion de tickets de soporte desarrollada con Angular y TypeScript. Permite registrar, consultar y organizar incidencias de soporte desde una interfaz clara y adaptable.

## Funcionalidades

- Dashboard con el total de tickets y estadisticas por estado y prioridad.
- Listado con busqueda por titulo y filtros por estado y prioridad.
- Creacion de tickets mediante formularios reactivos y validaciones de campos obligatorios.
- Vista de detalle para consultar cada ticket y actualizar su estado.
- Eliminacion de tickets con confirmacion previa.
- Persistencia de datos en `localStorage` y carga de tickets de ejemplo al iniciar por primera vez.
- Navegacion con Angular Router y redireccion de rutas no reconocidas al dashboard.
- Diseno responsive con CSS nativo.

## Tecnologias utilizadas

- Angular 21 con componentes standalone.
- TypeScript.
- Angular Router.
- Reactive Forms.
- CSS nativo.
- `localStorage` para la persistencia local.

## Requisitos

- Node.js 20.19 o superior recomendado por Angular 21.
- npm 10 o superior.
- Angular CLI, disponible a traves de las dependencias del proyecto.

## Instalacion

```bash
git clone URL_DEL_REPOSITORIO
cd sistema-tickets-angular
npm install
```

## Ejecucion

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Tambien puedes usar el comando incluido en el proyecto:

```bash
npm start
```

Luego abre `http://localhost:4200/` en el navegador.

## Comandos utiles

```bash
npm run build
npm test -- --watch=false
```

## Estructura principal

```text
src/app/
├── components/
│   ├── navbar/
│   ├── status-badge/
│   └── ticket-card/
├── models/
│   └── ticket.model.ts
├── pages/
│   ├── dashboard/
│   ├── ticket-detail/
│   ├── ticket-form/
│   └── ticket-list/
├── services/
│   └── ticket.service.ts
├── app.routes.ts
└── app.ts
```

## Capturas de pantalla

Pendiente: agregar capturas reales de las vistas de dashboard, listado y detalle una vez publicado el proyecto.

## Mejoras futuras

- Conectar la aplicacion a una API real para almacenar tickets en una base de datos.
- Agregar autenticacion y roles de usuario para responsables y administradores.
- Incorporar paginacion, ordenamiento y adjuntos en los tickets.
- Desplegar la aplicacion en Google Cloud con un flujo de integracion continua.
