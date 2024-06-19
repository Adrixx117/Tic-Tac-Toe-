const tablero = document.getElementById('tablero');
const mensaje = document.getElementById('mensaje');
const celdas = document.querySelectorAll('.celda');

let jugadorActual = 1; // 1: Jugador 1, 2: Jugador 2
let estadoTablero = ['', '', '', '', '', '', '', '', ''];

function marcarCelda(celda) {
    const posicion = parseInt(celda.dataset.celda);
    if (estadoTablero[posicion] === '') {
        estadoTablero[posicion] = jugadorActual;
        celda.textContent = jugadorActual === 1 ? 'X' : 'O';
        celda.classList.add(`jugador${jugadorActual}`);
        comprobarGanador();
        jugadorActual = jugadorActual === 1 ? 2 : 1;
    }
}

function comprobarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (estadoTablero[a] === estadoTablero[b] && estadoTablero[a] === estadoTablero[c] && estadoTablero[a] !== '') {
            mostrarMensaje(`¡Ganó el Jugador ${estadoTablero[a]}!`);
            deshabilitarCeldas();
            return;
        }
    }

    if (!estadoTablero.includes('')) {
        mostrarMensaje('Empate');
        deshabilitarCeldas();
    }
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

function deshabilitarCeldas() {
    celdas.forEach(celda => celda.removeEventListener('click', marcarCelda));
}

celdas.forEach(celda => celda.addEventListener('click', () => marcarCelda(celda)));
