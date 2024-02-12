//productos
class PRODUCTO{
    constructor(id,nombre,descripcion,precio,imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const PRODUCTOS = [
    new PRODUCTO(1,`Cupcake`,`masa de chocolate o vainilla con crema en la parte superior`,625,`./Productos/cupcakes.jpg`),
    new PRODUCTO(2,`Tarta de moras`,`masa de chocolate glaseada con moras en la parte superior`,1275,`./Productos/Tarta de moras.jpg`),
    new PRODUCTO(3,`Rosquillas`,`masa de vainilla frita glaseada con distintos sabores`,120,`./Productos/roscas.jpg`),
    new PRODUCTO(4,`Roll de Canela`,`masa con sabor a canela,glaseada y decorada con distintos toppings`,250,`./Productos/rollos de canela.jpg`),
    new PRODUCTO(5,`Pan`,`clasico de harina refinada o integral`,600,`./Productos/pan.jpg`),
    new PRODUCTO(6,`Macarons`,`masa fina de distintos sabores y rellenos`,550,`./Productos/macarons.jpg`),
    new PRODUCTO(7,`"Libritos"`,`masa ojaldrada,fritos y de grasa`,50,`./Productos/libritos.jpg`),
    new PRODUCTO(8,`Cookies`,`distintos sabores y masas de chocolate o vainilla,todas glasedas`, 150, `./Productos/galletas.jpg`)
]
// funciones
const contenedorProductos = document.getElementById("contenedorDeProdcutos");
function agregarCards(PRODUCTOS){
    PRODUCTOS.forEach(PRODUCTO =>{
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                            <h2>${PRODUCTO.nombre}</h2>
                            <img src="${PRODUCTO.imagen}" alt="${PRODUCTO.nombre}">
                            <p>${PRODUCTO.descripcion}</p>
                            <p>Precio por Unidad: $${PRODUCTO.precio}</p>
                            <button>Agregar</button>
                            `
    contenedorDeProductos.appendChild(card);
    })
}
agregarCards(PRODUCTOS);
function ordenarAZ(){
    PRODUCTOS.sort(
        function(a,b){
        const nombreA = a.nombre.toLocaleLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
            return -1;}
            if(nombreA > nombreB) {
                return 1
                }
        return 0;
    }
    )
}
function ordenarZA(){
    PRODUCTOS.sort(
        function(a,b){
        const nombreA = a.nombre.toLocaleLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA > nombreB) {
            return -1;}
            if(nombreA < nombreB) {
                return 1
                }
        return 0;
    }
    )
}
function ordenarPorMayorPrecio(){
PRODUCTOS.sort(function(a,b){
    return b.precio - a.precio;
})
}
function ordenarPorMenorPrecio(){
    PRODUCTOS.sort(function(a,b){
        return a.precio - b.precio;
    })
}
function agregarAlCarrito(carrito, productoID, cantidad) {
    const producto = PRODUCTOS.find(item => item.id === productoID);
    if (producto) {
        if (carrito.hasOwnProperty(producto.nombre)) {
            carrito[producto.nombre].cantidad += cantidad;
            carrito[producto.nombre].precioTotal += cantidad * producto.precio;
        } else {
            carrito[producto.nombre] = {
                precio: producto.precio,
                cantidad: cantidad,
                precioTotal: cantidad * producto.precio
            };
        }
        console.log(`Se agregaron ${cantidad} ${producto.nombre}(s) al carrito.`);
    } else {
        console.log(`El producto con ID ${productoID} no fue encontrado.`);
    }
}
function quitarDelCarrito(carrito, productoID, cantidad) {
    const producto = PRODUCTOS.find(item => item.id === productoID);
    if (producto) {
        const nombreProducto = producto.nombre;
        if (carrito.hasOwnProperty(nombreProducto)) {
            if (cantidad >= carrito[nombreProducto].cantidad) {
                delete carrito[nombreProducto];
            } else {
                carrito[nombreProducto].cantidad -= cantidad;
                carrito[nombreProducto].precioTotal -= cantidad * carrito[nombreProducto].precio;
            }
            console.log(`Se eliminaron ${cantidad} ${nombreProducto}(s) del carrito.`);
        } else {
            console.log(`El producto ${nombreProducto} no está en el carrito.`);
        }
    } else {
        console.log(`El producto con ID ${productoID} no fue encontrado.`);
    }
}
function calcularPrecio(carrito) {
    let precioTotal = 0;
    for (const producto in carrito) {
        precioTotal += carrito[producto].precioTotal;
    }
    return precioTotal;
}
function calcularPrecioTotal(carrito) {
    let precioTotal = 0;
    for (const producto in carrito) {
        precioTotal += carrito[producto].precioTotal;
    }
    return precioTotal + precioTotal*0.21;
}

//ejecuciones

let carrito = {};
//carrito,numero de id,cantidada
agregarAlCarrito(carrito, 5, 2);
agregarAlCarrito(carrito, 3, 2);
agregarAlCarrito(carrito, 5, 3);
quitarDelCarrito(carrito, 5, 2);
const precio = calcularPrecio(carrito);
const precioTotal = calcularPrecioTotal(carrito);

console.log("Carrito actualizado:", carrito);
console.log("Precio a abonar",precio);
console.log("Precio con iva agregado",precioTotal);