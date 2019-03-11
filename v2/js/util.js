"use strict";

function cargando(val) {
    if (val) {
        $(".cargaPantalla").fadeIn(500);
    } else {
        $(".cargaPantalla").fadeOut(500);
    }
}

function mostarCargando(){
    $(".cargando").hide();
}

function getData(url) {
    return $.ajax({
        url: url,
        type: "get"
    });
}

function postData(url, data) {
    return $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

function putData(url, data) {
    return $.ajax({
        url: url,
        type: "put",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

function deleteData(url) {
    return $.ajax({
        url: url,
        type: "delete"
    });
}
