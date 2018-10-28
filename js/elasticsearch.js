(function () {

    'use strict';

    let util = new Util(),
        version = 'v1',
        urlElastic = 'https://vpc-es-sbsearch-qas-u4pht5gehqu3pmsc4x5srachwu.us-east-1.es.amazonaws.com';

    function init() {
        listaIndices();
        
    }

    function llenaTabla(r) {
        var tabla = '';
        var i = 0;
        for (const key in r) {
            const element = r[key];
            i += 1;
            tabla += '<tr>';
            tabla += `<td>${i}</td>`;
            tabla += `<td>${element.index}</td>`;
            tabla += `<td>${element["docs.count"]}</td>`;
            tabla += `<td class="text-right">${element["store.size"]}</td>`;
            tabla += `<td><button class="btn btn-primary btn-sm btn-reindex">Reindexar</button></td>`;
            tabla += '</tr>';
        }
    
        return tabla;
    
    }

    function listaIndices() {
        util.cargando(true);
        let url = `${urlElastic}/_cat/indices/producto*?format=json&s=docs.count`;

        util.getData(url).then((r) => {
            var tabla = llenaTabla(r);
            $('#tblIndices').html(tabla);
            util.cargando(false);
        }, (e) => {
            console.log(e);
            $('.alert-danger').fadeIn('slow');
            util.cargando(false);
        });
    }

    function ejecutarReindexacion(index){
        
    }

    init();
})();
