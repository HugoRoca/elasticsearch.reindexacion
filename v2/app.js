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

        listarInidices: function(){
            let urlES = `${_config.urlES}/_cat/indices`;
            //let urlES = `${_config.urlES}/_cat/indices/producto*?format=json&s=docs.count`;
            getData(url).then((r) => {
                _funciones.llenarTabla(r);
            }, (e) =>{
                console.log("error: ", e);
            });
        },

        llenarTabla: function(data){

        }
    }

    function init() {
        mostarCargando();
    }

    return {
        init: init
    }

})();

$(document).ready(function () {
    app.init();
})
