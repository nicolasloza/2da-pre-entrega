let productos

let carrito
const carritoLS = JSON.parse(localStorage.getItem('carrito'))
let carritoHTML = document.querySelector('#carrito')

const precioTotal = document.querySelector('#precioTotal')
const precioFinal = document.querySelector('#precioFinal')

const openModal = document.querySelector('#open-modal');
const openFinalizar = document.querySelector('#open-finalizar');

openModal.addEventListener('click', () => {
    renderizarCarrito();
    modalContainer.classList.add('modal-container-visible')
})

openFinalizar.addEventListener('click', () => {
    renderizarCarrito(true);
    modalFinalizar.classList.add('finalizar-container-visible')
    modalContainer.classList.remove('modal-container-visible')
})

const btnVaciar = document.querySelector('#btn-vaciar')
btnVaciar.addEventListener('click', resetearCarrito)

fetchProducts();

// const productos = await fetchProducts();
// renderizarProductos(productos);

if (carritoLS) {
    carrito = carritoLS
} else {
    carrito = []
}

/* ---- METHODS ---- */

function fetchProducts () {
    return fetch('https://mocki.io/v1/8cdf0099-1b3f-40d1-a359-ef711c6e0061')
        .then((res) => {
            const response = res.json();
            return response;
        })
        .then((results) => {
            productos = results;
            renderizarProductos(results);
        })
        .catch(err => console.log('No se pudo cargar la información sobre los productos'));
}

// async function fetchProducts () {
//     try {
//         const response = await fetch('https://mocki.io/v1/8cdf0099-1b3f-40d1-a359-ef711c6e0061');
//         const images = await response.json();
//         console.log('RESULTADO', images);
//         return images;
//     } catch (e) {
//         console.log('err', e.message)
//     }
// }

function renderizarProductos (productos) {

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

function renderizarCarrito(isFinal = false) {
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

    calcularTotal(isFinal);
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

function calcularTotal(isFinal = false) {
    let total = 0;

    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    if (isFinal) {
        precioFinal.innerHTML = total
    } else {
        precioTotal.innerHTML = total
    }
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

