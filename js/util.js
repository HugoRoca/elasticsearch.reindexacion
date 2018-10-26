'use strict';

class Util {

    cargando(val) {
        if (val) {
            $('.cargaPantalla').fadeIn(500);
        } else {
            $('.cargaPantalla').fadeOut(500);
        }
    }

    getData(url) {
        return $.ajax({
            url: url,
            type: 'get'
        });
    }

    postData(url, data) {
        return $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }
}