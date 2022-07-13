const modalContainer = document.querySelector('#modal-body')
// const openModal = document.querySelector('#open-modal')
const closeModal = document.querySelector('#close-modal')

const modalFinalizar = document.querySelector('#modal-finalizar')
// const openFinalizar = document.querySelector('#open-finalizar')
const closeFinalizar = document.querySelector('#close-finalizar')

const formulario = document.querySelector('#my-form')
const inputNombre = document.querySelector('#input-nombre')
const inputDNI = document.querySelector('#input-dni')
const inputEmail = document.querySelector('#input-email')
const inputCelular = document.querySelector('#input-celular')
const inputDireccion = document.querySelector('#input-direccion')
const inputNumero = document.querySelector('#input-numero')
const inputCP = document.querySelector('#input-cp')
const inputProvincia = document.querySelector('#input-provincia')
const inputLocalidad = document.querySelector('#input-localidad')
const inputTarjeta = document.querySelector('#input-tarjeta')
const inputVencimiento = document.querySelector('#input-vencimiento')
const inputTitular = document.querySelector('#input-titular')
const inputSeguridad = document.querySelector('#input-seguridad')


const btnComprar = document.querySelector('#btn-enviar')


// openModal.addEventListener('click', () => {
//     localStorage.setItem('isFinal', false);
//     modalContainer.classList.add('modal-container-visible')
// })

closeModal.addEventListener('click', () => {
    isFinal = false
    modalContainer.classList.remove('modal-container-visible')
})

// openFinalizar.addEventListener('click', () => {
//     localStorage.setItem('isFinal', true);
//     modalFinalizar.classList.add('finalizar-container-visible')
//     modalContainer.classList.remove('modal-container-visible')
// })

closeFinalizar.addEventListener('click', () => {
    isFinal = false
    modalFinalizar.classList.remove('finalizar-container-visible')
    modalContainer.classList.add('modal-container-visible')
})

inputDNI.addEventListener('input', () => {
    if(inputDNI.value.length <= 6) {
        inputDNI.classList.add ('border-danger')
        inputDNI.classList.remove ('border-success')
    } else {
        inputDNI.classList.add('border-success')
        inputDNI.classList.remove('border-danger')
    }
})

inputCelular.addEventListener('input', () => {
    if(inputCelular.value.length <= 9) {
        inputCelular.classList.add ('border-danger')
        inputCelular.classList.remove ('border-success')
    } else {
        inputCelular.classList.add('border-success')
        inputCelular.classList.remove('border-danger')
    }
})

inputCP.addEventListener('input', () => {
    if(inputCP.value.length <= 3) {
        inputCP.classList.add ('border-danger')
        inputCP.classList.remove ('border-success')
    } else {
        inputCP.classList.add('border-success')
        inputCP.classList.remove('border-danger')
    }
})

inputTarjeta.addEventListener('input', () => {
    if(inputTarjeta.value.length <= 15) {
        inputTarjeta.classList.add ('border-danger')
        inputTarjeta.classList.remove ('border-success')
    } else {
        inputTarjeta.classList.add('border-success')
        inputTarjeta.classList.remove('border-danger')
    }
})

inputVencimiento.addEventListener('input', () => {
    if(inputVencimiento.value.length === 4) {
        inputVencimiento.classList.add('border-success')
        inputVencimiento.classList.remove('border-danger')
    } else {
        inputVencimiento.classList.add ('border-danger')
        inputVencimiento.classList.remove ('border-success')
    }
})

inputSeguridad.addEventListener('input', () => {
    
    if(inputSeguridad.value.length <= 2) {
        inputSeguridad.classList.add ('border-danger')
        inputSeguridad.classList.remove ('border-success')
    } else {
        inputSeguridad.classList.add('border-success')
        inputSeguridad.classList.remove('border-danger')
    }
})

btnComprar.addEventListener('click', () => {
    modalContainer.classList.remove('modal-container-visible')
    modalFinalizar.classList.remove('finalizar-container-visible')
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const userData = {
        nombre: inputNombre.value,
        dni: inputDNI.value,
        email: inputEmail.value,
        celular: inputCelular.value,
        direccion: inputDireccion.value,
        numero: inputNumero.value,
        codigoPostal: inputCP.value,
        provincia: inputProvincia.value,
        localidad: inputLocalidad.value,
    }
    
    Swal.fire({
        icon: 'success',
        background: '#00091b',
        color: 'white',
        title: '¡FELICITACIONES!',
        text: 'En las próximas 72hs. te llegará la compra a la dirección que registraste.',
        confirmButtonText: '¡Gracias, pastillero!',
        confirmButtonColor: 'rgb(2, 107, 2)',
        timer: 4000,
    })

    localStorage.setItem('userData', JSON.stringify(userData))
    console.log(userData)
})
