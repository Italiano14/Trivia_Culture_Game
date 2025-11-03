const contenedor = document.querySelector('.contenedor');
const preguntaBox = document.querySelector('.pregunta');
const opcionesBox = document.querySelector('.opciones');
const btnSiguiente = document.querySelector('.btnSiguiente');
const tarjetaPuntuacion = document.querySelector('.tarjetaPuntuacion');
const alerta = document.querySelector('.alerta');
const btnComenzar = document.querySelector('.btnComenzar');
const temporizador = document.querySelector('.temporizador');

const cuestionario = [
  {
    pregunta: "¿Cuál es el elemento más abundante en la Tierra?",
    opciones: ["Oxígeno", "Silicio", "Aluminio", "Hierro"],
    respuesta: "Oxígeno",
    imagen: "ox.jpeg",
    
  },
  {
    pregunta: "¿En qué año se fundó la Organización de las Naciones Unidas (ONU)?",
    opciones: ["1945", "1939", "1951", "1962"],
    respuesta: "1945",
    imagen: "onu.png"
  },
  {
    pregunta: "¿Cuál es el único planeta del sistema solar que gira en sentido contrario al resto?",
    opciones: ["Venus", "Urano", "Júpiter", "Marte"],
    respuesta: "Venus",
    imagen: "ve.jpeg"
  },
  {
    pregunta: "¿Quién escribió la obra filosófica 'Así habló Zaratustra'?",
    opciones: ["Friedrich Nietzsche", "Sigmund Freud", "Immanuel Kant", "Jean-Paul Sartre"],
    respuesta: "Friedrich Nietzsche",
    imagen: "fr.jpg"
  },
  {
    pregunta: "¿Cuál es el hueso más largo del cuerpo humano?",
    opciones: ["Fémur", "Húmero", "Tibia", "Radio"],
    respuesta: "Fémur",
    imagen: "fe.jpg"
  },
  {
    pregunta: "¿En qué año se celebró la Revolución Rusa?",
    opciones: ["1917", "1905", "1923", "1930"],
    respuesta: "1917",
    imagen: "putin.jpeg"
  },
  {
    pregunta: "¿Qué científico propuso la teoría de la relatividad?",
    opciones: ["Albert Einstein", "Isaac Newton", "Marie Curie", "Charles Darwin"],
    respuesta: "Albert Einstein",
    imagen: "teoria.jpg"
  },
  {
    pregunta: "¿Cuál es la capital de Mongolia?",
    opciones: ["Ulán Bator", "Kuala Lumpur", "Minsk", "Kiev"],
    respuesta: "Ulán Bator",
    imagen: "mongolia.png"
  },
  {
    pregunta: "¿Cuál es el metal más caro del mundo?",
    opciones: ["Rodio", "Oro", "Platino", "Paladio"],
    respuesta: "Rodio",
    imagen: "metales.jpeg"
  },
  {
    pregunta: "¿Quién escribió la novela 'Cien años de soledad'?",
    opciones: ["Gabriel García Márquez", "Pablo Neruda", "Mario Vargas Llosa", "Julio Cortázar"],
    respuesta: "Gabriel García Márquez",
    imagen: "gaby.jpeg"
  }
];

let indicePreguntaActual = 0;
let puntuacion = 0;
let cuestionarioTerminado = false;
let tiempoRestante = 15;
let idTemporizador = null;

const mostrarPreguntas = () => {
  const detallesPregunta = cuestionario[indicePreguntaActual];
  preguntaBox.textContent = detallesPregunta.pregunta;

  const imagenPregunta = document.createElement('img');
  imagenPregunta.src = detallesPregunta.imagen;
  opcionesBox.innerHTML = "";
  opcionesBox.appendChild(imagenPregunta);

  for (let i = 0; i < detallesPregunta.opciones.length; i++) {
    const opcionActual = detallesPregunta.opciones[i];
    const opcionDiv = document.createElement('div');
    opcionDiv.textContent = opcionActual;
    opcionDiv.classList.add('opcion');
    opcionesBox.appendChild(opcionDiv);
  
    opcionDiv.addEventListener('click', () => {
      const opciones = document.querySelectorAll('.opcion');
      opciones.forEach(opcion => opcion.classList.remove('seleccionada'));
      opcionDiv.classList.add('seleccionada');
    });
  }

  if (indicePreguntaActual < cuestionario.length) {
    iniciarTemporizador();
  }
}

const verificarRespuesta = () => {
  const opcionSeleccionada = document.querySelector('.opcion.seleccionada');
  if (opcionSeleccionada.textContent === cuestionario[indicePreguntaActual].respuesta) {
    mostrarAlerta("¡Respuesta Correcta!");
    puntuacion++;
  }
  else {
    mostrarAlerta(`¡Respuesta Incorrecta! La respuesta correcta es: ${cuestionario[indicePreguntaActual].respuesta}`);
  }
  tiempoRestante = 15;
  indicePreguntaActual++;
  if (indicePreguntaActual < cuestionario.length) {
    mostrarPreguntas();
  }
  else {
    detenerTemporizador();
    mostrarPuntuacion();
  }
}

const mostrarPuntuacion = () => {
  preguntaBox.textContent = "";
  opcionesBox.textContent = "";
  tarjetaPuntuacion.textContent = `Puntuación: ${puntuacion} de ${cuestionario.length}!`;
  mostrarAlerta("¡Has completado este cuestionario!");
  btnSiguiente.textContent = "Jugar de Nuevo";
  cuestionarioTerminado = true;
  temporizador.style.display = "none";

  let mensajePuntuacion = "";
  if (puntuacion > 8) {
    mensajePuntuacion = "¡Eres un maestro!";
  } else if (puntuacion > 6) {
    mensajePuntuacion = "¡Eres un genio!";
  } else if (puntuacion >= 4) {
    mensajePuntuacion = "Sabes algo.";
  } else {
    mensajePuntuacion = "No sabes nada. Anda a leer libros.";
  }

  const mensajePuntuacionElement = document.createElement('div');
  mensajePuntuacionElement.classList.add('mensajePuntuacion');
  mensajePuntuacionElement.textContent = mensajePuntuacion;
  tarjetaPuntuacion.appendChild(mensajePuntuacionElement);
}
const mostrarAlerta = (mensaje) => {
  alerta.style.display = "block";
  alerta.textContent = mensaje;
  setTimeout(() => {
    alerta.style.display = "none";
  }, 2000);
}

const iniciarTemporizador = () => {
  clearInterval(idTemporizador);
  temporizador.textContent = tiempoRestante;

  const cuentaRegresiva = () => {
    tiempoRestante--;
    temporizador.textContent = tiempoRestante;
    if (tiempoRestante === 0) {
      const confirmarUsuario = confirm("¡Tiempo Agotado! ¿Quieres jugar el cuestionario de nuevo?");
      if (confirmarUsuario) {
        tiempoRestante = 20;
        comenzarCuestionario();
      }
      else {
        btnComenzar.style.display = "block";
        contenedor.style.display = "none";
        return;
      }
    }
  }
  idTemporizador = setInterval(cuentaRegresiva, 1000);
}

const detenerTemporizador = () => {
  clearInterval(idTemporizador);
}

const barajarPreguntas = () => {
  for (let i = cuestionario.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cuestionario[i], cuestionario[j]] = [cuestionario[j], cuestionario[i]];
  }
  indicePreguntaActual = 0;
  mostrarPreguntas();
}

const comenzarCuestionario = () => {
  tiempoRestante = 20;
  temporizador.style.display = "flex";
  barajarPreguntas();
}

btnComenzar.addEventListener('click', () => {
  btnComenzar.style.display = "none";
  contenedor.style.display = "block";
  comenzarCuestionario();
});

btnSiguiente.addEventListener('click', () => {
  const opcionSeleccionada = document.querySelector('.opcion.seleccionada');
  if (!opcionSeleccionada && btnSiguiente.textContent === "Siguiente") {
    mostrarAlerta("¡Selecciona tu respuesta!");
    return;
  }
  if (cuestionarioTerminado) {
    btnSiguiente.textContent = "Siguiente";
    tarjetaPuntuacion.textContent = "";
    indicePreguntaActual = 0;
    cuestionarioTerminado = false;
    puntuacion = 0;
    comenzarCuestionario();
  }
  else {
    verificarRespuesta();
  }
});