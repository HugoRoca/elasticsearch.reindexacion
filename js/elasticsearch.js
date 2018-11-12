'use strict';

let util = new Util(),
    urlElastic = 'https://vpc-es-sbsearch-qas-u4pht5gehqu3pmsc4x5srachwu.us-east-1.es.amazonaws.com';

var time = 0;

function init() {
    listaIndices();

}

function error(e) {
    console.log(e);
    $('.alert-danger').fadeIn('slow');
    //util.cargando(false);
}

function obtenerHora(){ 
    momentoActual = new Date() 
    hora = momentoActual.getHours() 
    minuto = momentoActual.getMinutes() 
    segundo = momentoActual.getSeconds() 

    return hora + ":" + minuto + ":" + segundo;
}

function llenaTabla(r) {
    var tabla = '';
    var i = 0;
    for (const key in r) {
        const element = r[key];
        if (element.index.indexOf('v1') !== -1) continue;

        i += 1;
        tabla += '<tr>';
        tabla += `<td>${i}</td>`;
        tabla += `<td>${element.index}</td>`;
        tabla += `<td class="text-right">${element["docs.count"]}</td>`;
        tabla += `<td class="text-right">${element["store.size"]}</td>`;
        tabla += `<td><button class="btn btn-primary btn-sm btn-reindex" onclick="Reindexar('${element.index}', 'log${i}');">Reindexar</button></td>`;
        tabla += `<td class="log${i}"></td>`;
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
        error(e);
    });
}

function deleteIndex(index) {
    util.deleteData(`${urlElastic}/${index}`).then((r) => {
        return r;
    }, (e) => {
        error(e);
    });
}

function Reindexar(index, showlog) {
    //util.cargando(true);

    let _index = index,
        new_index = _index.replace('producto', 'producto_v1'),
        log = '';

    // Creación de indice
    util.putData(`${urlElastic}/${new_index}`, create_index).then((r) => {
        log = 'Hora de inicio: ' + obtenerHora() + '<br>';
        log += `Creación de índice: ${new_index}<br>`;
        $(`.${showlog}`).html(log);

        let dataReindex = data_reindex(index, new_index);

        // Reindexación
        util.postData(`${urlElastic}/_reindex?wait_for_completion=false`, dataReindex).then((r) => {
            log += `Inicio de la reindexación...<br>`;
            $(`.${showlog}`).html(log);

            let task = r.task;

            log += `Consultando proceso: ${task}<br>`;

            time = setInterval(() => {
                util.getData(`${urlElastic}/_tasks/${task}`).then((r) => {

                    log += `Total Registros: ${r.task.status.total} | Total Procesados: ${r.task.status.created}<br>`;
                    $(`.${showlog}`).html(log);
                    $('.alert-danger').fadeOut('slow');

                    if (r.completed && r.task.status.total == r.task.status.created) {

                        util.deleteData(`${urlElastic}/${index}`).then((r) => {

                            let data = data_alias(index, new_index);

                            util.postData(`${urlElastic}/_aliases`, data).then((r) => {
                                 clearInterval(time);
                                 log += 'Hora Fin: ' + obtenerHora() + '<br>';
                                 log += `<br><span style="color: green">Finalizó</span>`;
                                 $(`.${showlog}`).html(log);
                                 util.cargando(false);
                            }, (e) => {
                                error(e);
                            });

                        }, (e) => {
                            error(e);
                        });
                    }
                }, (e) => {
                    error(e);
                });
            }, 30000);
        })

    }, (e) => {
        error(e);
    });
}

init();

