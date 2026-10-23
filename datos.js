// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const pastelDelDia = {
  nombre: "Pastel del día",
  precio: 40,
  categoria: "pasteles",
  stock: 40,
  disponible: true,
};

console.log(pastelDelDia.nombre);

const propiedad = "precio";
console.log(pastelDelDia[propiedad]);

pastelDelDia.stock = 35;
pastelDelDia.integral = false;
delete pastelDelDia.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = pastelDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

const pastelDeAyer = { ...pastelDelDia, precio: 30, nombre: "Pastel de ayer" };
console.log(pastelDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "Pastel de vainilla",  precio: 45, categoria: "pasteles", stock: 40, disponible: true,
    imagen: "imagen3.jpg", descripcion: "Por unidad." },
  { nombre: "Pastel de chocolate", precio: 55, categoria: "pasteles", stock: 25, disponible: true,
    imagen: "pastel2.jpg", descripcion: "Pastel para las tardes." },
  { nombre: "Pastel de avena",     precio: 45, categoria: "pasteles", stock: 8,  disponible: true,
    imagen: "pastel1.jpg", descripcion: "Por unidad." },
  { nombre: "Masitas",             precio: 35, categoria: "salados",  stock: 0,  disponible: false,
    imagen: "masitas.jpg", descripcion: "Por porción." },
  { nombre: "Alfajores",           precio: 10, categoria: "salados",  stock: 30, disponible: true,
    imagen: "alfajores.jpg", descripcion: "Por unidad." },
  { nombre: "Bizcochos",           precio: 45.50, categoria: "dulces",   stock: 2,  disponible: true,
    imagen: "bizcochos.jpg", descripcion: "Por unidad." },
  { nombre: "Galletas",            precio: 35, categoria: "dulces",   stock: 50, disponible: true,
    imagen: "galletas.jpg", descripcion: "Por porción." },
  { nombre: "Queques",             precio: 1.0, categoria: "dulces",  stock: 0,  disponible: false,
    imagen: "queque.jpg", descripcion: "Por unidad." },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 40);
console.log(caro);

console.log(nombres.includes("Alfajores"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalDulcesEnStock = productos
  .filter(p => p.categoria === "dulces" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Dulces en stock: Bs", totalDulcesEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const biscocho = new Producto("Biscocho", 45, 50);
console.log(biscocho.nombre, biscocho.estaDisponible(), biscocho.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const galletas = new ProductoConDescuento("Galletas", 1.0, 20, 5);
console.log(galletas.precioFinal(),galletas .estaDisponible());
