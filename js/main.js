let carrito
const carritoLS = JSON.parse(localStorage.getItem('carrito'))
let carritoHTML = document.querySelector('#carrito')

const precioTotal = document.querySelector('#precioTotal')
const precioFinal = document.querySelector('#precioFinal')

const btnVaciar = document.querySelector('#btn-vaciar')
btnVaciar.addEventListener('click', resetearCarrito)

function renderizarProctuctos () {

    let tienda = document.getElementById('tienda')

    productos.forEach((prod) => {
        
        let productoHTML = `
            <div class="col-12 col-md-4 mb-5 d-flex justify-content-center productos">
            <div class="card text-dark productos-card" style="width: 18rem;">
            <img class="card-img-top productos-img" src="${prod.img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"> ${prod.nombre} </h5>
                    <p class="card-price">$${prod.precio}</p>
                    <button class="agregarCarrito" onClick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
                </div>
            </div>
            </div>
        `
        
        tienda.innerHTML += productoHTML
    });
}

renderizarProctuctos();

function agregarAlCarrito(id) {

    let producto = productos.find(producto => producto.id == id);

    let productoEnCarrito = carrito.find(producto => producto.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    toastAgregado(producto)
    renderizarCarrito()
}

function renderizarCarrito() {
    let carritoHTML = document.getElementById('carrito')

    html = ''; 

    carrito.forEach((producto, id) => {
        html += `
            <div class="col-md-12 productoEnCarrito">  
                <img src="${producto.img}"</img>
                <h6>${producto.nombre}</h6>
                <p>$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button class="btn-eliminar" onClick="eliminarDelCarrito(${id})">Eliminar</button>
                <button class="btn-mas" onClick="aumentarLaCantidad(${id})">+</button>
                <button class="btn-menos" onClick="bajarLaCantidad(${id})"> - </button>
            </div>
        `
    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    carritoHTML.innerHTML = html

    calcularTotal()
}

function eliminarDelCarrito(id) {

    let eliminar = carrito[id]

    if (eliminar) {
        carrito.splice(id, 1)
    }   
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    
    renderizarCarrito()
    toastEliminado(eliminar)
}

function resetearCarrito() {
    carrito.length = 0

    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderizarCarrito()
    toastVaciarCarrito()
}

function aumentarLaCantidad(id) {
    
    let aumentar = carrito[id]

    if (aumentar) {
        aumentar.cantidad++;
    } 

    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderizarCarrito()
    toastAgregado(carrito[id])
}

function bajarLaCantidad(id) {
    carrito[id].cantidad--;

    if (carrito[id].cantidad == 0) {
        carrito.splice(id, 1)
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderizarCarrito()
    toastEliminado(carrito[id])
}

function calcularTotal() {
    let total = 0;

    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    precioTotal.innerHTML = total
}

function toastAgregado(producto) {
    Toastify({
        avatar: `${producto.img}`,
        text: `CD "${producto.nombre}" en carrito!`,     
        duration: 2000,
        gravity: 'bottom',
        style: {
            background: '#00091b',
            color: 'white',
        }
    }).showToast();
}

function toastEliminado(producto) {
    Toastify({
        avatar: `${producto.img}`,
        text: `CD "${producto.nombre}" se elimino del carrito!`,     
        duration: 2000,
        gravity: 'bottom',
        style: {
            background: '#00091b',
            color: 'white',
        }
    }).showToast();
}

function toastVaciarCarrito() {
    Toastify({
        text: 'Se vació el carrito correctamente',     
        duration: 2000,
        gravity: 'bottom',
        style: {
            background: '#00091b',
            color: 'white',
        }
    }).showToast();
}

if (carritoLS) {
    carrito = carritoLS
} else {
    carrito = []
}

