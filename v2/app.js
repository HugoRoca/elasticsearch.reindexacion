"use strict";

const app = (function () {

    var reindexar = 0;
    var cronometro = 0;
    var horas = 0, minutos = 0, segundos = 0;

    const _config = {
        urlES: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com"
    }

    const _elementos = {
        tabla: ".table-filter",
        reindexarBoton: ".reindexar"
    }

    const _servicios = {
        getData: function (url) {
            return $.ajax({
                url: url,
                method: "GET",
            });
        },

        postData: function (url, data) {
            return $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            });
        },

        putData: function (url, data) {
            return $.ajax({
                url: url,
                type: "put",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            });
        },

        deleteData: function (url) {
            return $.ajax({
                url: url,
                type: "delete"
            });
        }
    }

    const _funciones = {
        inicializarEventos: function () {
            $(document).on("click", _elementos.reindexarBoton, _eventos.reindexar);
            _funciones.listarInidices();
        },

        listarInidices: function () {
            let url = `${_config.urlES}/_cat/indices/*?format=json&s=docs.count`;
            _servicios.getData(url).then((r) => {
                console.log(r);
                _funciones.llenarTabla(r);
            }, (e) => {
                console.log("error: ", e);
            });
        },

        llenarTabla: function (data) {
            let tabla = "";
            let i = 0;

            for (const key in data) {
                const element = data[key];
                i += 1;
                tabla += `<tr id="${element.index}" data-item="filaReindexación">`;
                tabla += `<td><button class='btn btn-warning reindexar'>Reindexar</button></td>`;
                tabla += `<td style="vertical-align: middle">
                        <a href="javascript:;" class="star">
                            <img src='image/botonNaranja.png' class='media-photo imagen-cambiar' alt=''>
                        </a>
                    </td>`;
                tabla += `<td style="vertical-align: middle">
                        <div class="media">
                            <div class="media-body">
                                <input data-item="id" type="hidden" value="${element.index}">
                                <h3 class='title'>${element.index} 
                                    <span class="pull-right label-small pendiente">(Pendiente)</span>
                                </h3>
                            </div>
                        </div>
                    </td>`;
                tabla += `<td style="vertical-align: middle">
                        <div class="media">
                            <div class="media-body">
                                <h4 class="title">Registros: ${element["docs.count"]}</h4>
                            </div>
                        </div>
                    </td>`;
                tabla += `<td style="vertical-align: middle">
                        <div class="media">
                            <div class="media-body">
                                <h4 class="title">Peso: ${element["store.size"]}</h4>
                            </div>
                        </div>
                    </td>`;

                tabla += `<td style="vertical-align: middle">
                        <div class="media">
                            <div class="media-body">
                                <h4 class="title cronometro"></h4>
                            </div>
                        </div>
                    </td>`;
                tabla += "</tr>";

                tabla += `<tr id="${element.index}_log"></tr>`
            }

            $(_elementos.tabla).html(tabla);
        },

        cronometrar: function (crometroText) {

            let xHoras, xMinutos, xSegundos;
            segundos++;
            if (segundos > 59) { minutos++; segundos = 0 }
            if (minutos > 59) { horas++; minutos = 0 }
            if (horas > 24) { horas = 0; }

            xSegundos = (segundos < 10 ? "0" + segundos : segundos);
            xMinutos = (minutos < 10 ? "0" + minutos : minutos);
            xHoras = (horas < 10 ? "0" + horas : horas);

            crometroText.html(`Tiempo: ${xHoras}:${xMinutos}:${xSegundos}`);
        },

        pararCronometro: function () {
            clearInterval(cronometro);
            segundos = 0;
            minutos = 0;
            horas = 0;
        },

        reindexar: function (index, tr) {
            _servicios.putData(`${_config.urlES}/${index}`, create_index).then((r) => {
                
            }, (e) => {
                console.log(e.responseJSON);
                _eventos.cambiosEstiloError(tr);
            })
        }
    }

    const _eventos = {
        reindexar: function (e) {
            e.preventDefault();
            var i = 0;
            let padre = $(this).parents("[data-item='filaReindexación']").eq(0);
            let index = $(padre).find("[data-item='id']").val();
            let logId = "#" + index + "_log";
            let newIndex = index.replace("producto_v1", "producto_v2");

            let log = `<strong>Hora de inicio ${obtenerHora()} → Creación de índice: ${newIndex}</strong><br>`;
            $(logId).html(`<td colspan="6"><p><small>${log}</small></p></td>`);

            _eventos.cambiosEstilosInicio(padre);

            let crometroText = $(padre).find(".cronometro");

            cronometro = setInterval(() => { _funciones.cronometrar(crometroText); }, 1000);

            reindexar = setInterval(() => {
                log += `Total Registros:`;
                i++;
                let loghtml = `<td colspan="6"><p><small>${log}</small></p></td>`;
                $(logId).html(loghtml);

                if (i === 3) {

                    clearInterval(reindexar);
                    _funciones.pararCronometro();
                    //_eventos.cambiosEstiloFin(padre);
                    _funciones.reindexar(index, padre);
                }
            }, 1000);

        },

        cambiosEstilosInicio: function (value) {
            let imagen = $(value).find(".imagen-cambiar");
            let cronometro = $(value).find(".cronometro");
            let labelSmall = $(value).find(".label-small");
            let buttonReindexar = $(value).find(".reindexar");

            imagen.attr("src", "image/cargando.gif");
            cronometro.html("Tiempo: 00:00:00");
            cronometro.css({ "color": "green", "font-size": "25px" });
            labelSmall.html("(Reindexando...)");
            labelSmall.css("color", "green");
            buttonReindexar.prop("disabled", true);
        },

        cambiosEstiloFin: function (value) {
            let imagen = $(value).find(".imagen-cambiar");
            let labelSmall = $(value).find(".label-small");
            let buttonReindexar = $(value).find(".reindexar");

            imagen.attr("src", "image/botonVerde.png");
            labelSmall.html("(Reindexado)");
            buttonReindexar.text("Reindexado");
            buttonReindexar.toggleClass("btn-warning btn-success")
        },

        cambiosEstiloError: function (value) {
            let imagen = $(value).find(".imagen-cambiar");
            let labelSmall = $(value).find(".label-small");
            let buttonReindexar = $(value).find(".reindexar");
            let cronometro = $(value).find(".cronometro");

            imagen.attr("src", "image/botonRojo.png");
            labelSmall.html("(Error)");
            labelSmall.css("color", "red");
            buttonReindexar.text("Reintentar");
            if (buttonReindexar.hasClass("btn-warning")) buttonReindexar.toggleClass("btn-warning btn-danger");
            buttonReindexar.prop("disabled", false);
            cronometro.fadeOut("slow");
        }
    }

    function init() {
        _funciones.inicializarEventos();
        mostarCargando();
    }

    return {
        init: init
    }

})();

$(document).ready(function () {
    app.init();
})
