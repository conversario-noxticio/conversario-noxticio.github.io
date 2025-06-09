/*

    * index: numero para identificar la carta. {index}-front.jpg o {index}-back.jpg
    * tipo: "ataque", "defensa"...
    * opciones: lista de posibles opciones
        + text: nombre de la opcion, lo que se muestra en el boton
        + info: texto que se muestra debajo de la carta despues de elegir esta opción
        + store: opción directamente correcta -> botón "Guardar en tu mano"
        + dice: si "store" es falso y esto es true, aparece un dado
        + dice_values: lista de numeros validos para el dado, si sale uno de estos numeros -> botón "Guardar en tu mano", si no -> botón "Descartar"
        + coin: si "store" y "dice" son falsos y esto es true, aparece una moneda
        + coin_value: puede ser "cara" o "cruz", es el valor válido de la moneda, si sale eso -> botón "Guardar en tu mano", si no -> botón "Descartar"
        + own: además de los demas booleanos, si esta lista no está vacía, para poder guardar esta carta tienes que tener en tu mano determinados tipos de cartas. Esta variable es una lista de los tipos de cartas que debes tener en tu mano, por ejemplo ["ataque","defensa"] para una de ataque y una de defensa o ["any","any","any"] para 3 cualquiera. Si las posees y las demás condiciones se cumplen -> botón "Guardar en tu mano", si no -> botón "Descartar". Si esta lista está vacía se ignora.
        (Si ninguno de los booleanos o condiciones anteriores se cumple -> botón "Descartar")
        + additional_discard: si finalmente esta carta se descarta, esta es una lista de cartas adicionales a descartar de tu mano. Las cartas descartadas son aleatorias pero son indicadas en esta lista por el tipo, por ejemplo ["ataque","defensa"] para una de ataque y una de defensa o ["any","any","any"] para 3 cualquiera. Si no tienes suficientes cartas en tu mano o no del tipo indicado, se descartarán solo las que tengas de ese tipo.
        + additional_get: si finalmente esta carta se guarda en tu mano, esta es una lista de cartas adicionales a guardar en tu mano. En esta lista se indica el id de las cartas, pueden ser cartas del mazo o de historia, si algunas de las cartas no están porque ya están en tu mano o han sido descartadas se ignorarán.

    Las cartas de tipo "historia" no están en el mazo y no se cuentan pero tienen su index y pueden ser obtenidas mediante additional_get

*/


const options = [
    {
        index: 1,
        tipo: "defensa",
        opciones: [
            {
                text: "Te sinceras",
                info: "Le cuentas sobre tu investigación y compartes con ellos tus inquietudes. El Comandante de la guardia, agradecido por tu sinceridad simpatiza con tu noble misión y te ofrece escolta mientras descansas y un amuleto para que lo lleves en tu aventura. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Mientes",
                info: "No te fías. Piensas que se burlarán de ti así que les cuentas que eres una rana guerrera que está de viaje de vuelta de una batalla. El comandante ve en tu mirada que se trata de una vil mentira. Encolerizado, tira de las riendas de su caballo y guía a su guardia a pasar por encima de ti dejándote tendido en el suelo aturdido, a tu suerte. Continúas tu aventura con graves dolencias. No obtienes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 2,
        tipo: "ataque",
        opciones: [
            {
                text: "Aceptar",
                info: "Tomas el martillo sin saber muy bien por qué. El espíritu te observa satisfecho. Te acercas a la forja y trabajáis juntos, rodeados de un calor infernal. El metal brilla como si contuviera algo vivo, algo peligroso. A cada golpe, el martillo te quema la piel, pero la euforia crece. Te fundes con el ritmo, en una danza demoníaca de chispas y sudor. Al terminar, el herrero contempla la hoja con orgullo, te lanza una sonrisa ardiente... y desaparece. Descarta una carta aleatoria de tu mano. Deja esta carta y otra de tu mano en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Retar",
                info: "Lo miras desafiante. Le propones una competencia: quien forje la espada más brillante, gana. Su risa es una carcajada desencajada. —Gana el que forje con más fulgor... y el perdedor deberá un favor con gran fervor. El fuego se aviva. Lanza una moneda.Cara: ganas la carta. Cruz: pierdes y sigues tu camino.Continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: true,
                coin_value: "cara",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Engañar",
                info: "Aceptas su propuesta y finges trabajar junto a él. El calor es insoportable, y el espíritu parece disfrutar del sufrimiento. En un descuido, agarras la hoja al rojo vivo y huyes con ella entre las llamas. El grito que lanza detrás de ti no parece humano, pero ya es tarde. Escapas ardiendo, pero con el botín. Te llevas la carta. Guardala en tu mano.Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Escapar",
                info: "La visión te supera. El calor, la mirada del espíritu, las llamas... todo es demasiado. Das media vuelta y corres como puedes entre el fuego. Él te observa alejarte y solo suelta una risa cavernosa antes de volver a golpear el yunque. No ocurre nada. Sigues tu camino. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 3,
        tipo: "ataque",
        opciones: [
            {
                text: "Pelear",
                info: "Si tienes una carta de ATAQUE, llévate la carta El perro de Urco. De lo contrario, descartala. Guardala en tu mano o no y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: ["ataque"],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Huir",
                info: "Lanza una moneda. CARA: Pierdes dos cartas Nox al azar de tu mano. CRUZ: Vuelve a sacar una carta de evento. Sin importar lo que salga, deja esta carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: true,
                coin_value: "cruz", // TODO: descartar
                own: [],
                additional_discard: ["any", "any"],
                additional_get: []
            },
        ]
    },
    {
        index: 4,
        tipo: "defensa",
        opciones: [
            {
                text: "Lanzar el dado",
                info: "Si sacas más de un 4, le ganas la apuesta al pirata y te quedas con su botín compuesto por baratijas que le ha robado a otros aventureros. En el botín encuentras unos dados malditos que pueden cambiar el rumbo de tu aventura: Si pierdes una carta puedes intercambiarla por esta. Guardala en tu mano. Y continúas tu aventura donde estabas. Si sacas menos de 4, los bandidos te saquean, se ríen de ti y te arrancan parte de la ropa. El pirata te quita de tu mano el número de cartas que haya salido en el dado. Deja las cartas en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: true,
                dice_values: [4,5,6],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [], // TODO: dice number
                additional_get: []
            },
            {
                text: "Huir",
                info: "Si decides huír sin apostar, toda la masa se ríe de ti. Pierdes reputación en otros puertos y pierdes esta carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 5,
        tipo: "defensa",
        opciones: [
            {
                text: "Mueves la piedra",
                info: "Un espíritu sale de la piedra y te da la espada de Elduara. Un arma ancestral que te protegerá de algunos peligros. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Le das una patada",
                info: "Un espíritu enfadado sale y te lanza una maldición mientras escuchas: 'Respeta a tus mayores'. Sales del bosque. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 6,
        tipo: "magia",
        opciones: [
            {
                text: "Eliges el amuleto",
                info: "El mercader te entrega el amuleto sin emoción alguna. Al colocártelo, sientes un leve hormigueo, pero al mirar al mercader, notas que ha desaparecido, dejando el carro y el caballo vacíos. Cuando te lo quitas, el hormigueo se convierte en un peso insoportable que te recuerda las decisiones que no tomaste. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Eliges la daga",
                info: "El mercader sonríe por primera vez mientras coloca la daga en tus manos. Un frío inquietante recorre tu cuerpo, como si un pacto invisible se sellara entre ambos. 'Úsala bien… o no la uses en absoluto', dice antes de desaparecer con su carro. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Eliges el frasco",
                info: "El mercader te observa fijamente mientras tomas el frasco. Al beber el líquido, un fuego intenso recorre tus venas. El mercader, sin cambiar de expresión, murmura: 'El fuego consume todo, incluso las esperanzas'. De pronto, todo su carro se desvanece como humo, dejándote solo en la oscuridad. Pierdes la carta .Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Rechazas la oferta",
                info: "El mercader guarda sus objetos en silencio, pero su mirada cargada de reproche te sigue incluso cuando te das la vuelta. 'Siempre hay un precio, aunque no lo pagues', dice antes de desaparecer. La sensación de haber perdido algo importante te acompaña el resto de tu viaje. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 7,
        tipo: "apoyo",
        opciones: [
            {
                text: "Resistir",
                info: "El apóstol peregrino nota que te resistes, te considera un enemigo y decide atacarte. Pierdes una carta aleatoria de tu mano y también esta carta. Deja la carta aleatoria y esta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: ["any"],
                additional_get: []
            },
            {
                text: "Entregarte",
                info: "La figura te guía hacia la salida de ese paraje oscuro y te cuenta sobre un amuleto que se encuentra en estas tierras. Al encontrarte sin amparo, el apóstol peregrino decide acerte entrega del amuleto, pues considera que puede hacerte bien. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 8,
        tipo: "magia",
        opciones: [
            {
                text: "Nada",
                info: "La anciana se ríe a carcajadas y se marcha pronunciando palabras incognoscibles. No ocurre nada. Eso era lo que querías, ¿o no? Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Comercio",
                info: "Pierde una carta de evento a tu elección y guarda esta en tu mano. Si no tienes ninguna otra carta descarta esta. Continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: ["any"], // TODO: a tu eleccion + on store
                additional_get: []
            },
            {
                text: "Medicina",
                info: "Recupera una carta de evento que hubieses descartado y descarta esta. Si no has descartado ninguna te quedas esta en tu mano. Continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [], // TODO: wtf
                additional_get: []
            },
            {
                text: "Videncia",
                info: "Te llevas la carta La meiga ciega. Continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 9,
        tipo: "ataque",
        opciones: [
            {
                text: "Huir",
                info: "Pataleas hasta encontrar un borde firme. Sales del agua jadeando. Pero al ponerte en pie, sientes que algo dentro de ti late con un ritmo ajeno. No sabes qué es y no sabes si se irá. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Pescar",
                info: "Hundes la mano en el agua con decisión. Algo muerde. Tiras, y la criatura emerge retorciéndose, aún viva pese a su estado. Te mira sin ojos. No sabes si la has sacado tú o si se ha dejado atrapar. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Rezar",
                info: "Cierras los ojos. Las palabras salen solas, sin sentido. La criatura se detiene frente a ti, como si escuchara algo más antiguo que tú. Luego, se da la vuelta y desaparece entre las aguas. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Miccionar",
                info: "No puedes evitarlo. El calor se mezcla con el agua, y eso basta. Algo se lanza sobre ti desde abajo, y aunque logras apartarte, sientes el mordisco clavarse más allá de la piel. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    },
    {
        index: 10,
        tipo: "magia",
        opciones: [
            {
                text: "Intentas romper el sello y abrir el libro",
                info: "Con determinación, intentas romper el sello. Cuando lo logras, una energía oscura surge del libro y envuelve el ambiente. Las páginas empiezan a pasar solas hasta que se detienen en un pasaje que brilla intensamente. 'Ahora eres quien porta el conocimiento prohibido'. Obtienes la carta. Guardala en tu mano. Y continúas tu aventura donde estabas.",
                store: true,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Tomas el libro sin romper el sello",
                info: "Guardas el libro cuidadosamente, esperando encontrar la forma de descifrar su contenido más adelante. Sin embargo, el peso del libro parece aumentar con cada paso, y una voz susurra: 'No mereces tal honor. Aún'. El libro desaparece de tu bolsa sin dejar rastro. Pierdes la carta. Deja la carta en el mazo de descarte. Y continúas tu aventura donde estabas.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
        ]
    }
];
