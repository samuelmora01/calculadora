let entradaActual = '';
let expresion = [];
const pantalla = document.getElementById('res');

document.querySelectorAll('.teclas input').forEach(boton => {
    boton.addEventListener('click', () => manejarEntrada(boton.value));
});

function manejarEntrada(valor) {
    if (valor === 'C') {
        limpiarPantalla();
    } else if (valor === '=') {
        calcularResultado();
    } else if (['+', '-', '*', '/'].includes(valor)) {
        agregarOperador(valor);
    } else {
        entradaActual += valor;
        actualizarPantalla(entradaActual);
    }
}

function agregarOperador(op) {
    if (entradaActual === '') return;
    expresion.push(entradaActual);
    expresion.push(op);
    entradaActual = '';
    actualizarPantalla(expresion.join(''));
}

function calcularResultado() {
    if (entradaActual !== '') {
        expresion.push(entradaActual);
    }

    let resultado = parseFloat(expresion[0]);
    for (let i = 1; i < expresion.length; i++) {
        const operador = expresion[i];
        const siguienteValor = parseFloat(expresion[i + 1]);

        if (operador === '+') {
            resultado += siguienteValor;
        } else if (operador === '-') {
            resultado -= siguienteValor;
        } else if (operador === '*') {
            resultado *= siguienteValor;
        } else if (operador === '/') {
            if (siguienteValor === 0) {
                resultado = 'Error';
                break;
            } else {
                resultado /= siguienteValor;
            }
        }
        i++;
    }

    entradaActual = formatearResultado(resultado);
    expresion = [];
    actualizarPantalla(entradaActual);
}

function formatearResultado(numero) {
    if (Number.isInteger(numero)) {
        return numero.toString();
    } else {
        return numero.toFixed(2);
    }
}

function actualizarPantalla(valor) {
    pantalla.innerText = valor;
}

function limpiarPantalla() {
    entradaActual = '';
    expresion = [];
    actualizarPantalla('0');
}
