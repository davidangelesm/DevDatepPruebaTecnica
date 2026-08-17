# Prueba Desserts - E-Commerce & Admin Panel

Proyecto de E-Commerce que incluye una vista de cliente con carrito de compras y un panel de administración para gestionar el inventario mediante un CRUD completo.

Construido con un stack moderno de React y herramientas de última generación para garantizar un alto rendimiento y escalabilidad.

## 🚀 Tecnologías Principales

- **Frontend:** React 19, Vite, TailwindCSS 4, React Router 7
- **Gestión de Estado (Cliente):** Zustand 5 (con persistencia)
- **Gestión de Estado (Servidor):** TanStack Query 5 (React Query)
- **Formularios:** React Hook Form + Zod
- **Backend Mock:** JSON Server (v1.0.0-beta)

---

## 💻 Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local.

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

2. Clonar el repositorio o descargar el código fuente desde https://github.com/davidangelesm/DevDatepPruebaTecnica.

```bash
git clone https://github.com/davidangelesm/DevDatepPruebaTecnica
cd DevDatepPruebaTecnica
```

3. Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

---

## 🛠️ Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts definidos en el `package.json`:

- `npm run dev`: Inicia el servidor de desarrollo de Vite (Frontend).
- `npm run server`: Inicia el backend local (`json-server`) simulando una base de datos con el archivo `db.json` en el puerto 3000.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Previsualiza la build de producción localmente.
- `npm run lint`: Ejecuta ESLint para buscar errores en el código.

---

## ▶️ Cómo ejecutar el proyecto

Para que la aplicación funcione completamente, necesitas ejecutar tanto el backend (API) como el frontend de forma simultánea.

1. **Inicia la API (Backend):**
   Abre una terminal y ejecuta:

   ```bash
   npm run server
   ```

   _(La API correrá en `http://localhost:3000`)_

2. **Inicia la aplicación (Frontend):**
   Abre una **segunda** terminal paralela en la misma carpeta y ejecuta:
   ```bash
   npm run dev
   ```
   _(Vite te proporcionará una URL local `http://localhost:5173`)_

---

## 🏗️ Arquitectura

El código está organizado por funcionalidades bajo el principio de separación de responsabilidades:

- `/components`: Componentes reutilizables de la interfaz de usuario (Cards, Modals, Loaders, Headers).
- `/pages`: Vistas de nivel superior que actúan como contenedores (Home, AdminProductos, ProductForm, ProductDetails).
- `/routes`: Gestión del enrutador principal de la aplicación (`AppRouter.jsx`).
- `/hooks`: Hooks personalizados que abstraen la lógica de TanStack Query, separados inteligentemente en `useProductsQueries` (lecturas) y `useProductsMutations` (escrituras/cambios).
- `/services`: Configuración de Axios (`api.js`) y centralización de todas las llamadas HTTP.
- `/schemas`: Esquemas de validación estricta utilizando Zod (ej. `productSchema.js`).
- `/stores`: Gestión del estado global en el cliente utilizando Zustand (ej. `cartStore.js`).

---

## 🧠 Decisiones Técnicas

- **TanStack Query para mutaciones y caché:** Se decidió separar el estado del servidor del estado de la UI. Al hacer un POST, PUT o DELETE, se utiliza `queryClient.invalidateQueries` para refrescar los datos automáticamente sin necesidad de recargar la página o manejar estados locales complejos.
- **Zustand con Persistencia:** Para el carrito de compras, Zustand ofreció una alternativa más ligera que Redux. Se implementó el middleware `persist` para guardar el carrito en `localStorage`, garantizando que el usuario no pierda sus productos al refrescar la página.
- **React Hook Form + Zod:** Se eligió esta combinación para el formulario de productos (reutilizado tanto para Crear como para Editar). Permite validaciones estrictas y previene re-renderizados innecesarios del componente al escribir en los inputs.
- **Manejo de asincronía en navegación:** Se utilizó `mutateAsync` junto a `react-hot-toast` para garantizar que las notificaciones de éxito se rendericen correctamente antes o durante las redirecciones del administrador.

---

## 🔌 Funcionamiento de la API

La aplicación utiliza `json-server` (versión 1 beta) para simular una API RESTful, configurada con un retraso intencional para poder apreciar los estados de carga (skeletons y spinners) de la UI.

**Base URL:** `http://localhost:3000`

### Endpoints principales:

- **GET `/products`**: Lista los productos.
  - _Soporta Paginación:_ `_page=1` & `_per_page=8`. (Devuelve el array en `data` y el número de páginas en `pages`).
  - _Soporta Filtros:_ `category=NombreCategoria`.
  - _Soporta Búsqueda:_ `name_contains=Texto`.
- **GET `/products/:id`**: Devuelve los detalles de un producto específico.
- **POST `/products`**: Crea un nuevo producto (requiere el payload en JSON).
- **PUT `/products/:id`**: Actualiza un producto existente en su totalidad.
- **DELETE `/products/:id`**: Elimina un producto de la base de datos simulada.
- **GET `/categories`**: Devuelve la lista de categorías disponibles para alimentar los filtros y formularios.
