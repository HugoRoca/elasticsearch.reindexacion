"use strict";

const app = (function () {

    var time = 0;

    const _config = {
        urlES: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com"
    }

    const _elementos = {
        tabla: ".table-filter"
    }

    const _funciones = {
        inicializarEventos: function () {
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
                tabla += `<tr id="${element.index}">`;
                tabla += `<td><button class='btn btn-warning reindexar'>Reindexar</button></td>`;
                tabla += `<td>
                        <a href="javascript:;" class="star">
                            <img src='image/botonNaranja.png' class='media-photo' alt=''>
                        </a>
                    </td>`;
                tabla += `<td>
                        <div class="media">
                            <div class="media-body">
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
