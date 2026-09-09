const textarea = document.getElementById('biografiaMedico');
const contador = document.getElementById('contador');

if (textarea && contador) {
    textarea.addEventListener('input', function () {
        contador.textContent = `${textarea.value.length}/200 caracteres`;
        if (textarea.value.length === 200) {
            contador.style.fontWeight = "bold";
        } else {
            contador.style.fontWeight = "normal";
        }
    });
}

// const hoy = new Date().toISOString().split('T')[0];

// document.getElementById('fecha').min = hoy;

function convertirAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

  return horas * 60 + minutos;
}

function validarHoras(inicio, fin, errorElement, mensaje) {
    const inicioMinutos = convertirAMinutos(inicio.value) 
    const finMinutos = convertirAMinutos(fin.value)
    if (inicioMinutos >= finMinutos) {
        estilizarCampoError(inicio);
        estilizarCampoError(fin);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(inicio)
        quitarEstiloCampoError(fin)
        errorElement.textContent = '';
        return true;
    }
}

function validarFecha(campo, campoHora, campoFinHora, errorElement, mensaje) {
    if (campo.value === '') {
        estilizarCampoError(campo);
        errorElement.textContent = 'La fecha de la cita es obligatoria';
        campoHora.disabled = true;
        campoFinHora.disabled = true;
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(`${campo.value}T00:00:00`);

    if (fechaSeleccionada < hoy) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        campoHora.disabled = true;
        campoFinHora.disabled=true;
        return false;
    } else {
        quitarEstiloCampoError(campo);
        errorElement.textContent = '';
        campoHora.disabled = false;
        campoFinHora.disabled = false;
        return true;
    }
}

function validarAtencionCita(fecha, hora, errorElement, mensaje) {
    
    const fechaHoraCita = new Date(`${fecha.value}T${hora.value}`);

    const ahora = new Date();
    const minimo = new Date(ahora.getTime() + 3 * 60 * 60 * 1000);

    if (fechaHoraCita < minimo) {
        estilizarCampoError(hora);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(hora);
        errorElement.textContent = '';
        return true;
    }
}

function validarCampoObligatorio(campo, errorElement, mensaje) {

    if (campo.value.trim() === '') {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement,mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/;

    if (!correoRegex.test(campo.value)) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    let errorElementParent = errorElement.parentElement;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        estilizarCampoError(errorElementParent);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(errorElementParent)
        errorElement.textContent = '';
        return true;
    }
}

function validarNumericos(campo, errorElement, min, max, mensaje) {
    if (campo.value < min || campo.value > max) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo);
        errorElement.textContent = '';
        return true;
    }
}

function estilizarCampoError(campo) {
    campo.classList.add("campo-error");
}

function quitarEstiloCampoError(campo) {
    campo.classList.remove("campo-error");
}

function validarFormularioUsuario() {

    const inputNombresUsuario = document.getElementById('nombresUsuario');
    const inputApellidosUsuario = document.getElementById('apellidosUsuario');
    const inputGenero = document.getElementsByName('generoUsuario');
    const inputEdadUsuario = document.getElementById('edadUsuario');
    const inputEmailUsuario = document.getElementById('emailUsuario');

    const labelErrorNombresUsuario = document.getElementById('errorNombresUsuario');
    const labelErrorApellidosUsuario = document.getElementById('errorApellidosUsuario');
    const labelErrorGenero = document.getElementById('errorGeneroUsuario');
    const labelErrorEdadUsuario = document.getElementById('errorEdadUsuario');
    const labelErrorEmailUsuario = document.getElementById('errorEmailUsuario');

    const nombresUsuarioValidos = validarCampoObligatorio(inputNombresUsuario, labelErrorNombresUsuario, "El campo nombres es obligatorio") && validarLongitud(inputNombresUsuario, labelErrorNombresUsuario, 0, 20, "Longitud del nombre no válida");
    const apellidosUsuarioValidos = validarCampoObligatorio(inputApellidosUsuario, labelErrorApellidosUsuario, "Los apellidos son obligatorios") && validarLongitud(inputApellidosUsuario, labelErrorApellidosUsuario, 0, 20, "Longitud del apellido no válida");
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const edadValida = validarCampoObligatorio(inputEdadUsuario, labelErrorEdadUsuario, 'La edad es obligatoria') && validarNumericos(inputEdadUsuario, labelErrorEdadUsuario, 0, 200, "Valor no válido para la edad");
    const emailValido = validarCampoObligatorio(inputEmailUsuario, labelErrorEmailUsuario, "El correo electrónico es obligatorio") && validarCorreo(inputEmailUsuario, labelErrorEmailUsuario, "El correo no cumple con el formato esperado");
    

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (nombresUsuarioValidos && apellidosUsuarioValidos && generoValido && edadValida && emailValido) {
        // mostrarMensajeExito(); 
        // const formulario = document.getElementById('formMedico'); 
        // formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        // setTimeout(() => {
        //     formulario.reset();
        // }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposUsuarioAlCambiarFoco() {
    const inputNombresUsuario = document.getElementById('nombresUsuario');
    const inputApellidosUsuario = document.getElementById('apellidosUsuario');
    const inputGenero = document.getElementsByName('generoUsuario');
    const inputEdadUsuario = document.getElementById('edadUsuario');
    const inputEmailUsuario = document.getElementById('emailUsuario');

    const labelErrorNombresUsuario = document.getElementById('errorNombresUsuario');
    const labelErrorApellidosUsuario = document.getElementById('errorApellidosUsuario');
    const labelErrorGenero = document.getElementById('errorGeneroUsuario');
    const labelErrorEdadUsuario = document.getElementById('errorEdadUsuario');
    const labelErrorEmailUsuario = document.getElementById('errorEmailUsuario');

    inputNombresUsuario.addEventListener('blur',()=> validarCampoObligatorio(
        inputNombresUsuario,
        labelErrorNombresUsuario,
        "El nombre es obligatorio") && validarLongitud(inputNombresUsuario, labelErrorNombresUsuario, 0, 20, "Longitud del nombre no válida"));
        
    inputApellidosUsuario.addEventListener('blur', () => validarCampoObligatorio(inputApellidosUsuario, labelErrorApellidosUsuario, 'Los apellidos son obligatorios.') && validarLongitud(inputApellidosUsuario, labelErrorApellidosUsuario, 0, 20, "Longitud del apellido no válida"));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
    inputEdadUsuario.addEventListener('blur', () => validarCampoObligatorio(inputEdadUsuario, labelErrorEdadUsuario, 'La edad es obligatoria') && validarNumericos(inputEdadUsuario, labelErrorEdadUsuario, 0, 200, "Valor no válido para la edad"));
    inputEmailUsuario.addEventListener('blur', () => validarCampoObligatorio(inputEmailUsuario, labelErrorEmailUsuario, "El correo electrónico es obligatorio") && validarCorreo(inputEmailUsuario, labelErrorEmailUsuario, "El correo no cumple con el formato esperado"));
    
}

document.addEventListener('DOMContentLoaded', () => {
    validarCamposUsuarioAlCambiarFoco();
    document.getElementById('formUsuario').addEventListener('submit', (evento) => {
        evento.preventDefault();
        if (validarFormularioUsuario()) {
            mostrarNotificacion("Usuario registrado correctamente");
            evento.target.reset();
        }
    });
});