'use strict';

const create_index = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0,
        "analysis": {
            "analyzer": {
                "custom_standard": {
                    "tokenizer": "standard",
                    "filter": [
                        "standard",
                        "lowercase",
                        "asciifolding",
                        "spanish_stop"
                    ]
                },
                "analyzer_ngram": {
                    "tokenizer": "tokenizer_ngram",
                    "filter": [
                        "standard",
                        "lowercase",
                        "asciifolding",
                        "spanish_stop"
                    ]
                }
            },
            "tokenizer": {
                "tokenizer_ngram": {
                    "token_chars": [
                        "letter",
                        "digit"
                    ],
                    "min_gram": "3",
                    "type": "edge_ngram",
                    "max_gram": "10"
                }
            },
            "filter": {
                "spanish_stop": {
                    "type": "stop",
                    "stopwords": "_spanish_"
                }
            }
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
                    "analyzer": "custom_standard",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        },
                        "ngram": {
                            "type": "text",
                            "analyzer": "analyzer_ngram"
                        }
                    }
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
                    "analyzer": "custom_standard"
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
                    "type": "double"
                },
                "grupoArticulos": {
                    "type": "text",
                    "analyzer": "custom_standard",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        },
                        "ngram": {
                            "type": "text",
                            "analyzer": "analyzer_ngram"
                        }
                    }
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
                    "analyzer": "custom_standard",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        },
                        "ngram": {
                            "type": "text",
                            "analyzer": "analyzer_ngram"
                        }
                    }
                },
                "marcaId": {
                    "type": "integer",
                    "coerce": true
                },
                "marcas": {
                    "type": "text",
                    "analyzer": "custom_standard",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        },
                        "ngram": {
                            "type": "text",
                            "analyzer": "analyzer_ngram"
                        }
                    }
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
                    "analyzer": "custom_standard",
                    "fields": {
                        "ngram": {
                            "type": "text",
                            "analyzer": "analyzer_ngram"
                        }
                    }
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
