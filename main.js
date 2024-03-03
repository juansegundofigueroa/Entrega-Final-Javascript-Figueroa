const PRODUCTOS = [
    {id:1,
    nombre:`Cupcake`,
    descripcion:`masa de chocolate o vainilla con crema en la parte superior`,
    precio:625,
    imagen:`./Productos/cupcakes.jpg`,
    miniatura: `./Miniaturas/Cupcakes.jpg`
},
    
    {id:2,
    nombre:`Tarta de moras`,
    descripcion:`masa de chocolate glaseada con moras en la parte superior`,
    precio:1275,
    imagen:`./Productos/Tarta de moras.jpg`,
    miniatura: `./Miniaturas/Tarta de moras.jpg`
},
    
    {id:3,
    nombre:`Rosquillas`,
    descripcion:`masa de vainilla frita glaseada con distintos sabores`,
    precio:120,
    imagen:`./Productos/roscas.jpg`,
    miniatura: `./Miniaturas/roscas.jpg`
},
    
    {id:4,
    nombre:`Roll de Canela`,
    descripcion:`masa con sabor a canela,glaseada y decorada con distintos toppings`,
    precio:250,
    imagen:`./Productos/rollos de canela.jpg`,
    miniatura: `./Miniaturas/rollos de canela.jpg`
},
    
    {id:5,
    nombre:`Pan`,
    descripcion:`clasico de harina refinada o integral`,
    precio:600,
    imagen:`./Productos/pan.jpg`,
    miniatura: `./Miniaturas/pan.jpg`
},
    
    {id:6,
    nombre:`Macarons`,
    descripcion:`masa fina de distintos sabores y rellenos`,
    precio:550,
    imagen:`./Productos/macarons.jpg`,
    miniatura: `./Miniaturas/macarons.jpg`
},
    
    {id:7,
    nombre:`"Libritos"`,
    descripcion:`masa ojaldrada,fritos y de grasa`,
    precio:50,
    imagen:`./Productos/libritos.jpg`,
    miniatura: `./Miniaturas/libritos.jpg`
},
    
    {id:8,
    nombre:`Cookies`,
    descripcion:`distintos sabores y masas de chocolate o vainilla,todas glasedas`,
    precio:150,
    imagen:`./Productos/galletas.jpg`,
    miniatura: `./Miniaturas/galletas.jpg`
}
]
// funciones
const elementosCarrito = JSON.parse(localStorage.getItem('carrito'))||[];
const contenedorProductos = document.getElementById("contenedorDeProductos");
const contenedorCarrito = document.getElementById('AgregadosAlCarrito');
const totalPrecio = document.getElementById('total');

function agregarCards(){
    PRODUCTOS.forEach(PRODUCTO =>{
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                            <h2>${PRODUCTO.nombre}</h2>
                            <img src="${PRODUCTO.imagen}" alt="${PRODUCTO.nombre}">
                            <p>${PRODUCTO.descripcion}</p>
                            <p>Precio por Unidad: $${PRODUCTO.precio}</p>
                            <button class="btn" data-id="${PRODUCTO.id}">Agregar</button>
                            `
    contenedorProductos.appendChild(card);
    })
}

function agregarAlCarrito(idPRODUCTO){
    const item = elementosCarrito.find(item => item.id === idPRODUCTO);
    if(item){
        item.cantidad++
    }else{
        const producto = PRODUCTOS.find(p => p.id === idPRODUCTO);
        if(producto){
            elementosCarrito.push({...producto, cantidad:1});
        }
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
            p.textContent = `${item.nombre} x ${item.cantidad}
            $${item.precio * item.cantidad}`
            const btnEliminar = document.createElement('button');
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
    alert(`El total de su compra es de $${totalPrecio.textContent}`);
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

agregarCards(PRODUCTOS);
