'use strict';

const create_index = {
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
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
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
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "codigoProductos": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
              }
            },
            "analyzer": "analyzer_custom_standard"
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
          "esSubCampania": {
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
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
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
                "analyzer": "analyzer_edge_ngram"
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
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
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "materialGanancia": {
            "type": "boolean",
            "null_value": false
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
          "seccion1": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              },
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
              }
            },
            "analyzer": "analyzer_custom_standard"
          },
          "textoBusqueda": {
            "type": "text",
            "fields": {
              "ngram": {
                "type": "text",
                "analyzer": "analyzer_edge_ngram"
              },
              "phonetic": {
                "type": "text",
                "analyzer": "analyzer_phonetic"
              },
              "synonym": {
                "type": "text",
                "analyzer": "analyzer_synonym"
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
    },
    "settings": {
      "index": {
        "refresh_interval": "1s",
        "number_of_shards": "5",
        "analysis": {
          "filter": {
            "synonym_graph": {
              "type": "synonym_graph",
              "synonyms": [
                "anillos, aro, aros, argolla, argollas, sortija, sortijas, joya, joyas",
                "antiedad, antiedades, rejuvenecedora, rejuvenecedoras, serum, arrugas, arruga, antiarrugas, antiarruga",
                "bijouterie, biyuteri, bisuteri, bisuteria, bishuteri, aretes, arete, zarcillo, zarcillos, pendiente, pendientes, joya, joyas, aros, aro, pantallas, pantalla",
                "argollas, argolla, arrancadas, arrancada, aros, aro, candongas, candonga",
                "base, bases, mousse",
                "bebe, bebes, niño, niños, infante, infantes, crío, críos, infantil, infantiles, baby, babys, nene, nenes, criatura, criaturas",
                "billetera, billeteras, cartera, carteras, billetero, billeteros, monedero, monederos, wallet, wallets",
                "bloqueador, bloqueadores, protector solar, protectorsolar, protectoressolares, protectores solares, bloqueador del sol, bloqueadordelsol, bloqueadores del sol, bloqueadoresdelsole, crema solar, cremasolar, cremas solares, cremassolares, pantalla solar, pantallasolar, pantallassolares, pantallas solares, multipantalla solar, multipantallasolar, multipantallas solares, defense, block",
                "bolso, bolsos, morral, morrales, bulto, bultos",
                "brocha, brochas, pincel, pinceles, escobilla, escobillas, cepillo, cepillos, difuminador, difuminadores, esponja, esponjas",
                "bronceador, bronceadores, bronz",
                "collar, collares, gargantilla, gargantillas, alhaja, alhajas, cadena, cadenas, cadenilla, cadenillas, choker, chokers",
                "correa, correas, cinturón, cinturones, cincho, cinchos, faja, fajas",
                "corrector, correctores, anti ojeras, antiojeras, anti ojera, antiojera, anti manchas, antimancha, anti mancha, antimanchas, disimulador, disimuladores, cubre ojeras, cubreojeras, cubreojera, cubre ojera, perfeccionador, perfeccionadores, contorneador, contorneadores",
                "crema, cremas, loción, lociones, pomada, pomadas, ungüento, ungüentos, mascarilla, mascarillas, serum, facial, fasial, faciales, fasiales, suero, sueros",
                "cuerpo, cuerpos, corporal, corporales, torso, torsos, tronco, troncos",
                "delineador, delineadores, lapiz, lapices, eyeliner, contorno, contornos, borde, bordes, bordeador, bordeadores, delinealabios, delinea labios, delinea labio",
                "desenredante, desenredantes, crema de cabello, cremas de cabellos, crema de pelo, cremas de pelo, muss, crema para peinar, cremas de peinar, gel, geles",
                "desmaquillador, desmaquilladores, quita maquillaje, quitamaquillaje, quitamaquillajes, quita maquilljes, bifásico, bifásicos, limpia rostro, limpiarostro, limpia rostros, limpiarostros, desmaquillante, desmaquillantes, limpiador, limpiadores",
                "desodorante, desodorantes, antitranspirante, antitranspirantes, roll on",
                "dije, dijes, charm, charms",
                "esmalte, esmaltes, barniz, barnices, pintura, pinturas, manicure, pintauñas, pinta uñas, pinta uña, pintauña",
                "estuche, estuches, neceser, neceseres, cosmetiquera, cometiquero, cosmetiqueras, cosmetiqueros, kits, kit",
                "femme, mujer, mujeres, señora, señoras, dama, damas, femenino, femeninos, fémina, féminas, señorita, señoritas",
                "ganchos, gancho, broches, brocha, trabas, traba, vinchas, vincha, hebillas, hebilla",
                "iluminador, iluminadores, glow, glows, highlighter",
                "incentivos, incentivo, premios, premio, bonificaciones, bonificación",
                "labial, lapices, lapiz de labios, lapices de labios, labial en barra, labiales en barra, lipstick, lipsticks, gloss, carmín, carmines, lapiz labial, lapices labiales, crayón de labios, crayones de labios, pintalabios, pintalabio, colorete, coloretes, brillo, brillos, bálsamo, bálsamos",
                "l'bel, lebel, lbel, level",
                "lentes, lente, Gafas, gafa, anteojos, ante ojos, anteojo, ante ojo, lunas, luna",
                "liquidación, liquidaciones, expofertas, expoferta",
                "look, looks, estilo, estilos",
                "maletín, maletines, morral, morrales",
                "maquillaje, maquillajes, cosmético, cosméticos",
                "máscara, máscaras, pestañina, pestañinas, peztanina, peztañina, peztañinas, rímel, rímels, rimmel, rimmels, máscara de ojos, máscaras de ojos, máscara de ojo, máscara de pestañas, máscara de pestaña, máscaras de pestañas",
                "mejillas, mejilla, cachete, pómulo, cachetes, pómulos",
                "mochila, mochilas, bolsos, bolso, morral, morrales, cartera, carteras",
                "monedero, monederos, sencillera, sencilleras",
                "ofertas, oferta, descuentos, descuento",
                "ojos, ojo, vista, vistas, mirada, miradas, párpado, párpados",
                "pelo, pelos, cabello, cabellos, cabellera, cabelleras, lacios, rulo, cabezas, onda, melenas, mechones, peluquines, pelambre, lacio, rulos, cabeza, ondas, melena, cabellera, mechón, peluquín",
                "perfume, fragancias, colonias, fragancia, colonia, agua de colonia, aguas de colonia, escencias, perfumes, aromas, olores, sprays, esencia, aroma, olor, parfum, eau de toilette, parfum, eau de parfum, spray",
                "piel, pieles, cutis, dermo",
                "plumón, plumones, pinceles, delineadores, pincel, delineador",
                "polo, polos, poleras, camisetas, playeras, t-shirts, camisas, blusas, polera, camiseta, playera, t-shirt, camisa, blusa",
                "porta lentes, porta lente, portalentes, portalente, portagafas, portagafa, porta gafa, porta gafas",
                "probador, probadores, muestras, muestra, mostradores, demostradores, mostrador, demostrador",
                "pulsera, pulseras, esclavas, muñequeras, brazaletes, joyas, esclava, muñequera, brazalete, joya",
                "reloj, relojs, relog, relojes, reloges, relogs",
                "rostro, rostros, caras, semblantes, jetas, faces, cara, semblante, faz, jeta",
                "rubor, rubores, polvo, chapa, polvos, chapas",
                "shampoo, shampoos, champus, champu, shampu",
                "tajador, tajadores, taja lapices, lajalapices, taja lapiz, tajalapiz, sacapuntas, sacapunta, saca punta, saca puntas, afilalápiz, afila lápiz, afilalapices, afila lapices, cortalapiz, corta lapiz, corta lapices, cortalapices, talladores, afilalápices, cortalápices, tallador",
                "talco, talcos, pie, pies, pieses, pezuña, pezuñas, pesuñas, pesuña",
                "tono, tonos, colores, color",
                "tratamiento, tratamientos, rutinas, régimenes, cuidados, rutina, régimen, cuidado",
                "x-tra time, extra time, xtra time, extratime, xtratime"
              ]
            },
            "phonetic_filter": {
              "languageset": [
                "spanish",
                "english",
                "french"
              ],
              "type": "phonetic",
              "encoder": "beider_morse"
            },
            "spanish_stop": {
              "type": "stop",
              "stopwords": [
                "_spanish_"
              ]
            }
          },
          "char_filter": {
            "char_filter_remover": {
              "type": "mapping",
              "mappings": [
                "' => ",
                "` => ",
                "´ => ",
                "° => ",
                "º => "
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
              "char_filter": [
                "char_filter_remover"
              ],
              "type": "custom",
              "tokenizer": "standard"
            },
            "analyzer_edge_ngram": {
              "filter": [
                "standard",
                "lowercase",
                "asciifolding",
                "spanish_stop"
              ],
              "char_filter": [
                "char_filter_remover"
              ],
              "type": "custom",
              "tokenizer": "tokenizer_edge_ngram"
            },
            "analyzer_phonetic": {
              "filter": [
                "standard",
                "lowercase",
                "spanish_stop",
                "phonetic_filter"
              ],
              "char_filter": [
                "char_filter_remover"
              ],
              "type": "custom",
              "tokenizer": "standard"
            },
            "analyzer_synonym": {
              "filter": [
                "standard",
                "lowercase",
                "synonym_graph",
                "asciifolding",
                "spanish_stop"
              ],
              "char_filter": [
                "char_filter_remover"
              ],
              "type": "custom",
              "tokenizer": "standard"
            }
          },
          "tokenizer": {
            "tokenizer_edge_ngram": {
              "token_chars": [
                "letter",
                "digit"
              ],
              "min_gram": "4",
              "type": "edge_ngram",
              "max_gram": "11"
            }
          }
        },
        "number_of_replicas": "1"
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