
const CardType = {
    Ataque: 'ataque',
    Apoyo: 'apoyo',
    Defensa: 'defensa',
    Magia: 'magia',
    Historia: 'historia'
};

const ObtainingMethod = {
    FromNox: 'Obtenida directamente del mazo NOX',
    FromStory: 'Obtenida directamente del mazo de historia',
    FromPlayToHand: 'Obtenida jugándola del mazo NOX',
    FromPlayToTrash: 'Descartada jugándola del mazo NOX',
    FromHandToTrash: 'Descartada desde tu mano',
    FromTrashToHand: 'Recuperada de los descartes',
};

const cards = [
    {
        index: 1,
        type: CardType.Defensa,
        options: [
            {
                text: "Te sinceras",
                info: "Le cuentas sobre tu investigación y compartes con ellos tus inquietudes. El Comandante de la " +
                    "guardia, agradecido por tu sinceridad simpatiza con tu noble misión y te ofrece escolta " +
                    "mientras descansas y un amuleto para que lo lleves en tu aventura. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Mientes",
                info: "No te fías. Piensas que se burlarán de ti así que les cuentas que eres una rana guerrera " +
                    "que está de viaje de vuelta de una batalla. El comandante ve en tu mirada que se trata de una " +
                    "vil mentira. Encolerizado, tira de las riendas de su caballo y guía a su guardia a pasar por " +
                    "encima de ti dejándote tendido en el suelo aturdido, a tu suerte. Continúas tu aventura con " +
                    "graves dolencias. No obtienes la carta. Deja la carta en el mazo de descarte. Y continúas tu " +
                    "aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 2,
        type: CardType.Ataque,
        options: [
            {
                text: "Aceptar",
                info: "Tomas el martillo sin saber muy bien por qué. El espíritu te observa satisfecho. " +
                    "Te acercas a la forja y trabajáis juntos, rodeados de un calor infernal. El metal brilla " +
                    "como si contuviera algo vivo, algo peligroso. A cada golpe, el martillo te quema la piel, " +
                    "pero la euforia crece. Te fundes con el ritmo, en una danza demoníaca de chispas y sudor. " +
                    "Al terminar, el herrero contempla la hoja con orgullo, te lanza una sonrisa ardiente... " +
                    "y desaparece. Pierdes una carta aleatoria de tu mano. Deja esta carta y otra de tu mano en " +
                    "el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Retar",
                info: "Lo miras desafiante. Le propones una competencia, quien forje la espada más brillante, gana. " +
                    "Su risa es una carcajada desencajada. Gana el que forje con más fulgor... y el perdedor deberá " +
                    "un favor con gran fervor. El fuego se aviva. Lanza una moneda: Cara: ganas. Guárda la carta en " +
                    "tu mano. Y continúas tu aventura donde estabas. Cruz: pierdes. Deja la carta en el mazo de " +
                    "descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: true,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Engañar",
                info: "Aceptas su propuesta y finges trabajar junto a él. El calor es insoportable, y el espíritu " +
                    "parece disfrutar del sufrimiento. En un descuido, agarras la hoja al rojo vivo y huyes con " +
                    "ella entre las llamas. El grito que lanza detrás de ti no parece humano, pero ya es tarde. " +
                    "Escapas ardiendo, pero con el botín. Obtienes la carta. Guárdala en tu mano. Y continúas tu " +
                    "aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Escapar",
                info: "La visión te supera. El calor, la mirada del espíritu, las llamas... todo es demasiado. " +
                    "Das media vuelta y corres como puedes entre el fuego. Él te observa alejarte y solo suelta una " +
                    "risa cavernosa antes de volver a golpear el yunque. No ocurre nada. Sigues tu camino. Deja la " +
                    "carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 3,
        type: CardType.Ataque,
        options: [
            {
                text: "Pelear",
                info: "Si tienes una carta de ataque en tu mano obtienes la carta, sino déjala en el mazo de " +
                    "descarte. Obtienes la carta si tienes una carta de ataque en tu mano. Sino descártala. " +
                    "Continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huir",
                info: "Lanza una moneda. Cara: Pierdes dos cartas Nox al azar de tu mano. " +
                    "Deja las cartas en el mazo de descarte. Y continúas tu aventura donde estabas. " +
                    "Cruz: Vuelve a sacar una carta de evento. Deja la carta en el mazo de descarte. " +
                    "Y sacas unas nueva carta de evento.",
                dice: false,
                coin: true,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 4,
        type: CardType.Defensa,
        options: [
            {
                text: "Lazar el dado",
                info: "Si sacas más de un 4, le ganas la apuesta al pirata y te quedas con su botín compuesto por " +
                    "baratijas que le ha robado a otros aventureros. En el botín encuentras unos dados malditos que " +
                    "pueden cambiar el rumbo de tu aventura: Si pierdes una carta puedes recuperarla " +
                    "intercambiándola por esta. Guárdala en tu mano. Y continúas tu aventura donde estabas. " +
                    "Si sacas menos de 4, los bandidos te saquean, se ríen de ti y te arrancan parte de la ropa. " +
                    "El pirata te quita de tu mano el número de cartas que haya salido en el dado. Deja las cartas  " +
                    "en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: true,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huir",
                info: "Si decides huír sin apostar, toda la masa se ríe de ti. Pierdes reputación en otros puertos " +
                    "y pierdes esta carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 5,
        type: CardType.Defensa,
        options: [
            {
                text: "Mover la piedra",
                info: "Un espíritu sale de la piedra y te da la espada de Elduara. Un arma ancestral que te " +
                    "protegerá de algunos peligros. Obtienes la carta. Guárdala en tu mano. Y continúas tu " +
                    "aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dar una patada",
                info: "Un espíritu enfadado sale y te lanza una maldición mientras escuchas: \"Respeta a tus mayores\". " +
                    "Sales del bosque. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 6,
        type: CardType.Magia,
        options: [
            {
                text: "Amuleto",
                info: "El mercader te entrega el amuleto sin emoción alguna. Al colocártelo, sientes un leve hormigueo, " +
                    "pero al mirar al mercader, notas que ha desaparecido, dejando el carro y el caballo vacíos. " +
                    "Cuando te lo quitas, el hormigueo se convierte en un peso insoportable que te recuerda las " +
                    "decisiones que no tomaste. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Daga",
                info: "El mercader sonríe por primera vez mientras coloca la daga en tus manos. " +
                    "Un frío inquietante recorre tu cuerpo, como si un pacto invisible se sellara entre ambos. " +
                    "\"Úsala bien... o no la uses en absoluto\" dice, antes de desaparecer con su carro. " +
                    "Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Frasco",
                info: "El mercader te observa fijamente mientras tomas el frasco. Al beber el líquido, " +
                    "un fuego intenso recorre tus venas. El mercader, sin cambiar de expresión, murmura " +
                    "\"El fuego consume todo, incluso las esperanzas.\" De pronto, todo su carro se desvanece " +
                    "como humo, dejándote solo en la oscuridad. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rechazar",
                info: "El mercader guarda sus objetos en silencio, pero su mirada cargada de reproche te sigue " +
                    "incluso cuando te das la vuelta. \"Siempre hay un precio, aunque no lo pagues\" dice antes " +
                    "de desaparecer. La sensación de haber perdido algo importante te acompaña el resto de tu viaje. " +
                    "Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 7,
        type: CardType.Apoyo,
        options: [
            {
                text: "Resistir",
                info: "El apóstol peregrino nota que te resistes, te considera un enemigo y decide atacarte. " +
                    "Pierdes una carta aleatoria de tu mano y también esta carta. Deja la carta aleatoria y esta " +
                    "en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Entregarte",
                info: "La figura te guía hacia la salida de ese paraje oscuro y te cuenta sobre un amuleto que se " +
                    "encuentra en estas tierras. Al encontrarte sin amparo, el apóstol peregrino decide acerte " +
                    "entrega del amuleto, pues considera que puede hacerte bien. Obtienes la carta. Guárdala en " +
                    "tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 8,
        type: CardType.Magia,
        options: [
            {
                text: "Nada",
                info: "La anciana se ríe a carcajadas y se marcha pronunciando palabras incognoscibles. " +
                    "No ocurre nada. Eso era lo que querías, ¿o no? Pierdes la carta. Deja la carta en el " +
                    "mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Comercio",
                info: "Pierde una carta de evento a tu elección y guarda esta en tu mano. Si no tienes ninguna " +
                    "otra carta descarta esta. Continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Medicina",
                info: "Recupera una carta de evento que hubieses descartado y descarta esta. Si no has descartado " +
                    "ninguna te quedas esta en tu mano. Continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Videncia",
                info: "Videncia. Ves aquello que debes ver. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
        ]
    },
    {
        index: 9,
        type: CardType.Ataque,
        options: [
            {
                text: "Huir",
                info: "Huir. Pataleas hasta encontrar un borde firme. Sales del agua jadeando. " +
                    "Pero al ponerte en pie, sientes que algo dentro de ti late con un ritmo ajeno. " +
                    "No sabes qué es y no sabes si se irá. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Pescar",
                info: "Pescar. Hundes la mano en el agua con decisión. Algo muerde. Tiras, y la criatura emerge " +
                    "retorciéndose, aún viva pese a su estado. Te mira sin ojos. No sabes si la has sacado tú o " +
                    "si se ha dejado atrapar. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rezar",
                info: "Rezar. Cierras los ojos. Las palabras salen solas, sin sentido. La criatura se detiene " +
                    "frente a ti, como si escuchara algo más antiguo que tú. Luego, se da la vuelta y desaparece " +
                    "entre las aguas.  Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Miccionar",
                info: "Miccionar. No puedes evitarlo. El calor se mezcla con el agua, y eso basta. " +
                    "Algo se lanza sobre ti desde abajo, y aunque logras apartarte, sientes el mordisco " +
                    "clavarse más allá de la piel. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 10,
        type: CardType.Magia,
        options: [
            {
                text: "Romper el sello y abrir el libro",
                info: "Con determinación, intentas romper el sello. Cuando lo logras, una energía oscura surge del " +
                    "libro y envuelve el ambiente. Las páginas empiezan a pasar solas hasta que se detienen en un " +
                    "pasaje que brilla intensamente. \"Ahora eres quien porta el conocimiento prohibido.\" Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Llevarte el libro",
                info: "Guardas el libro cuidadosamente, esperando encontrar la forma de descifrar su contenido más adelante. " +
                    "Sin embargo, el peso del libro parece aumentar con cada paso, y una voz susurra \"No mereces tal honor. Aún.\" " +
                    "El libro desaparece de tu bolsa sin dejar rastro. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 11,
        type: CardType.Ataque,
        options: [
            {
                text: "La ayudas",
                info: "La coges en brazos y te dispones a trasportarla, pero nada mas cargarla te muerde el abdomen. " +
                    "Era una trampa! Es un ser marino malvado que se aprovecha de los confiados viajeros para " +
                    "morderlos y llevárselos a su río putrefacto lleno de cadáveres. Te arrastra hasta el fondo " +
                    "del río. Despiertas sofocado. Solo había sido una pesadilla. Pierdes la carta. Deja la carta " +
                    "en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "No la ayudas",
                info: "Desconfías. Te vas mientras escuchas los gritos de ese ser marino malvado que quería " +
                    "comerse tus entrañas. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 12,
        type: CardType.Ataque,
        options: [
            {
                text: "Atacar",
                info: "Te avalanzas contra ese ser, pero te lanza contra un árbol y te debilita. Pierdes la carta. " +
                    "Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Esconderte y  esperar",
                info: "La enorme criatura se marcha a proteger el rebaño y por el camino se le cae un objeto " +
                    "metálico que llevaba entre su pelo. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 13,
        type: CardType.Magia,
        options: [
            {
                text: "Seguirla por el camino corto",
                info: "Comienzas a andar junto a la anciana, te comenta que tiene documentos importantes que no " +
                    "desea mojar. Llegas rápidamente al lago, pero notas que es bastante profundo. Intentas nadar " +
                    "pero te hundes poco a poco en el agua mientras miras a la anciana reír en la orilla. " +
                    "Despiertas donde estabas. ¿Era un sueño? Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Irte por tu cuenta",
                info: "Prefieres seguir el camino más seguro. La anciana grita de dolor y te ruega que la sigas " +
                    "mientras su cuerpo se convierte en una estatua de sal. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 14,
        type: CardType.Magia,
        options: [
            {
                text: "Tirar moneda",
                info: "Cara: El lobo te ofrece su protección durante tu viaje. Guarda esta carta y podrás usarla para " +
                    "no perder una carta aleatoria una vez. Cuando la uses deberás descartarla. " +
                    "Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas. " +
                    "Cruz: El lobo se marcha sin hacerte nada. Devuelve la carta al mazo para que otros viajeros " +
                    "puedan encontrarse con este ser magnífico. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: true,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 15,
        type: CardType.Magia,
        options: [
            {
                text: "Enfrentarla",
                info: "Intentas coger su mano, pero la atraviesas como si fuera un fantasma. " +
                    "Carro y anciana desaparecen instantáneamente. Parece que no ha pasado nada, pero la " +
                    "mala fortuna te acecha... Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Quedarte",
                info: "Te das cuenta de que es una anciana muy afable y bondadosa. Se siente sola debido a aquellas " +
                    "leyendas urbanas que no eran más que habladurías de taberna y te invita a tomar un té con " +
                    "pastelitos caseros en su carromato. Llámala en tu mente cuanto te sientas sin dirección y " +
                    "ella te guiará. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 16,
        type: CardType.Magia,
        options: [
            {
                text: "Rezar",
                info: "Miras dentro de tu zurrón, y te avergüenzas de no tener algo del valor suficiente. " +
                    "Aún así, decides ofrecer algo de lo que tienes con tal de sobrevivir, te arrodillas y " +
                    "rezas a los dioses con plegarias y cánticos que escuchabas de renacuajo en el templo. " +
                    "Los dioses lo entienden, tu corazón es puro, y aceptan tu ofrenda. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Beber",
                info: "La desesperación te consume. No tienes tiempo para más enigmas y acertijos. " +
                    "Sin importarte lo imprudente que sea, estiras la mano para rellenar tu cantimplora. " +
                    "Los dioses se lo toman como un insulto. Quieres robar de ellos, y como castigo, el agua " +
                    "clara del pozo pronto se convierte en fango, negro y viscoso que parece que vaya a " +
                    "absorberte a sus profundidades. Te vas ahogando poco a poco hasta que despiertas y " +
                    "vuelves a estar de pie, al lado del pozo, como si todo hubiese sido un sueño. Pierdes la " +
                    "carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 17,
        type: CardType.Defensa,
        options: [
            {
                text: "Distraerlo",
                info: "Encuentras una piedra reluciente en el suelo y la lanzas lejos. El sapo gira lentamente " +
                    "la cabeza hacia el destello. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Retroceder",
                info: "Das unos pasos atrás y estudias a la criatura. Descubres que cada cierto tiempo cierra " +
                    "los ojos unos segundos... el momento justo para pasar. Esperas a ese segundo y consigues pasar " +
                    "sin problema. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Correr",
                info: "El impulso te domina y echas a correr. El sapo no te sigue... pero en el apuro, tropiezas " +
                    "y pierdes algo importante. Pierdes una carta aleatoria de tu mano y también esta carta. " +
                    "Deja la carta aleatoria y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Asustarlo",
                info: "Gritas y das palmadas esperando intimidarlo. El sapo no se asusta. Solo se enfada. " +
                    "El sapo golpea el suelo con fuerza y te hace salir despavorido del lugar. Pierdes la carta. " +
                    "Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 18,
        type: CardType.Magia,
        options: [
            {
                text: "Ir hacia la luz",
                info: "Poco a poco se van encendiendo más fuegos por el camino. Has de seguirlos de cerca, " +
                    "deben saber que aún sigues ahí. Una vez el camino acaba, la última luz te lleva a un " +
                    "lugar muy tranquilo. Has conseguido un lugar donde descansar. Te acurrucas en un lecho " +
                    "y descansas, pero cuando despiertas te falta una carta. ¿Quién encendió esos fuegos? " +
                    "¿Era una trampa? Pierdes una carta aleatoria de tu mano y obtienes esta carta. Deja la " +
                    "carta aleatoria en el mazo de descarte y guarda esta en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Ir hacia la oscuridad",
                info: "No te fías de lo que ves. Crees que puede ser una trampa, así que decides desviarte y no " +
                    "hacer caso a lo que has visto. Acabas caminando y pasando cada vez más frío hasta que " +
                    "desfalleces y caes al suelo. Te golpeas la cabeza y hace que te despiertes. " +
                    "¿Era todo un sueño? Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 19,
        type: CardType.Magia,
        options: [
            {
                text: "Pagar",
                info: "Pagas a la curandera por su remedio. Ella extrae de su bolsa un ungüento que huele a " +
                    "tierra húmeda y raíces viejas, y te lo aplica con dedos firmes y sabios. Una energía " +
                    "cálida recorre tu cuerpo, te sientes más ligero, más vivo. Recuperas fuerzas, pero el " +
                    "precio es dejar ir algo que llevabas contigo. Pierdes una carta a tu elección de tu mano " +
                    "y obtienes esta carta. Deja la carta elegida en el mazo de descarte y esta en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Te marchas",
                info: "Decides no pagar y te marchas. Rechazas su ayuda, y con ella, la promesa de alivio. " +
                    "Continúas, pero cada paso es un castigo. El frío se clava en tus huesos, el dolor te " +
                    "dobla. Avanzas, sí, pero el desgaste se adhiere a ti como una sombra que ya no podrás " +
                    "sacudir. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 20,
        type: CardType.Magia,
        options: [
            {
                text: "Entrar en el círculo",
                info: "Aceptas formar parte del aquelarre. Las brujas y brujos caminan a tu lado, compartiendo " +
                    "poder y destino. Pero ten en cuenta que si uno cae, el vínculo se rompe... y el desastre " +
                    "os alcanzará a todos. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Te resistes",
                info: "Cierras los ojos. Cuando los abres, solo queda el viento. El círculo se ha desvanecido " +
                    "y tu vínculo con lo oculto se disuelve. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 21,
        type: CardType.Apoyo,
        options: [
            {
                text: "Aceptar",
                info: "Si aceptas su oferta debes descartar dos cartas, las que tu quieras, y obtendrás esta carta " +
                    "que te protegerá al final del juego. Obtienes la carta. Guárdala en tu mano y descarta dos, si " +
                    "no tienes ninguna pierdes esta. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rechazar",
                info: "Unos brazos salen de la ermita y te atrapan en su interior. Te conviertes en el anciano, " +
                    "atrapado en la ermita hasta tu muerte. Cuando mueres despiertas y vuelves a donde estabas " +
                    "antes para continuar tu camino. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Irte",
                info: "Si no entras, la ermita desaparece, arrastrada por tentáculos a las profundidades. " +
                    "Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Patear la cruz",
                info: "Prosigues el camino, pero con una maldición. El guardián te observa de cerca; quiere " +
                    "ver cómo continúa tu aventura y no parará de vigilarte hasta que termine. Tienes la carta, " +
                    "sí, pero el precio a pagar es una sombra maldita de la que no podrás despegarte. " +
                    "Obtienes la carta. Guárdala en tu mano. Y continúa tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 22,
        type: CardType.Apoyo,
        options: [
            {
                text: "Aceptar la hospitalidad",
                info: "El interior de la posada es cálido y acogedor, decorado con un estilo antiguo y " +
                    "objetos extraños que parecen observarte. Las Guardianas te sirven un caldo humeante " +
                    "y te acomodan en una habitación. \"Ahora eres parte de nuestro hogar,\" susurran en " +
                    "la oscuridad de la noche. Despiertas con una extraña sensación de haber descansado, " +
                    "pero con un escalofrio que recorre tu cuerpo. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rechazar la invitación",
                info: "Mientras te alejas, escuchas sus voces detrás de ti, llamándote con dulzura. " +
                    "Al voltear, la posada ya no está allí, pero sientes que una sombra te sigue, " +
                    "susurrándote que siempre tendrás un lugar a donde volver. Pierdes la carta. " +
                    "Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 23,
        type: CardType.Apoyo,
        options: [
            {
                text: "Entrar al campanario",
                info: "Subes las escaleras crujientes hasta llegar al campanario. Allí encuentras una campana " +
                    "enorme, cubierta de polvo y telarañas. Cuando la tocas, sientes una vibración profunda " +
                    "que resuena en tu interior, como si algo invisible se despertara. \"El eco de tu destino " +
                    "ha comenzado,\" susurra una voz etérea. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Observarlo desde el exterior",
                info: "Das vueltas alrededor de la torre, buscando algo fuera de lo común. Notas que las piedras " +
                    "parecen haber sido reemplazadas en varias partes, como si alguien hubiera tratado de repararlas. " +
                    "Al tocar una de ellas, un leve temblor recorre el suelo, pero nada más sucede. Te alejas de la " +
                    "torre, pero con cada paso, sientes una punzada de duda. ¿Y si el campanario guardaba respuestas " +
                    "a preguntas que ni siquiera has formulado aún? El sonido de una campana resuena a lo lejos, " +
                    "aunque nunca miras atrás. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 24,
        type: CardType.Defensa,
        options: [
            {
                text: "Abrir la caja",
                info: "Abres la caja. Y ves en su interior unas palabras talladas \"Ante cualquier malignidad, " +
                    "esta caja podrás usar\". Puedes usarla como escudo ante cualquier evento que implique un " +
                    "descarte o un intercambio de cartas. Al activarla, la caja absorbe el mal, librándote del " +
                    "efecto. Pero, al usarla, la perderás. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dejarla cerrada",
                info: "La dejas cerrada. No te atreves a tocarla. Quizá por prudencia, o quizá por miedo. " +
                    "Cuando vuelves a mirar, la caja ha desaparecido. Pierdes la carta. Déjala en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 25,
        type: CardType.Defensa,
        options: [
            {
                text: "Seguir a la señora",
                info: "Necesitas recibir algún tipo de explicación de quién es esa señora y el porqué te ha dado a " +
                    "ti el colgante. Es por ello que decides seguir a la mujer de larga túnica y al encontrártela " +
                    "cara a cara te dice que no tiene tiempo de responder preguntas. Se desvanece en la oscuridad " +
                    "y cuando miras tus manos ya no tienes el collar. Pierdes la carta. Déjala en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Observar el collar",
                info: "Ves un altar construido con ruinas del lugar y consideras que es perfecto para apreciar mejor " +
                    "el colgante. Por su apariencia antigua y enigmática parece provenir de alguna bruja. Mientras lo " +
                    "estás mirando en el altar cambia su forma y ahora brilla mas que antes. Se ilumina y te indica " +
                    "la salida. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 26,
        type: CardType.Defensa,
        options: [
            {
                text: "Destruir el espejo",
                info: "La idea de cargar con un objeto tan peligroso no te convence. Decides golpearlo con una roca " +
                    "y arrojarlo al vacío. Mientras lo haces, te preguntas si su poder podría haber sido clave para " +
                    "algo importante. Pierdes la carta. Déjala en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Vender el espejo",
                info: "Ves el espejo como una oportunidad, pero no para usarlo. Decides buscar a alguien dispuesto " +
                    "a pagarte un alto precio o intercambiarlo por algo igual de valioso. Al contar la historia en " +
                    "un bazar, lo abren sin que te dé tiempo a decir que estaba maldito, y el dueño de la tienda " +
                    "queda petrificado con el espejo en las manos. ¡La historia era cierta! Tapas el espejo y " +
                    "comprendes que es demasiado peligroso para dejarlo por ahí. Lo guardas en tu zurrón por " +
                    "si alguna vez hace falta. Quizá te proteja del peligro. Lo puedes usar una vez para no " +
                    "perder una carta. Después de usarlo, tendrás que descartarlo. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 27,
        type: CardType.Apoyo,
        options: [
            {
                text: "Coger un frasco",
                info: "Te acercas sigilosamente y coges uno de los frascos. Observas en la etiqueta que cuelga " +
                    "del tapón que se trata de una pócima capaz de cambiar tu apariencia temporalmente. Te lo " +
                    "guardas en el zurrón y consigues escapar de ahí sin que te vean. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Seguirle",
                info: "Te armas de valor y, con mucha cautela, sigues sus pasos hasta llegar a unas escaleras " +
                    "que conducen a un sótano en el que es imposible ver nada debido a la falta de luz. Al bajar, " +
                    "tropiezas y caes, perdiendo el conocimiento. Cuando despiertas, vuelves a estar donde estabas, " +
                    "pero con un extraño dolor de cabeza. ¿Habrá sido todo un sueño?. Pierdes la carta. Déjala en " +
                    "el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 28,
        type: CardType.Defensa,
        options: [
            {
                text: "Has construido el castillo",
                info: "La piedra se acomoda y el castillo expide una melodía gloriosa. El camino se abre de par " +
                    "en par, ahora posees el título de \"La Mano de Piedra\" y obtienes la \"Protección Pétrea\", " +
                    "guarda esta carta y úsala como armadura ante los golpes del destino. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Tu castillo se ha derrumbado",
                info: "El castillo de naipes de piedra se derrumba y cae encima del sendero causándote graves " +
                    "daños de salud. Has deshonrado a la roca, quedas desterrado para siempre de este lugar. " +
                    "Las cartas ya no son tus aliadas. Continúas tu camino cojeando. Pierdes una carta aleatoria " +
                    "de tu mano y también esta carta. Deja la carta aleatoria y esta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 29,
        type: CardType.Apoyo,
        options: [
            {
                text: "Aceptar",
                info: "Pierdes una carta a elegir de tu mano. A cambio te quedas esta carta y la bendición del " +
                    "vagabundo.Obtienes la carta. Guárdala en tu mano y descarta otra, si no tienes ninguna " +
                    "pierdes esta. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "No aceptar",
                info: "Al anochecer el lago cambia y se transforma en un portal, donde monstruos deformes te " +
                    "agarran y te llevan al lago causando tu muerte. Despiertas donde estabas, todo había sido " +
                    "una horrible pesadilla. Pierdes una carta aleatoria de tu mano y también esta carta. " +
                    "Deja la carta aleatoria y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Alimentar",
                info: "Le das parte de tu comida para ese día. Pasarás algo de hambre, pero sobrevivirás. " +
                    "El vagabundo asiente con la cabeza mientras come. Pierdes la carta. Déjala en el mazo " +
                    "de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Ignorar",
                info: "En cuanto te vas dejando atrás al vagabundo miras tus pertenencias y descubres que " +
                    "faltan cosas. Pierdes tres cartas aleatorias de tu mano y también esta carta. Deja las " +
                    "cartas aleatorias y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 30,
        type: CardType.Ataque,
        options: [
            {
                text: "Le das agua",
                info: "Sacas tu cantimplora y le entregas un poco de agua, manteniéndote alerta. El anciano bebe " +
                    "lentamente y, cuando termina, te ofrece un líquido dentro de una botella de cristal. Te " +
                    "cuenta que se trata de un elixir que te dará más fuerza y resistencia durante un tiempo " +
                    "limitado. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huyes",
                info: "Respondes con firmeza que no puedes compartir tu agua y continúas tu camino. El anciano " +
                    "te agarra súbitamente del brazo con una fuerza sobrehumana. Despiertas pasadas unas horas " +
                    "con marcas en tu cuerpo, arañazos y heridas con sangre coagulada. Además de tener muy poca " +
                    "salud, el \"anciano\" te ha robado. Pierdes tres cartas aleatorias de tu mano y también " +
                    "esta carta. Deja las cartas aleatorias y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 31,
        type: CardType.Ataque,
        options: [
            {
                text: "Unirse",
                info: "Extiendes una mano hacia el líder, se desfigura tu rostro y te entrega una máscara blanca " +
                    "que debes portar el resto de tu aventura. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Enfrentarlos",
                info: "Sabes que no puedes huir, el miedo te supera y te quedas anclado al sitio. La mano " +
                    "del lider te traspasa y sientes como has perdido algo valioso, mas allá de lo material. " +
                    "Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 32,
        type: CardType.Ataque,
        options: [
            {
                text: "Esperar a que se marche",
                info: "Te acurrucas y te ocultas en silencio, cuando la criatura se aleja. Decides aguardar unos " +
                    "minutos más para asegurarte y poder regresar por donde viniste. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huir",
                info: "Los nervios te invaden. Quieres salir de ahí cuanto antes, parece que estás en el rango " +
                    "para que te perciba, así que te pones en posición para volver por dónde viniste. Llevas un " +
                    "rato caminando cuando, sin querer, pisas una rama seca que, con el silencio de aquel lugar, " +
                    "puede haber alertado a la vil criatura. Aguardas apenas unos instantes para escuchar, cuando, " +
                    "efectivamente, sientes que algo comienza a acercarse a ti. Decides correr todo lo rápido que " +
                    "te permite las piernas, pero unas garras te alcanzan. Acabas en el suelo, boca arriba, y te " +
                    "quedas paralizado por el rostro demacrado que tienes frente a ti, pero en un instante de " +
                    "valentía, con tu mano derecha agarras un palo y asestas un golpe con todas tus fuerzas en " +
                    "la nuca del extraño cuerpo. Al quedar inconsciente aprovechas para escapar, pero con algunas " +
                    "heridas y habiendo perdido un par de cartas. Pierdes dos cartas aleatorias de tu mano y " +
                    "también esta carta. Deja las cartas aleatorias y esta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 33,
        type: CardType.Ataque,
        options: [
            {
                text: "Atravesar",
                info: "Cada respiro se vuelve un desafío, un veneno invisible llena tus pulmones. " +
                    "Tu visión se nubla, tus fuerzas flaquean. Si tienes menos de 10 cartas en tu mano, " +
                    "la niebla consume parte de tu ser. Pierdes una carta aleatoria de tu mano y también " +
                    "esta carta. Deja la carta aleatoria y esta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas. Si tienes 10 o más, logras atravesar el camino sin " +
                    "problema. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Consumir",
                info: "Permites que lo que haya en el aire penetre dentro de ti. Te sientes abrumado, confuso y " +
                    "algo mareado. Cuando terminas de consumirla, tu pulso se acelera. Necesitas moverte, mucho. " +
                    "No pierdes el tiempo y aceleras el paso, ya que aún te queda aventura por delante. Obtienes " +
                    "la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Instinto",
                info: "Decides quedarte inmóvil por un momento, forzando tus sentidos a percibir algo a través " +
                    "de la niebla. Ves cómo se abre ante ti un nuevo camino. Pierdes la carta. Deja la carta en " +
                    "el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huir",
                info: "Intentas volver sobre tus pasos, pero solo logras perderte aún más. Pierdes la carta. " +
                    "Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 34,
        type: CardType.Defensa,
        options: [
            {
                text: "Negar",
                info: "Niegas con miedo la oferta, pero cuando te quieres dar cuenta, ya estás caminando entre " +
                    "los muertos... Parece que han pasado años, pero cuando logras hacer el relevo con otro pobre " +
                    "diablo, te encuentras en el mismo sitio donde empezó todo. La travesía te cuesta una carta " +
                    "de tu mazo, aunque parece que puedes continuar tu aventura. Pierdes una carta aleatoria de " +
                    "tu mano y también esta carta. Deja la carta aleatoria y esta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Aceptar",
                info: "Agarras el talismán con firmeza. El hombre se queda impresionado con tu actitud y te da las " +
                    "gracias entre lágrimas. Los espíritus se ven complacidos con tu decisión, pero te toca hacer " +
                    "la penitencia de igual forma. Los meses pasan y el cansancio se junta con el hambre. Tus " +
                    "acompañantes se quedan complacidos con tu devoción, así que deciden librarte de la carga. " +
                    "Cuando vuelves a abrir los ojos, te encuentras en el mismo punto donde empezó todo. Parece " +
                    "como si el tiempo se hubiera congelado en tu ausencia. Ves al hombre que salvaste, que quiere " +
                    "ayudarte en tu viaje. Puedes recuperar una carta de evento que hubieses descartado y descartar " +
                    "esta. Si no has descartado ninguna, te quedas esta en tu mano y puedes usarla más adelante. " +
                    "Obtienes la carta. Guárdala en tu mano o úsala. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Correr",
                info: "Huyes a toda velocidad ante la situación, pero ves cómo tu alrededor no para de repetirse. " +
                    "Cuando echas una mirada atrás, un espíritu extiende su mano hacia tu rostro con decepción. " +
                    "El gélido contacto te hace soltar un aliento que parece arrancarte el alma, y te quedas " +
                    "inerte en el suelo mustio mientras todo se nubla alrededor. Pierdes una carta aleatoria de " +
                    "tu mano y también esta carta. Deja la carta aleatoria y esta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rezar",
                info: "Ignoras la petición y te pones a susurrar una nana que te cantaba tu madre para ahuyentar " +
                    "a los malos espíritus. Cuando intentan tocarte, un aura brillante te protege y repele su " +
                    "contacto. La procesión, viendo que no puede conseguir que te unas a ellos, continúa su viaje " +
                    "mientras te analiza con la mirada a su paso. Cuando los pierdes de vista, dejas de cantar y te " +
                    "limpias el sudor de la frente. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 35,
        type: CardType.Ataque,
        options: [
            {
                text: "Aceptas",
                info: "Decides ayudarla pero cuando te das cuenta de que las manchas no se van, no puedes moverte " +
                    "del sitio. La lavandera te ha pegado su maldición. Pierdes la carta. Deja la carta en el mazo " +
                    "de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Te vas",
                info: "Dices que tienes prisa y te vas. La lavandera intenta seguirte pero tu rapidez producida " +
                    "por el pánico te hace huir. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 36,
        type: CardType.Magia,
        options: [
            {
                text: "Acabar el trabajo comértelo",
                info: "El segundo conejo corre la misma suerte. Cuando solo quedan los huesos, los echas al fuego " +
                    "en el que los cocinaste para deshacerte de ellos. Un crujido fuerte y grave te saca del " +
                    "pequeño trance provocado por las llamas. La sensación de mal fario vuelve a ti, mucho más " +
                    "fuerte que antes. El nerviosismo aumenta. Empiezas a oír quejidos extraños, parecen sonar " +
                    "muy lejos, pero de repente un grito indescifrable resuena en tus tímpanos. Te alejas de la " +
                    "hoguera de un salto. Del humo empieza a dibujarse la figura de un ser macabro, con patas de " +
                    "cabra y orejas de burro, que te sonríe mientras sostiene los esqueletos de los conejos " +
                    "montados como si vivieran. -Durante nueve lunas tendrás un hambre insaciable -sonríe con " +
                    "malicia -quiero ver hasta dónde eres capaz de llegar. Se vuelve a oír un grito desgarrador " +
                    "y el fuego combustiona hacia adentro, apagándose. Caes inconsciente y despiertas con la " +
                    "esperanza de que todo haya sido una alucinación... pero tienes mucha hambre. La maldición " +
                    "del hambre hace que pierdas dos cartas. Puedes proseguir tu viaje... por ahora. Pierdes dos " +
                    "cartas aleatorias de tu mano y también esta carta. Deja las cartas aleatorias y esta en el " +
                    "mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dejarlo en la madriguera",
                info: "La superstición te puede, dejas al conejo muerto y al vivo dentro de la madriguera. " +
                    "Que decida el tiempo si se pudrirá o si algún otro animal carroñero hará uso de él. " +
                    "Te acuestas a dormir al raso, lejos del lugar donde los animales que capturaste han " +
                    "sido devueltos. Aun así, sientes una presencia intermitente que te angustia; intentas " +
                    "conciliar el sueño sin mucho éxito. Tras conseguir una breve siesta, te incorporas y " +
                    "notas un peso cayendo sobre tus piernas: es el conejo que mataste, con las cuencas " +
                    "vacías y mucho más esquelético. Te llevas la mano al pecho por la impresión, solo para " +
                    "notar un líquido pegajoso en ella. \"Es una advertencia\", aparece escrito a fuego en el " +
                    "lomo del animal. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
        ]
    },
    {
        index: 37,
        type: CardType.Apoyo,
        options: [
            {
                text: "Denegar",
                info: "Le haces el feo. Te mira muy enfadado y te bebe la sangre hasta dejarte sin una gota. " +
                    "Pierdes cuatro cartas aleatorias de tu mano y también esta carta. Deja las cartas aleatorias " +
                    "y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Aceptar",
                info: "Te das cuenta de que Rubí lleva mucho tiempo sin tener a nadie con quien jugar. Le dejas " +
                    "ganar la partida y te invita a un vaso de sangre fresquita. Has aliviado tu sed y has " +
                    "sobrevivido una noche más. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 38,
        type: CardType.Ataque,
        options: [
            {
                text: "Huir",
                info: "Comienzas a correr por el camino por el que crees haber venido, pero tropiezas con un adoquín " +
                    "fuera de lugar y caes estrepitosamente al suelo. Cuando intentas levantarte, es demasiado tarde. " +
                    "Pierdes una carta aleatoria de tu mano y también esta carta. Deja la carta aleatoria y esta en el " +
                    "mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Enfrentar a tu sombra",
                info: "Coges carrerilla y te lanzas hacia tu sombra, atravesándola, pero no te detienes: " +
                    "continúas corriendo hasta que tus piernas no pueden más. Cuando te das cuenta, no hay una " +
                    "sola casa en los alrededores; debiste haber dejado el siniestro pueblo atrás. Al echar la " +
                    "vista atrás, ahí sigue tu sombra, con unos pequeños ojillos mansos y obedientes. Obtienes " +
                    "la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 39,
        type: CardType.Magia,
        options: [
            {
                text: "Gritar",
                info: "Rompes el silencio con un grito, quizás por miedo, quizás por impulso. La figura se " +
                    "estremece y su luz parpadea con violencia. En un instante, se desvanece entre la niebla " +
                    "como si nunca hubiera estado allí. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Observar",
                info: "Te quedas inmóvil, casi sin respirar. Observas cómo la figura avanza lentamente, envuelta " +
                    "en su resplandor frío. De ella emana una melodía tenue, imposible de recordar pero difícil de " +
                    "olvidar. No haces ruido. No te mueves. La calma permanece. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 40,
        type: CardType.Magia,
        options: [
            {
                text: "Tranquilizar",
                info: "Los caballos se acercan peligrosamente, pero no te dejas achantar e intentas amansarlos. " +
                    "Se muestran inquietos, sin saber muy bien cómo responder, así que no se dejan tocar. Con el " +
                    "tiempo, dejan de galopar para pararse a observarte, y te das cuenta de que el carruaje está " +
                    "vacío. Cuando vuelves a mirar a los caballos, han desaparecido, dejando solo una carreta " +
                    "destartalada. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Saltar al vagón",
                info: "Intentas aprovecharte de la situación y, cuando te rebasa, tratas de agarrarte al carruaje. " +
                    "Consigues tocar el borde del vagón, pero los dedos se te resbalan y se te escapa. Caes entre " +
                    "las ruedas y eres arrollado brutalmente. Cuando te quieres dar cuenta, el carruaje ha " +
                    "desaparecido, pero te duele todo. Pierdes una carta aleatoria de tu mano y también esta " +
                    "carta. Deja la carta aleatoria y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Saltar al caballo",
                info: "Te colocas en la trayectoria de los caballos, y estos cargan contra ti. En un movimiento " +
                    "rápido, te abalanzas hacia ellos y te agarras, de una manera que no comprendes, al animal " +
                    "espectral. Su aura inunda tus sentidos, dejándote en una disociación brutal. Ves tu pasado, " +
                    "estás cabalgando por tu vida y pasas por los errores que has cometido en tu viaje. Todo parece " +
                    "tan real que llegas a pensar que puedes remediarlos. Sales del trance y vuelves en ti con una " +
                    "extraña sensación en el cuerpo. Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Huir",
                info: "La situación te llena de terror, así que intentas salir de la encerrona. El caballo es veloz, " +
                    "pero le cuesta maniobrar, así que aprovechas eso como ventaja. Cuando intenta cargar contra ti, " +
                    "te apartas en el último segundo, haciendo que el carruaje dé un giro brusco, provocando que se " +
                    "vuelque estrepitosamente. Al impactar, explota en una bola de llamas celestes y verdes que, al " +
                    "cabo de unos segundos, desaparece sin dejar rastro. Exhausto, te incorporas mientras escuchas " +
                    "unos relinchos en la lejanía... Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 41,
        type: CardType.Defensa,
        options: [
            {
                text: "Lo ignoras",
                info: "El cadáver permanece a su suerte. Pierdes la carta. Déjala en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Lo entierras",
                info: "Mientras estás cavando, se acerca un lobo que despedaza el cadáver. Cuando ya tienes " +
                    "el hoyo listo, te das cuenta de que ya no queda cuerpo que enterrar. Pierdes la carta. " +
                    "Déjala en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Lo quemas",
                info: "El fuego atrae a los animales cercanos, que se aproximan al cadáver. Finalmente, le has " +
                    "ofrecido un funeral digno, acompañado por muchos seres vivos en su mágica despedida de este " +
                    "mundo hostil. Sus cenizas te recordarán eternamente. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Rompes el pentagrama",
                info: "Consideras el pentagrama un símbolo diabólico, así que lo pisas para borrarlo, pero al poner " +
                    "el pie sobre él, comienza a arder en intensas llamas azules. Arde con tanta intensidad que " +
                    "chamusca tu inventario. Pierdes una carta aleatoria de tu mano y también esta carta. Deja la " +
                    "carta aleatoria y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 42,
        type: CardType.Defensa,
        options: [
            {
                text: "Va un caracol",
                info: "Va un caracol y derrapa. Es tan sumamente malo que Antonio te devora con rabia. Toca esperar " +
                    "a que haga la digestión... Hasta que despiertas como si todo hubiera sido un sueño. Pierdes la " +
                    "carta. Déjala en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Chocobollo",
                info: "El chiste del chocobollo. La absurdez y plotwist del final le han pillado desprevenido y " +
                    "ha soltado una sonrisa. Te deja marchar pero con la condición de que pegarte un mordisquito. " +
                    "Pierdes una carta aleatoria de tu mano y obtienes esta carta. Deja la carta aleatoria en el " +
                    "mazo de descarte y guarda esta en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Van dos",
                info: "Van dos y se cae el de enmedio. Antonio se parte de risa por tu manera de contarlo y debido " +
                    "a tu indiscutible carisma contando chorradas. Te deja ir sin rasguño alguno. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Esqueleto",
                info: "Al esqueleto le gusta la sopa tibia. La mención de la sopa despierta el apetito de Antonio, " +
                    "que te lanza un chorro de ácido arácnido para dejar al descubierto tus huesos. Se acabó. El " +
                    "ácido sobre tus huesos te hace pronunciar unas últimas palabras «Ácido un placer», con las que " +
                    "Antonio se desternilla de risa. Su carcajada te hace despertar, como si todo hubiera sido un " +
                    "sueño. Pierdes la carta. Déjala en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 43,
        type: CardType.Magia,
        options: [
            {
                text: "Desenterrar",
                info: "Desentierras el ídolo por completo. Con paciencia y algo de esfuerzo, sacas el ídolo de " +
                    "la tierra. Su tamaño es mayor del que imaginabas, y al levantarlo, sientes una energía pesada " +
                    "que parece absorber la luz a tu alrededor. Una voz susurra en tu mente \"El portador siempre " +
                    "paga el precio.\". Obtienes la carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dejar ahí",
                info: "Te levantas; has decidido no involucrarte con lo que sea que yace bajo la tierra. Sin embargo, " +
                    "cada paso que das te revuelve el estómago, como si algo te estuviera observando desde las sombras. " +
                    "Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 44,
        type: CardType.Ataque,
        options: [
            {
                text: "Dar la mano",
                info: "Le das la mano a la criatura. Te arrastra hasta lo más profundo de la niebla. Despiertas " +
                    "donde estabas, con dolor de cabeza. Pierdes la carta. Deja la carta en el mazo de descarte. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dar un paso atrás",
                info: "No le das la mano. Das un paso atrás y te quedas sin moverte durante lo que parecen horas, " +
                    "hasta que la propia niebla se disipa. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 45,
        type: CardType.Apoyo,
        options: [
            {
                text: "Te marchas",
                info: "No escuchas a la adivina, dudas que pueda ayudarte en tu viaje y pasas de largo. Pierdes " +
                    "la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "La escuchas",
                info: "Decides acercarte y escuchar lo que tiene que decir. La mujer te toma la mano y, con un " +
                    "tono grave, te dice que tu destino dependerá de tu suerte. \"Nada está escrito -murmura-, " +
                    "pero vienen grandes peligros en tu camino. Podría ayudarte... si la diosa Fortuna está de tu lado.\"" +
                    "Recupera una carta de evento que hubieses descartado y descarta esta. Si no has descartado " +
                    "ninguna, te quedas esta en tu mano. Continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 46,
        type: CardType.Magia,
        options: [
            {
                text: "Te quedas inmóvil",
                info: "El barco pasa y vuelves a estar lejos del río. El individuo se quita el trapo, vislumbras un " +
                    "ser esquelético, sin un ápice de músculo en su cuerpo, solo huesos. Te escupe por no haber " +
                    "sido respetuoso; una maldición rodea tu cuerpo. Lanza una moneda: Cara: pierdes dos " +
                    "cartas. Cruz: pierdes cuatro cartas. Deja las cartas aleatorias y esta en el mazo de " +
                    "descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: true,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Le muestras tus respetos",
                info: "El individuo se quita el trapo y vislumbras un ser esquelético, sin un ápice de músculo en " +
                    "su cuerpo, solo huesos. Te devuelve el saludo respetuoso y continúa su viaje. Obtienes la " +
                    "carta. Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 47,
        type: CardType.Apoyo,
        options: [
            {
                text: "Te llevas la carta a tu mano",
                info: "Te sientas. Cuando vuelves a mirar, las sombras han desaparecido y comienzas a sentirte " +
                    "mejor. Ahora puedes continuar tu aventura con energías renovadas. Obtienes la carta. " +
                    "Guárdala en tu mano y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 48,
        type: CardType.Apoyo,
        options: [
            {
                text: "Cruzar el marco",
                info: "Apareces en un lugar completamente nuevo, aparentemente a salvo. Notas cómo una de las " +
                    "raíces se queda enredada en tu brazo, acompañándote para cuando necesites huir de una " +
                    "situación enrevesada. Puedes usarla una vez para evitar una carta no deseada, la raíz " +
                    "te teletransportará, descartando la carta de evento peligrosa. Obtienes la carta. " +
                    "Guárdala en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Dejarlo ahí",
                info: "Decides alejarte lo suficiente para no ser absorvido. Cuando miras atrás el marco ya no " +
                    "está. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 49,
        type: CardType.Apoyo,
        options: [
            {
                text: "Comprar la reliquia",
                info: "Accedes, la cruz es tuya, pero todo tiene un precio. Deberás dejar una carta en el mazo " +
                    "de descarte. Pierdes una carta a tu elección de tu mano y obtienes esta carta. Deja la carta " +
                    "elegida en el mazo de descarte y guarda esta en tu mano. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Seguir tu camino",
                info: "Tras pensarlo un rato, decides no desperdiciar tu tiempo en un capricho. Das las gracias " +
                    "al mercader y te retiras, oyes un susurro que te hace volver la cabeza \"poca fe...\". " +
                    "Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 50,
        type: CardType.Apoyo,
        options: [
            {
                text: "Dar la moneda",
                info: "Llamas a los hermanos y les devuelves la moneda. Sus figuras se perfilan entre la niebla, " +
                    "bajos, robustos, con túnicas que no parecen de esta época. No puedes verles el rostro, pero " +
                    "intuyes una sonrisa en la sombra. Son, casi con certeza, mouros. Seres antiguos, enterrados " +
                    "en cuevas y castros, condenados a custodiar riquezas que ya no desean. Solo encuentran " +
                    "descanso cuando alguien actúa con desinterés, rompiendo el ciclo de codicia que los ata. " +
                    "Recibes su agradecimiento con una leve reverencia. ¿Te servirá de algo? Quizá. No obtienes " +
                    "la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            },
            {
                text: "Quedártela",
                info: "Te guardas la moneda. Al contacto, el metal está frío, más de lo que debería. " +
                    "Los hermanos no reclaman nada. Se desvanecen entre los árboles sin notar su pérdida. " +
                    "Pero los mouros recuerdan. Dicen que quien se apropia de una de sus monedas puede arrastrar " +
                    "su carga sin notarlo, hasta que es demasiado tarde. Obtienes la carta. Guárdala en tu mano. " +
                    "Y continúas tu aventura donde estabas.",
                dice: false,
                coin: false,
                save: () => { return true },
                discard: () => { return true },
            }
        ]
    },
    {
        index: 51,
        type: CardType.Historia,
        options: []
    },
    {
        index: 52,
        type: CardType.Historia,
        options: []
    },
    {
        index: 53,
        type: CardType.Historia,
        options: []
    },
    {
        index: 54,
        type: CardType.Historia,
        options: []
    },
    {
        index: 55,
        type: CardType.Historia,
        options: []
    },
    {
        index: 56,
        type: CardType.Historia,
        options: []
    },
    {
        index: 57,
        type: CardType.Historia,
        options: []
    },
    {
        index: 58,
        type: CardType.Historia,
        options: []
    }
];
