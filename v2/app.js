"use strict";

const app = (function () {

    var time = 0;

    const _config = {
        urlES: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com"
    }

    const _elementos = {
        tabla: ".table-filter",
        reindexarBoton: ".reindexar"
    }

    const _funciones = {
        inicializarEventos: function () {
            $(document).on("click", _elementos.reindexarBoton, _eventos.reindexar);
            _funciones.listarInidices();
        },

        listarInidices: function () {
            let url = `${_config.urlES}/_cat/indices/producto*?format=json&s=docs.count`;
            getData(url).then((r) => {
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
                tabla += `<td>
                        <a href="javascript:;" class="star">
                            <img src='image/botonNaranja.png' class='media-photo' alt=''>
                        </a>
                    </td>`;
                tabla += `<td>
                        <div class="media">
                            <div class="media-body">
                                <input data-item="id" type="hidden" value="${element.index}">
                                <h3 class='title'>${element.index} 
                                    <span class="pull-right pendiente">(Pendiente)</span>
                                </h3>
                            </div>
                        </div>
                    </td>`;
                tabla += `<td>
                        <div class="media">
                            <div class="media-body">
                                <h4 class="title">Registros: ${element["docs.count"]}</h4>
                            </div>
                        </div>
                    </td>`;
                tabla += `<td>
                        <div class="media">
                            <div class="media-body">
                                <h4 class="title">Registros: ${element["store.size"]}</h4>
                            </div>
                        </div>
                    </td>`;

                tabla += `<td>
                        <a id="cargando" class="start" href="javascript:;"></a>
                    </td>`;
                tabla += "</tr>";

                tabla += `<tr id="${element.index}_log"></tr>`
            }

            $(_elementos.tabla).html(tabla);
        }
    }

    const _eventos = {
        reindexar: function (e) {
            e.preventDefault();

            let padre = $(this).parents("[data-item='filaReindexación']").eq(0);
            let index = $(padre).find("[data-item='id']").val();
            let log = "#" + index + "_log";

            $(log).html("<td colspan='6'><p><small>Probando</small></p></td>");

            console.log(padre);
            console.log(log);
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
