let pantalla = document.getElementById('pantalla');
let operando = "";
let operacionActiva = "";
let resultado = 0;

// Agregar números a la pantalla
function agregarNumero(numero) {
    if (pantalla.innerText === "0") {
        pantalla.innerText = numero;
    } else {
        pantalla.innerText += numero;
    }
}

// Función para manejar las operaciones
function operacion(operador) {
    operando = pantalla.innerText;
    operacionActiva = operador;
    pantalla.innerText = "0";
}

// Función para agregar la coma (",")
function agregarComa() {
    if (!pantalla.innerText.includes(",")) {
        pantalla.innerText += ",";
    }
}

// Función para calcular el resultado
function igual() {
    let valor2 = pantalla.innerText;
    switch (operacionActiva) {
        case '+':
            resultado = parseFloat(operando) + parseFloat(valor2);
            break;
        case '-':
            resultado = parseFloat(operando) - parseFloat(valor2);
            break;
        case 'X':
            resultado = parseFloat(operando) * parseFloat(valor2);
            break;
        case '/':
            if (parseFloat(valor2) === 0) {
                resultado = "Error";
            } else {
                resultado = parseFloat(operando) / parseFloat(valor2);
            }
            break;
        case '+/-':
            resultado = -parseFloat(pantalla.innerText);
            break;
    }
    pantalla.innerText = resultado;
    operacionActiva = "";
    operando = "";
}

// Función para borrar la pantalla
function borrar() {
    pantalla.innerText = "0";
    operando = "";
    operacionActiva = "";
}

// Función para borrar todo (AC)
function ac() {
    pantalla.innerText = "0";
    operando = "";
    operacionActiva = "";
    resultado = 0;
}

// Función para borrar la pantalla
function borrar() {
pantalla.innerText = "0";
operando = "";
operacionActiva = "";
}
