'use strict';

const create_index = {
    "settings": {
      "index": {
        "refresh_interval": "1s",
        "number_of_shards": "5",
        "analysis": {
          "filter": {
            "spanish_stop": {
              "type": "stop",
              "stopwords": [
                "_spanish_"
              ]
            }
          },
          "analyzer": {
            "analyzer_custom_standard": {
              "filter": [
                "standard",
                "lowercase",
                "asciifolding",
                "spanish_stop"
              ],
              "type": "custom",
              "tokenizer": "standard"
            },
            "analyzer_ngram": {
              "filter": [
                "standard",
                "lowercase",
                "asciifolding",
                "spanish_stop"
              ],
              "type": "custom",
              "tokenizer": "tokenizer_ngram"
            },
            "analyzer_edge_ngram": {
              "filter": [
                "standard",
                "lowercase",
                "asciifolding",
                "spanish_stop"
              ],
              "type": "custom",
              "tokenizer": "tokenizer_edge_ngram"
            }
          },
          "tokenizer": {
            "tokenizer_edge_ngram": {
              "token_chars": [
                "letter",
                "digit"
              ],
              "min_gram": "3",
              "type": "edge_ngram",
              "max_gram": "10"
            },
            "tokenizer_ngram": {
              "token_chars": [
                "letter",
                "digit"
              ],
              "min_gram": "3",
              "type": "ngram",
              "max_gram": "10"
            }
          }
        },
        "number_of_replicas": "1"
      }
    },
    "mappings": {
      "_doc": {
        "properties": {
          "activo": {
            "type": "boolean",
            "null_value": false
          },
          "categorias": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "codigoCampania": {
            "type": "keyword"
          },
          "codigoConsultora": {
            "type": "keyword"
          },
          "codigoEstrategia": {
            "type": "integer",
            "coerce": true
          },
          "codigoProducto": {
            "type": "keyword"
          },
          "codigoTipoEstrategia": {
            "type": "keyword"
          },
          "cuv": {
            "type": "keyword"
          },
          "descripcion": {
            "type": "text",
            "analyzer": "analyzer_custom_standard"
          },
          "diaInicio": {
            "type": "integer",
            "coerce": true
          },
          "disponible": {
            "type": "boolean",
            "null_value": false
          },
          "estrategiaId": {
            "type": "long"
          },
          "ganancia": {
            "type": "double",
            "coerce": true
          },
          "grupoArticulos": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "imagen": {
            "type": "keyword",
            "index": false
          },
          "imagenOrigen": {
            "type": "keyword",
            "index": false
          },
          "limiteVenta": {
            "type": "integer",
            "coerce": true
          },
          "lineas": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_ngram"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "marcaId": {
            "type": "integer",
            "coerce": true
          },
          "marcas": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "orden": {
            "type": "integer",
            "coerce": true
          },
          "precio": {
            "type": "double",
            "coerce": true
          },
          "productoResumenId": {
            "type": "keyword"
          },
          "revistaDigital": {
            "type": "integer",
            "coerce": true
          },
          "textoBusqueda": {
            "type": "text",
            "fields": {
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_ngram"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "tipoEstrategiaId": {
            "type": "integer",
            "coerce": true
          },
          "tipoPersonalizacion": {
            "type": "keyword"
          },
          "valorizado": {
            "type": "double",
            "coerce": true
          },
          "zonasAgotadas": {
            "type": "keyword"
          }
        }
      }
    }
};

const data_reindex = ((index, reindex) => {
  return {
      "source": {
          "index": index,
           "query": {
               "term": {
                   "disponible": "true"
               }
           }
      },
      "dest": {
          "index": reindex
      }
  };
});

const data_alias = ((index, reindex) => {
    return {
        "actions": [
            {
                "add": {
                    "alias": index,
                    "index": reindex
                }
            }
        ]
    };
});

const settingsGet = {
  "async": true,
  "crossDomain": true,
  "url": "https://pruebas-9ad8.restdb.io/rest/indexes",
  "method": "GET",
  "headers": {
      "content-type": "application/json",
      "x-apikey": "5c8a8b1fcac6621685acbf27",
      "cache-control": "no-cache"
  }
};

const settingsPost = ((json) => {
  return{
    
  }
});