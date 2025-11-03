
document.addEventListener('DOMContentLoaded', function () { //espera a que todo el contenido de la página web se haya cargado antes de ejecutar cualquier código.
    const levelButtons = document.querySelectorAll('.level-button');
    const confirmButton = document.querySelector('.confirm-button');
    const levelImages = document.querySelectorAll('.level-image');

    levelButtons.forEach(button => {//Para cada botón de nivel, hace lo siguiente.
        button.addEventListener('click', function () {  //Esto escucha el evento de clic en cada botón de nivel. Cuando alguien hace clic en un botón, se ejecuta la función
            levelButtons.forEach(btn => btn.classList.remove('selected')); //Esto se encarga de quitar la clase "selected" 
            this.classList.add('selected'); //Esto añade la clase "selected" al botón que fue clickeado, lo marcando como seleccionado.
            confirmButton.removeAttribute('disabled'); //Esto habilita el botón de confirmación al remover el atributo "disabled". Antes de esto, el botón estaba deshabilitado y no se podía clickear.
            mostrarImagen(this.dataset.level);
        });
    });

    confirmButton.addEventListener('click', function () {
        const selectedLevel = document.querySelector('.level-button.selected').getAttribute('data-level');
        // Redirige a la página correspondiente según el nivel seleccionado
        if (selectedLevel === 'principiante') {
            window.location.href = './Principiante/principiante.html';
        } else if (selectedLevel === 'intermedio') {
            window.location.href = './Intermedio/intermedio.html';
        } else if (selectedLevel === 'avanzado') {
            window.location.href = './Avanzado/avanzado.html';
        }
    });

    function mostrarImagen(level) {
        levelImages.forEach(image => { //Similar al bucle de los botones, este bucle se ejecuta para cada imagen. En este caso, oculta todas las imágenes.
            image.style.display = 'none';
        });

        const imagen = document.getElementById('imagen-' + level); //Seleccione la imagen dependiendo del nivel
        if (imagen) {
            imagen.style.display = 'block'; //Mostrar la imagen
        }

        const nivelSeleccionado = document.getElementById('nivelSeleccionado');
        const nivelButton = document.getElementById('nivelButton');
        nivelSeleccionado.innerHTML = `<span style="font-size:30px "><em><b>Nivel ${level}</em></b></span>`;
        nivelButton.innerText = `Nivel ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    }




});

