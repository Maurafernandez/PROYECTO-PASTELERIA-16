# MEMORIA TÉCNICA DEL PROYECTO
## Pastelería "16 de Agosto"

---

### Datos Generales
- **Proyecto:** Sitio Web Comercial e Interactivo de la Pastelería 16 de Agosto
- **Estudiante:** Maura Mamani Fernandez
- **Cliente:** Karen (Propietaria)
- **Ubicación:** Plaza principal de Colquencha (Av. Samuel 002)
- **Fecha:** Octubre de 2026
- **Tecnologías:** HTML5 Semántico, CSS3 (Flexbox, Grid, Variables), JavaScript (ES6+), jQuery (v3.7.1)

---

## 1. Resumen Ejecutivo
La **Pastelería 16 de Agosto** es un emprendimiento local ubicado en el municipio de Colquencha. A pesar de contar con productos artesanales de alta demanda como pasteles, alfajores, galletas y bizcochos, presentaba dificultades para difundir su catálogo, informar los precios y horarios de atención actualizados, y canalizar los pedidos de forma ordenada.

Este proyecto web resuelve dicha necesidad mediante una plataforma web completa, rápida, accesible y responsive. La aplicación permite a los clientes:
1. Consultar el catálogo de productos con fotos reales, descripción, precios oficiales y disponibilidad de stock en tiempo real.
2. Filtrar por categorías (Pasteles, Dulces, Salados) y buscar productos al instante por nombre.
3. Hacer clic en cualquier producto para seleccionarlo de forma automática y tramitar el encargo mediante un formulario validado que previene recargas innecesarias de la página.
4. Revisar la tabla de horarios de atención y la lista de precios oficiales.

---

## 2. Arquitectura de Archivos y Módulos

El proyecto está organizado de manera modular, separando la estructura, la presentación, los datos y la lógica funcional e interactiva:

| Archivo | Rol / Responsabilidad |
| :--- | :--- |
| `index.html` | Estructura semántica completa (encabezado, navegación, catálogo, horarios, formulario de pedidos y pie). |
| `estilos.css` | Sistema de diseño: variables CSS, reset, tipografía, modelo de caja, Flexbox, CSS Grid y estilos interactivos. |
| `app.js` | Inicialización de variables de entorno, constantes de marca, tipos de datos y aviso de stock inicial. |
| `datos.js` | Catálogo de productos (arreglos de objetos), destructuring, métodos funcionales de arreglos (`map`, `filter`, `reduce`), y definición de clases con herencia. |
| `funciones.js` | Funciones de cálculo comercial (totales, descuentos, impuestos), closures y funciones de orden superior. |
| `render.js` | Generación y renderizado dinámico de tarjetas (`article.tarjeta`) en el DOM a partir de los datos. |
| `eventos.js` | Manejo de eventos nativos: filtrado por botones, buscador en tiempo real (`input`), y validación del formulario con `FormData`. |
| `jquery-comparado.js` | Implementación de jQuery v3.7.1 aplicada al proyecto (smooth scroll, auto-selección al clic, animaciones fade/slide, y métodos de utilidad `$.each`, `$.grep`, `$.map`). |

---

## 3. Desarrollo Técnico por Etapas

### Etapa 1: Estructura HTML5 y Maquetación CSS
- **HTML Semántico:** Uso riguroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>` (con `<caption>`, `<thead>`, `<tbody>`, `<th>`), `<aside>` y `<footer>`.
- **Formularios Accesibles:** Agrupación con `<fieldset>` y `<legend>`, vinculación estricta de `<label for="...">` con `<input id="...">`, atributos `required`, expresiones regulares para teléfonos bolivianos (`pattern="[0-9]{7,8}"`) y control de fechas.
- **Diseño Visual y Accesibilidad:**
  - Definición de tokens en `:root` (`--color-principal: #7a3f08`, `--color-acento: #d31463`, `--color-fondo: #e6a00ba1`, `--borde: #27b68b`).
  - Corrección de contraste: se ajustó el color principal sobre fondo naranja para cumplir con la norma de legibilidad WCAG (ratio superior a 4.5:1).
  - Distribución moderna con **Flexbox** en navegación y controles, y **CSS Grid** (`grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr))`) para que las tarjetas de productos se adapten a cualquier dispositivo móvil o de escritorio.

---

### Etapa 2: JavaScript Moderno (Lógica del Negocio y DOM)

1. **Catálogo de Datos (`datos.js`):**
   - Estructuración de 8 productos con propiedades esenciales: `nombre`, `precio`, `categoria`, `stock`, `disponible`, `imagen` y `descripcion`.
   - Programación Orientada a Objetos: clases `Producto` y subclase `ProductoConDescuento` con métodos `estaDisponible()`, `valorEnStock()` y `precioFinal()`.
   - Métodos funcionales: uso de `.filter()` para stock disponible, `.map()` para nombres, `.reduce()` para cálculo de valor total de inventario y `.sort()` para ordenación por precio.

2. **Renderizado Dinámico (`render.js`):**
   - Eliminación de productos estáticos escritos a mano en el HTML.
   - Creación de la función `crearTarjeta(producto)` que genera nodos `<article class="tarjeta">` con imagen, nombre, precio formateado a dos decimales (`toFixed(2)`), indicador de stock o clase `.agotado`.
   - Función `render(lista)` que limpia el contenedor (`#lista-productos`) y dibuja solo los elementos requeridos.

3. **Interactividad y Eventos (`eventos.js`):**
   - **Buscador en Vivo:** Escucha el evento `input` en el campo `#buscador` para actualizar la vista mientras el usuario escribe.
   - **Filtros por Categoría:** Delegación de eventos en el contenedor `#filtros` para activar botones (`todos`, `pasteles`, `salados`, `dulces`).
   - **Envío de Pedidos:** Intercepción con `event.preventDefault()`, validación de que la fecha de entrega no sea anterior al día actual mediante `setCustomValidity`, lectura con `new FormData(formulario)` y mensaje de confirmación inmediato.

---

### Etapa 3: Integración de la Librería jQuery

En lugar de botones aislados de prueba, la librería **jQuery 3.7.1** se integró para potenciar la experiencia de usuario directamente sobre el sitio de la pastelería:

1. **Carga y Espera al DOM:** Inicialización mediante `$(function () { ... })` garantizando que todo el árbol HTML esté construido antes de ejecutar la lógica.
2. **Interactividad en las Tarjetas:** Al hacer clic en cualquier tarjeta del catálogo:
   - Se destaca con la clase `.destacado`.
   - Se selecciona automáticamente el producto en el campo `<select id="producto">` del pedido.
   - Se ejecuta un desplazamiento suave (`animate({ scrollTop })`) hasta la sección del formulario.
3. **Smooth Scroll en la Navegación:** Los enlaces del menú (`#productos`, `#horarios`, `#contacto`) realizan transiciones fluidas hacia sus secciones.
4. **Efectos Visuales Suaves:** 
   - El catálogo se transiciona con `.hide().fadeIn(350)` al cambiar filtros.
   - El aviso de stock se introduce con `.fadeIn(800)`.
   - La tabla de horarios resalta sus filas con `.hover()`.
   - El mensaje de confirmación de pedido se despliega con `.slideDown(400)`.
5. **Utilidades de Datos en Consola:** Uso de `$.each()` para recorrer colecciones, `$.grep()` para filtrado y `$.map()` para proyectar datos.

---

## 4. Tabla de Precios y Catálogo Sincronizado

Se corrigieron las discrepancias existentes entre la tabla física de horarios y el inventario dinámico:

| Producto | Categoría | Precio Oficial | Estado / Disponibilidad |
| :--- | :--- | :--- | :--- |
| **Pastel de vainilla** | Pasteles | Bs 45.00 | Disponible (40 en stock) |
| **Pastel de chocolate** | Pasteles | Bs 55.00 | Disponible (25 en stock) |
| **Pastel de avena** | Pasteles | Bs 45.00 | Disponible (8 en stock) |
| **Masitas** | Salados | Bs 35.00 | Agotado (0 en stock) |
| **Alfajores** | Salados | Bs 10.00 | Disponible (30 en stock) |
| **Bizcochos** | Dulces | Bs 45.50 | Disponible (2 en stock) |
| **Galletas** | Dulces | Bs 35.00 | Disponible (50 en stock) |
| **Queques** | Dulces | Bs 1.00 | Agotado (0 en stock) |

---

## 5. Depuración y Errores Corregidos

1. **Etiquetas y Estructura HTML:**
   - Corrección de etiquetas mal cerradas (`<h1>` y `<h3>` se abrían dos veces).
   - Corrección de etiquetas `<img>` que tenían atributos anidados incorrectos.
   - Reparación de la tabla de horarios (cerraba con `</body>` en vez de `</tbody>` y carecía de cierres `</tr>`).
   - Corrección de ortografía en el catálogo: de `Alfabores` a `Alfajores`, `Pastel ` a `Pastel de vainilla`.
2. **Contraste de Color:**
   - Reparación del error de sintaxis en CSS (`s#e29a3c` &rarr; `#7a3f08`) y ajuste para garantizar lectura cómoda sin fatiga visual.
3. **Manejo de Errores en JavaScript y jQuery:**
   - Eliminación de errores de ejecución por llamadas a `document.querySelector` nulos.
   - Retiro de botones artificiales de prueba (`#boton-vanilla`, `#boton-jquery`) para integrar jQuery directamente sobre los componentes productivos de la web.
   - Enlace correcto del script CDN de jQuery antes de los módulos que lo consumen.

---

## 6. Conclusiones
El proyecto de la **Pastelería 16 de Agosto** ha alcanzado un estándar profesional de desarrollo frontend. La combinación de Vanilla JS para la arquitectura de datos y renderizado dinámico, junto con jQuery para animaciones, efectos y navegación interactiva, logra una plataforma robusta, veloz y atractiva para los clientes de Colquencha.

---

## 7. Control de Versiones y Despliegue (Git)

El proyecto utiliza Git para el seguimiento de versiones y control de cambios en el repositorio local y remoto:

- **Rama principal:** `main`
- **Último Commit:**
  - **Mensaje:** `feat: integración de jQuery al proyecto, sincronización de catálogo y memoria técnica`
  - **Archivos incluidos:**
    - `index.html`: Inclusión de jQuery CDN, retiro de botones de prueba y corrección de tabla.
    - `estilos.css`: Clases interactivas (`.tarjeta-interactiva`, `.destacado`) para componentes reales.
    - `datos.js`: Sincronización de precios oficiales del catálogo con la tabla física.
    - `jquery-comparado.js`: Funciones de jQuery aplicadas al proyecto (scroll suave, auto-selección de pedido, efectos visuales y utilidades `$.each`, `$.grep`, `$.map`).
    - `README.md`: Documentación del laboratorio de jQuery.
    - `MEMORIA.md`: Memoria técnica completa del proyecto.

### Instrucciones para sincronizar con GitHub:
Para publicar los cambios en el repositorio remoto:
```bash
git push origin main
```
