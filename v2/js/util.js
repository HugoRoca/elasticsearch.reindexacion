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

function set_local_storage(data, key) {
    var value = JSON.stringify(data);
    localStorage.setItem(key, value);
}

function get_local_storage(key) {
    var value = localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
}