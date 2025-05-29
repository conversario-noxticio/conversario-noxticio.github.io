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
        tipo: "ataque",
        opciones: [
            {
                text: "Te sinceras",
                info: "Le cuentas sobre tu investigación y compartes con ellos tus inquietudes. El Comandante de la guardia, agradecido por tu sinceridad simpatiza con tu noble misión y te ofrece escolta mientras descansas y un amuleto para que lo lleves en tu aventura. Obtienes la carta.",
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
                info: "No te fías. Piensas que se burlarán de ti así que les cuentas que eres un guerrero que está de viaje de vuelta de una batalla. El comandante ve en tu mirada que se trata de una vil mentira. Encolerizado, tira de las riendas de su caballo y guía a su guardia a pasar por encima de ti dejándote tendido en el suelo aturdido, a tu suerte.",
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
        tipo: "idk",
        opciones: [
            {
                text: "Aceptar",
                info: "Tomas el martillo sin saber muy bien por qué. El espíritu te observa satisfecho. Te acercas a la forja y trabajáis juntos, rodeados de un calor infernal. El metal brilla como si contuviera algo vivo, algo peligroso. A cada golpe, el martillo te quema la piel, pero la euforia crece. Te fundes con el ritmo, en una danza demoníaca de chispas y sudor. Al terminar, el herrero contempla la hoja con orgullo, te lanza una sonrisa ardiente... y desaparece. Descarta una carta aleatoria de tu mano.Vuelves al lugar de origen.",
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
                info: "Lo miras desafiante. Le propones una competencia: quien forje la espada más brillante, gana. Su risa es una carcajada desencajada. —Gana el que forje con más fulgor... y el perdedor deberá un favor con gran fervor. El fuego se aviva. Lanza una moneda. Cara: ganas la carta. Cruz: pierdes y sigues tu camino.",
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
                info: "Aceptas su propuesta y finges trabajar junto a él. El calor es insoportable, y el espíritu parece disfrutar del sufrimiento. En un descuido, agarras la hoja al rojo vivo y huyes con ella entre las llamas. El grito que lanza detrás de ti no parece humano, pero ya es tarde. Escapas chamuscado, pero con el botín. Te llevas la carta.",
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
                info: "La visión te supera. El calor, la mirada del espíritu, las llamas... todo es demasiado. Das media vuelta y corres como puedes entre el fuego. Él te observa alejarte y solo suelta una risa cavernosa antes de volver a golpear el yunque. No ocurre nada. Sigues tu camino.",
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
                info: "Si tienes una carta de ATAQUE, llévate la carta El perro de Urco. De lo contrario, descarta una carta de evento al azar.",
                store: false,
                dice: false,
                dice_values: [],
                coin: false,
                coin_value: "",
                own: ["ataque"],
                additional_discard: ["any"],
                additional_get: []
            },
            {
                text: "Huir",
                info: "Lanza una moneda. CARA: Pierdes dos cartas de evento al azar. CRUZ: Vuelve a sacar una carta de evento.",
                store: false,
                dice: false,
                dice_values: [],
                coin: true,
                coin_value: "cruz",
                own: [],
                additional_discard: ["any", "any"],
                additional_get: []
            },
        ]
    },
    {
        index: 4,
        tipo: "idk",
        opciones: [
            {
                text: "Lanzar el dado",
                info: "Si sacas más de un 4, le ganas la apuesta al pirata y te quedas con su botín compuesto por baratijas que le ha robado a otros aventureros. Pero de entre ellas te llevas una valiosa brújula que sirve para cambiar el rumbo de tu aventura (puedes descartar una carta de evento y cambiarla por la siguiente, guarda esta carta y descártala cuando la uses). Si sacas menos de 4, los bandidos te saquean, se ríen de ti y te arrancan parte de la ropa. El pirata se queda con todo tu inventario, excepto tantas cartas como el número que te haya salido en la tirada.",
                store: false,
                dice: true,
                dice_values: [5,6],
                coin: false,
                coin_value: "",
                own: [],
                additional_discard: [],
                additional_get: []
            },
            {
                text: "Huir",
                info: "Si decides huír sin apostar, toda la masa se ríe de ti. Pierdes reputación en otros puertos y te roban perdiendo un objeto (carta) al azar de tu inventario.",
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
