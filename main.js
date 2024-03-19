const elementosCarrito = JSON.parse(localStorage.getItem('carrito'))||[];
const contenedorProductos = document.getElementById("contenedorDeProductos");
const contenedorCarrito = document.getElementById('AgregadosAlCarrito');
const totalPrecio = document.getElementById('total');
const ordenamientoSelect = document.getElementById("ordenamiento");
const resetButton = document.getElementById("resetFiltro");
const url = "./Productos.json";
let PRODUCTOS = [];

fetch(url)
    .then(Response => Response.json())
    .then((datos)=>{
        console.log(datos)
        PRODUCTOS = datos;
        agregarCards(datos)
    })
    .catch(error => console.log(error))
    .finally(()=> console.log("proceso finalizado"))

function agregarCards(productos = PRODUCTOS){
    contenedorProductos.innerHTML = "";
    productos.forEach(PRODUCTO =>{
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                            <h2>${PRODUCTO.nombre}</h2>
                            <img src="${PRODUCTO.imagen}" alt="${PRODUCTO.nombre}" class="img-fluid"">
                            <p>${PRODUCTO.descripcion}</p>
                            <p>Precio por Unidad: $${PRODUCTO.precio}</p>
                            <button class="btn" data-id="${PRODUCTO.id}">Agregar</button>
                            `
    contenedorProductos.appendChild(card);
    })
}

function ordenarProductos(orden) {
    const productosOrdenados = [...PRODUCTOS];
    if (orden === 'ascendente') {
        productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'descendente') {
        productosOrdenados.sort((a, b) => b.precio - a.precio);
    }
    return productosOrdenados;
}

ordenamientoSelect.addEventListener('change', (event) => {
    const orden = event.target.value;
    const productosOrdenados = ordenarProductos(orden);
    agregarCards(productosOrdenados);
});
function resetearFiltro() {
    agregarCards();
    ordenamientoSelect.selectedIndex = 0;
}
resetButton.addEventListener('click', resetearFiltro);



function agregarAlCarrito(idPRODUCTO){
    const item = elementosCarrito.find(item => item.id === idPRODUCTO);
    if(item){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 690,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
            });
            Toast.fire({
            icon: "success",
            title: "Agregado al carrito"
            });
        item.cantidad++;
    }else{
        const producto = PRODUCTOS.find(p => p.id === idPRODUCTO);
        if(producto){
            elementosCarrito.push({...producto, cantidad:1});
        }
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 690,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
            });
            Toast.fire({
            icon: "success",
            title: "Agregado al carrito"
            });
    }
    guardarCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(idProducto){
    const indice = elementosCarrito.findIndex(item => item.id === idProducto);
    if(indice !== -1){
        elementosCarrito.splice(indice, 1);
        guardarCarrito();
        renderizarCarrito();
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = '';
    let precioTotal = 0;
    elementosCarrito.forEach(item =>{
        const div = document.createElement('div');
        const p = document.createElement('p');
        const img = document.createElement('img');
            img.src = `${item.miniatura}`;
            div.classList.add('itemDeLaLista');
            p.classList.add('textoIntro');
            p.textContent = `${item.nombre} x ${item.cantidad}
            $${item.precio * item.cantidad}`
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn');
            btnEliminar.classList.add('textoIntro');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.id))
            contenedorCarrito.appendChild(div);
            div.appendChild(img);
            div.appendChild(p);
            div.appendChild(btnEliminar);
            precioTotal += item.precio * item.cantidad;
    })
    totalPrecio.textContent = precioTotal;
}

renderizarCarrito();

function realizarCompra(){
    const { value: email } = Swal.fire({
        title: `Total $${totalPrecio.textContent}`,
        input: "email",
        inputLabel: "Ingrese un correo,se enviará un link de pago y la factura",
        inputPlaceholder: "Ej:correo@gmail.com"
        });
        if (email) {
        Swal.fire(`Email ingresado: ${email}`);
        }
    elementosCarrito.length = 0;
    renderizarCarrito();
}

document.getElementById('btndecomprar').addEventListener('click', realizarCompra);

contenedorProductos.addEventListener('click',function(evento){
    if(evento.target.classList.contains('btn')){
        const idProducto = parseInt(evento.target.getAttribute('data-id'));
        agregarAlCarrito(idProducto);
    }
});
const toggleCarritoButton = document.getElementById("toggleCarrito");
const carrito = document.getElementById("carritoContenedor");

toggleCarritoButton.addEventListener("click", () => {
    carrito.classList.toggle("carrito-visible");
});


const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

let index = 1;
let interval = setInterval(() => {
    index++;
    if (index === slide.length) {
        index = 0;
    }
    slides.style.transform = `translateX(${-index * 100}%)`;
}, 4000);
