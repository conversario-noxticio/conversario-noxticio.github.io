const cardOptionsData = {
    1: [
        {
            text: "Te sinceras",
            info: "Le cuentas sobre tu investigación y compartes con ellos tus inquietudes. El Comandante de la guardia, agradecido por tu sinceridad simpatiza con tu noble misión y te ofrece escolta mientras descansas y un amuleto para que lo lleves en tu aventura. Obtienes la carta.",
            canStore: true, canDiscard: false
        },
        {
            text: "Mientes",
            info: "No te fías. Piensas que se burlarán de ti así que les cuentas que eres un guerrero que está de viaje de vuelta de una batalla. El comandante ve en tu mirada que se trata de una vil mentira. Encolerizado, tira de las riendas de su caballo y guía a su guardia a pasar por encima de ti dejándote tendido en el suelo aturdido, a tu suerte.",
            canStore: false, canDiscard: true
        },
    ],
    2: [
        {
            text: "Aceptar",
            info: "Tomas el martillo sin saber muy bien por qué. El espíritu te observa satisfecho. Te acercas a la forja y trabajáis juntos, rodeados de un calor infernal. El metal brilla como si contuviera algo vivo, algo peligroso. A cada golpe, el martillo te quema la piel, pero la euforia crece. Te fundes con el ritmo, en una danza demoníaca de chispas y sudor. Al terminar, el herrero contempla la hoja con orgullo, te lanza una sonrisa ardiente... y desaparece. Descarta una carta aleatoria de tu mano.Vuelves al lugar de origen.",
            canStore: false, canDiscard: true
        },
        {
            text: "Retar",
            info: "Lo miras desafiante. Le propones una competencia: quien forje la espada más brillante, gana. Su risa es una carcajada desencajada. —Gana el que forje con más fulgor... y el perdedor deberá un favor con gran fervor. El fuego se aviva. Lanza una moneda.Cara: ganas la carta.Cruz: pierdes y sigues tu camino.",
            canStore: true, canDiscard: true
        },
        {
            text: "Engañar",
            info: "Aceptas su propuesta y finges trabajar junto a él. El calor es insoportable, y el espíritu parece disfrutar del sufrimiento. En un descuido, agarras la hoja al rojo vivo y huyes con ella entre las llamas. El grito que lanza detrás de ti no parece humano, pero ya es tarde. Escapas chamuscado, pero con el botín. Te llevas la carta.",
            canStore: true, canDiscard: false
        },
        {
            text: "Escapar",
            info: "La visión te supera. El calor, la mirada del espíritu, las llamas... todo es demasiado. Das media vuelta y corres como puedes entre el fuego. Él te observa alejarte y solo suelta una risa cavernosa antes de volver a golpear el yunque. No ocurre nada.Sigues tu camino.",
            canStore: false, canDiscard: true
        },
    ],
    3: [
        {
            text: "Pelear",
            info: "Si tienes una carta de ATAQUE, llévate la carta El perro de Urco. De lo contrario, descarta una carta de evento al azar.",
            canStore: true, canDiscard: true
        },
        {
            text: "Huir",
            info: "Lanza una moneda. CARA: Pierdes dos cartas de evento al azar. CRUZ: Vuelve a sacar una carta de evento.",
            canStore: true, canDiscard: true
        },
    ],
    4: [
        {
            text: "Lanzar el dado",
            info: "Si sacas más de un 4, le ganas la apuesta al pirata y te quedas con su botín compuesto por baratijas que le ha robado a otros aventureros. Pero de entre ellas te llevas una valiosa brújula que sirve para cambiar el rumbo de tu aventura (puedes descartar una carta de evento y cambiarla por la siguiente, guarda esta carta y descártala cuando la uses). Si sacas menos de 4, los bandidos te saquean, se ríen de ti y te arrancan parte de la ropa.El pirata se queda con todo tu inventario, excepto tantas cartas como el número que te haya salido en la tirada.",
            canStore: true, canDiscard: true
        },
        {
            text: "Huir",
            info: "Si decides huír sin apostar, toda la masa se ríe de ti. Pierdes reputación en otros puertos y te roban perdiendo un objeto (carta) al azar de tu inventario.",
            canStore: false, canDiscard: true
        },
    ],
};
