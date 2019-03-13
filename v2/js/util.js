"use strict";

function cargando(val) {
    if (val) {
        $(".cargaPantalla").fadeIn(500);
    } else {
        $(".cargaPantalla").fadeOut(500);
    }
}

function mostarCargando() {
    $(".cargando").hide();
}


function obtenerHora() {
    var momentoActual = new Date()
    var hora = momentoActual.getHours()
    var minuto = momentoActual.getMinutes()
    var segundo = momentoActual.getSeconds()

    return hora + ":" + minuto + ":" + segundo;
}