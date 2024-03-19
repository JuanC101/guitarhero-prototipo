var content = document.querySelector(".content");
var competidores = [];
var maxFigures = 5;
var velocidad = 25;
var intervalo = null;
var stopPosition = content.offsetWidth * (1 - 0.097);

function crearCompetidor() {
    var competidorDiv = document.createElement("div");
    content.appendChild(competidorDiv);

    var competidorImg = document.createElement("img");
    competidorImg.setAttribute("src", "./img/unicorn-horse.gif");
    competidorImg.setAttribute("height", content.offsetWidth * 0.097);
    competidorDiv.appendChild(competidorImg);

    return competidorDiv;
}

function reiniciarJuego() {
    clearInterval(intervalo);
    competidores.forEach(function (competidor) {
        content.removeChild(competidor);
    });
    competidores = [];
    stopPosition = content.offsetWidth * (1 - 0.097);
}

function mostrarAlertaConSonido(mensaje) {
    // Crear un elemento div para simular la alerta
    var alertaDiv = document.createElement('div');
    alertaDiv.className = 'alerta';
    alertaDiv.textContent = mensaje;

    // Agregar el elemento al cuerpo del documento
    document.body.appendChild(alertaDiv);

    // Reproducir el sonido
    document.getElementById('winSound').play();

    // Eliminar el elemento después de un tiempo (puedes ajustar este valor según tus necesidades)
    setTimeout(function() {
        document.body.removeChild(alertaDiv);
    }, 3000);
}

function iniciarJuego() {
    reiniciarJuego();

    for (var i = 1; i <= maxFigures; i++) {
        competidores.push(crearCompetidor());
    }

    var ganador = null;
    intervalo = setInterval(function () {
        competidores.forEach(function (competidor) {
            var cont = parseFloat(competidor.style.marginLeft) || 0;
            cont += Math.random() * velocidad;
            competidor.style.marginLeft = cont + "px";

            if (cont >= stopPosition) {
                competidor.style.marginLeft = stopPosition + "px";

                if (!ganador) {
                    ganador = competidor;
                    clearInterval(intervalo);

                    // Muestra la alerta simulada con sonido
                    mostrarAlertaConSonido("¡El caballo " + (competidores.indexOf(ganador) + 1) + " es el ganador!");
                }
            }
        });
    }, 40);
}


window.addEventListener("keyup", function (evt) {
    if (evt.key === "s") {
        iniciarJuego();
    }
    if (evt.key === "r") {
        reiniciarJuego();
    }
});

window.addEventListener("resize", reiniciarJuego);
