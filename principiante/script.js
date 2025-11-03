document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const respuestasCorrectas = [
        "París",
        "Miguel de Cervantes",
        "1939",
        "H2O",
        "Marte",
        "Leonardo da Vinci",
        "Amazonas",
        "África",
        "Everest",
        "Boro"
    ];

    const respuestasUsuario = [
        document.getElementById('q1').value.trim(),
        document.getElementById('q2').value.trim(),
        document.getElementById('q3').value.trim(),
        document.getElementById('q4').value.trim(),
        document.getElementById('q5').value.trim(),
        document.getElementById('q6').value.trim(),
        document.getElementById('q7').value.trim(),
        document.getElementById('q8').value.trim(),
        document.getElementById('q9').value.trim(),
        document.getElementById('q10').value.trim(),
    ];

    let aciertos = 0;
    let errores = 0;
    for (let i = 0; i < respuestasCorrectas.length; i++) {
        if (respuestasUsuario[i].toLowerCase() === respuestasCorrectas[i].toLowerCase()) {
            aciertos++;
        } else {
            errores++;
        }
    }

    // Ocultar preguntas y mostrar puntaje
    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    // Mostrar resultados
    const correctAnswersElement = document.getElementById('correctAnswers');
    correctAnswersElement.textContent += aciertos;

    const incorrectAnswersElement = document.getElementById('incorrectAnswers');
    incorrectAnswersElement.textContent += errores;
});
