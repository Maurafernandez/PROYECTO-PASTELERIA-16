// ═══════════════════════════════════════════════════════════════════════════
// JQUERY APLICADO AL PROYECTO: PASTELERÍA 16 DE AGOSTO
// ═══════════════════════════════════════════════════════════════════════════

// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
if (typeof jQuery === "undefined") {
  console.error("jQuery no está cargado. Asegúrate de incluir la librería jQuery antes de este script.");
} else {
  console.log("jQuery versión instalada y activa:", $.fn.jquery);
}

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────
// Vanilla JS:
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo con Vanilla JS (DOMContentLoaded)");
});

// jQuery ($(document).ready o forma abreviada $(function)):
$(function () {
  console.log("DOM listo con jQuery. Inicializando interactividad de la pastelería...");

  // ── 3. SELECCIONAR ELEMENTOS DEL PROYECTO ─────────────────────────────
  // Vanilla JS:
  const tituloVanilla = document.querySelector("h1");
  const tarjetasVanilla = document.querySelectorAll(".tarjeta");

  // jQuery:
  const tituloJquery = $("h1");
  const tarjetasJquery = $(".tarjeta");

  console.log("Vanilla ve:", tituloVanilla ? tituloVanilla.textContent : "No encontrado");
  console.log("jQuery ve:", tituloJquery.text());
  console.log("Tarjetas con vanilla:", tarjetasVanilla.length);
  console.log("Tarjetas con jQuery:", tarjetasJquery.length);

  // ── 4. LEER Y ESCRIBIR CONTENIDO EN EL PROYECTO ───────────────────────
  // Animar la aparición del aviso de stock con jQuery
  $("#aviso-stock")
    .hide()
    .fadeIn(800);

  // ── 5. CLASES Y ESTILOS DINÁMICOS ─────────────────────────────────────
  // Vanilla JS:
  if (tituloVanilla) {
    tituloVanilla.classList.add("titulo-principal");
  }

  // jQuery: agregar clase interactiva a todas las tarjetas de una sola vez
  tarjetasJquery.addClass("tarjeta-interactiva");

  // ── 6. EVENTOS APLICADOS A LA PASTELERÍA ──────────────────────────────
  // A) Clic en tarjeta: selecciona el producto en el formulario y hace scroll suave
  $(".tarjeta").on("click", function () {
    const nombre = $(this).data("nombre") || $(this).find("h3").text().trim();

    // Resaltar tarjeta seleccionada
    $(".tarjeta").removeClass("destacado");
    $(this).addClass("destacado");

    // Seleccionar automáticamente el producto en el select del formulario
    $("#producto option").each(function () {
      const opcionTexto = $(this).text().toLowerCase();
      if (nombre.toLowerCase().includes(opcionTexto) || opcionTexto.includes(nombre.toLowerCase())) {
        $(this).prop("selected", true);
      }
    });

    // Desplazamiento suave con jQuery al formulario de pedidos
    $("html, body").animate({
      scrollTop: $("#pedido").offset().top - 15
    }, 500);
  });

  // B) Navegación suave (Smooth Scrolling) con jQuery en los enlaces del menú
  $("nav a").on("click", function (evento) {
    const destinoId = $(this).attr("href");
    if (destinoId && destinoId.startsWith("#")) {
      const seccionDestino = $(destinoId);
      if (seccionDestino.length) {
        evento.preventDefault();
        $("html, body").animate({
          scrollTop: seccionDestino.offset().top - 15
        }, 400);
      }
    }
  });

  // C) Efecto suave de transición al cambiar de categoría en los filtros
  $("#filtros button").on("click", function () {
    $("#lista-productos").hide().fadeIn(350);
  });

  // D) Resaltado dinámico al pasar el cursor sobre las filas de la tabla de precios
  $("table tbody tr").hover(
    function () {
      $(this).css("background-color", "rgba(226, 154, 60, 0.18)");
    },
    function () {
      $(this).css("background-color", "");
    }
  );

  // E) Efecto de animación al confirmar el pedido
  $("form").on("submit", function () {
    setTimeout(() => {
      $("#mensaje-pedido").hide().slideDown(400);
    }, 50);
  });

  // ── 7. CHAINING (ENCADENAMIENTO DE MÉTODOS) ───────────────────────────
  // Configurar atributos y estilos en cadena sobre el aviso de stock
  $("#aviso-stock")
    .css({
      "color": "var(--color-principal)",
      "font-weight": "600"
    })
    .attr("data-estado", "activo");

  // ── 8. RECORRER ELEMENTOS DEL DOM CON .each() ─────────────────────────
  $(".tarjeta").each(function (indice, elemento) {
    const nombre = $(elemento).data("nombre") || $(elemento).find("h3").text();
    console.log(`[jQuery .each] Tarjeta ${indice + 1}: ${nombre}`);
  });

  // ── 9. FUNCIONES DE JQUERY CON LOS DATOS (datos.js) ───────────────────
  if (typeof productos !== "undefined") {
    // $.each(): iteración sobre el catálogo
    console.log("── Recorrido de catálogo con $.each de jQuery ──");
    $.each(productos, function (i, prod) {
      if (i < 3) {
        console.log(`[$.each] ${prod.nombre} cuesta Bs ${prod.precio}`);
      }
    });

    // $.grep(): filtrado de productos disponibles
    const disponiblesJquery = $.grep(productos, function (prod) {
      return prod.disponible;
    });
    console.log(`[$.grep] ${disponiblesJquery.length} de ${productos.length} productos disponibles`);

    // $.map(): transformación del catálogo a lista de nombres
    const nombresJquery = $.map(productos, function (prod) {
      return prod.nombre;
    });
    console.log("[$.map] Nombres en catálogo:", nombresJquery);
  }
});
