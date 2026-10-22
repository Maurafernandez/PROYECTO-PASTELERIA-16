// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Pastelería 16 de Agosto";
const anioFundacion = 2023;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let pastelDeChocolate = 8;
pastelDeChocolate = 4;

// ── 3. TIPOS ────────────────────────────────────────────────────────────
const precioPastel = 45;
const abiertoHoy = true;
const promocionDelDia = null;
let telefono;

console.log("tipos:", typeof negocio, typeof precioPastel, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefono);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${pastelDeChocolate} pasteles de chocolate.`;
console.log(resumen);

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("45" == precioPastel);
console.log("45" === precioPastel);

// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
const subtitulo = document.querySelector("#aviso-stock");
subtitulo.textContent = `Hoy quedan ${pastelDeChocolate} pasteles de chocolate.`;

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────
