const seal = document.getElementById("seal");
const portada = document.getElementById("portada");
const scene = document.querySelector(".scene");

const page1 = document.querySelector(".page1");
const page2 = document.querySelector(".page2");
const page3 = document.querySelector(".page3");

const overlay = document.querySelector(".magic-overlay");

const musica = document.getElementById("musica");

musica.volume = 0.3;

seal.addEventListener("click", () => {

    seal.disabled = true;

    console.log("CLICK OK");

    setTimeout(() => {

    musica.volume = 0;
    musica.play();

    let vol = 0;

    const fade = setInterval(() => {
        if (vol < 0.3) {
            vol += 0.01;
            musica.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, 100);

}, 1000);

        overlay.classList.add("active");

        setTimeout(() => {

        portada.classList.add("open");

        setTimeout(() => {
            page1.classList.add("open");
        }, 100);

        setTimeout(() => {
            page2.classList.add("open");
        }, 200);

        setTimeout(() => {
            page3.classList.add("open");
        }, 400);

    }, 2500); // 👈 duración del efecto (ajustable)

});

setTimeout(() => {
    scene.style.pointerEvents = "none";
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    document.getElementById("invitacion").style.pointerEvents = "auto";
}, 5000);


portada.addEventListener("animationend", () => {
    console.log("ANIMACION TERMINADA");

    scene.style.pointerEvents = "none";

    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    document.getElementById("invitacion").style.pointerEvents = "auto";
});

// 📅 12 de Septiembre 2026 - 21:00 hs
const fechaEvento = new Date(2026, 8, 12, 21, 0, 0).getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
}


setInterval(actualizarContador, 1000);
actualizarContador();

/* =========================
INVITADOS
========================= */

const contenedorInvitados = document.getElementById("invitados");
const btnAgregar = document.getElementById("agregarInvitado");
const btnConfirmar = document.getElementById("btnConfirmar");

btnAgregar.addEventListener("click", () => {

    const fila = document.createElement("div");
    fila.className = "fila-invitado";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nombre y apellido";
    input.className = "input-invitado";

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "✕";

    btnEliminar.addEventListener("click", () => {
        fila.remove();
    });

    fila.appendChild(input);
    fila.appendChild(btnEliminar);

    contenedorInvitados.appendChild(fila);

});
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbz85Z_FNkEIuZEwmPqV8iSWXOzifyBAbchsGhHQQMenWEp-Ahz2c7jjIy1N8eguk4zq/exec";

btnConfirmar.addEventListener("click", async (e) => {

    e.preventDefault();

    const inputs = document.querySelectorAll(".input-invitado");

    let nombres = [];
    let lista = "";

    inputs.forEach(input => {

        const nombre = input.value.trim();

        if (nombre !== "") {
            nombres.push(nombre);
            lista += "• " + nombre + "%0A";
        }

    });

    if (nombres.length === 0) {
        alert("Ingresá al menos un nombre.");
        return;
    }

    const mensaje =
        "✨ Hola Valentina ✨%0A%0A" +
        "He escuchado el llamado de las luces del reino y me encantaría acompañarte en esta noche inolvidable. 🏮%0A%0A" +
        "Asistiremos:%0A%0A" +
        lista;

    const whatsappURL =
        "https://wa.me/5491131881109?text=" + mensaje;

    // abrir primero
    window.location.href = whatsappURL;

    // guardar después
    fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
            invitados: nombres
        })
    }).catch(error => {
        console.error(error);
    });

    setTimeout(() => {

        document.getElementById("invitacion").style.display = "none";

        document.getElementById("pantallaGracias").style.display = "block";

    }, 1000);

});

document
.getElementById("volverInvitacion")
.addEventListener("click", (e) => {

    e.preventDefault();

    document.getElementById("pantallaGracias").style.display = "none";

    document.getElementById("invitacion").style.display = "block";

});
