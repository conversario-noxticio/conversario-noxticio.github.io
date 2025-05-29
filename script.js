// === VARIABLES DE JUEGO ===
let deck = [];           // Cartas del mazo (sólo ataque/evento)
let hand = [];           // Cartas en tu mano (array de objetos {index, tipo, optionIndex})
let discarded = [];      // Cartas descartadas (índices)
let currentCard = null;  // Objeto carta actual
let cardFlipped = false; // ¿La carta está volteada?
let cardOptionsShown = false; // ¿Ya se mostraron las opciones?
let cardsTotal = 0;

// === INICIALIZACIÓN ===
$(document).ready(function () {
    // Inicializar mazo
    deck = options.filter(opt => opt.tipo !== "historia");
    cardsTotal = deck.length;
    updateDrawButton();

    // Eventos
    $('#draw-btn').on('click', drawCard);
    $('#hand-container').on('click', openHandModal);
    $('#close-hand-modal').on('click', closeHandModal);
    $('#close-card-detail-modal').on('click', closeCardDetailModal);

    // Cerrar modales al hacer click fuera
    $('#hand-modal').on('mousedown', function (e) {
        if (e.target === this) closeHandModal();
    });
    $('#card-detail-modal').on('mousedown', function (e) {
        if (e.target === this) closeCardDetailModal();
    });

    // Responsive: cerrar modales con ESC
    $(document).on('keydown', function (e) {
        if (e.key === "Escape") {
            closeHandModal();
            closeCardDetailModal();
        }
    });

    // Mostrar mano vacía al inicio
    updateHandIcon();
});

// === FUNCIONES PRINCIPALES ===

// Actualiza el botón de sacar carta
function updateDrawButton() {
    $('#cards-left').text(deck.length);
    $('#cards-total').text(cardsTotal);
    if (deck.length === 0) {
        $('#draw-btn').prop('disabled', true);
    } else {
        $('#draw-btn').prop('disabled', false);
    }
}

// Saca una carta aleatoria del mazo
function drawCard() {
    if (deck.length === 0) return;
    $('#draw-btn').hide();
    $('#options-area').empty();
    $('#options-area').removeClass("mb-4");
    $('#info-area').empty();
    $('#info-area').removeClass("mb-4");
    $('#random-area').empty();
    $('#random-area').removeClass("mb-4");
    $('#final-options-area').empty();
    $('#final-options-area').removeClass("mb-4");
    cardFlipped = false;
    cardOptionsShown = false;

    // Elegir carta aleatoria
    let idx = Math.floor(Math.random() * deck.length);
    currentCard = deck[idx];
    deck.splice(idx, 1); // Quitar del mazo

    // Mostrar reverso
    showCard(currentCard, false);

    updateDrawButton();
}

// Muestra la carta (flipped: true=anverso, false=reverso)
function showCard(card, flipped) {
    $('#card-area').html(`
        <div class="card-flip-container">
            <div class="card-flip${flipped ? ' flipped' : ''}" id="main-card-flip">
                <div class="card-face front">
                    <img src="images/cards/${card.index}-front.jpg" alt="Anverso">
                </div>
                <div class="card-face back">
                    <img src="images/cards/${card.index}-back.jpg" alt="Reverso">
                </div>
            </div>
        </div>
    `);

    $('#main-card-flip').off('click').on('click', function () {
        cardFlipped = !cardFlipped;
        $(this).toggleClass('flipped');
        if (cardFlipped && !cardOptionsShown) {
            setTimeout(() => showCardOptions(card), 400);
            cardOptionsShown = true;
        }
    });
}

// Muestra las opciones de la carta
function showCardOptions(card) {
    let html = '';
    card.opciones.forEach((opt, i) => {
        html += `<button class="btn btn-secondary card-option-btn" data-idx="${i}">${opt.text}</button>`;
    });
    $('#options-area').html(html);

    $('#card-area').addClass("mb-4");
    $('#options-area').addClass("mb-4");
    scrollDown();

    $('.card-option-btn').off('click').on('click', function () {
        let optIdx = Number($(this).data('idx'));
        chooseOption(card, optIdx);
    });
}

// Gestiona la elección de opción
function chooseOption(card, optIdx) {
    $('#options-area').empty();
    $('#options-area').removeClass("mb-4");
    let opt = card.opciones[optIdx];

    // Guardar la opción elegida en la carta (si se guarda en mano)
    card._chosenOption = optIdx;

    $('#info-area').addClass("mb-4");
    scrollDown();
    setTimeout(() => { scrollDown(); }, 200);
    setTimeout(() => { scrollDown(); }, 400);
    setTimeout(() => { scrollDown(); }, 600);

    // Mostrar info con animación de typewriter
    typeWriter('#info-area', opt.info, 1000, () => {
        scrollDown();
        // Lógica de botones según la opción
        handleOptionOutcome(card, opt, optIdx);
    });
}

// Animación typewriter para info
function typeWriter(selector, text, duration, callback) {
    let words = text.split(' ');
    let total = words.length;
    let delay = duration / total;
    $(selector).text('');
    let i = 0;
    function nextWord() {
        if (i < total) {
            $(selector).append(words[i] + ' ');
            i++;
            setTimeout(nextWord, delay);
        } else if (callback) {
            callback();
        }
    }
    nextWord();
}

// Gestiona el resultado de la opción elegida
function handleOptionOutcome(card, opt, optIdx) {
    // Comprobar si se puede guardar directamente
    if (opt.store) {
        showStoreButton(card, opt, optIdx);
        return;
    }
    // Si hay dado
    if (opt.dice) {
        showDice(opt, card, optIdx);
        return;
    }
    // Si hay moneda
    if (opt.coin) {
        showCoin(opt, card, optIdx);
        return;
    }
    // Si requiere cartas en mano
    if (opt.own && opt.own.length > 0) {
        if (checkOwnRequirement(opt.own)) {
            showStoreButton(card, opt, optIdx);
        } else {
            showDiscardButton(card, opt, optIdx);
        }
        return;
    }
    // Si nada de lo anterior, descartar
    showDiscardButton(card, opt, optIdx);
}

// Muestra botón para guardar carta en mano
function showStoreButton(card, opt, optIdx) {
    $('#final-options-area').html(`
        <button class="btn btn-success" id="save-card-btn">Guardar en tu mano</button>
    `);
    $('#final-options-area').addClass("mb-4");
    scrollDown();
    $('#save-card-btn').off('click').on('click', function () {
        $('#save-card-btn')[0].disabled = true;
        scrollUp();
        setTimeout(() => {
            animateSaveToHand(card, () => {
                addToHand(card, optIdx);
                // Cartas adicionales a obtener
                if (opt.additional_get && opt.additional_get.length > 0) {
                    for (let id of opt.additional_get) {
                        let extra = options.find(c => c.index === id && !hand.some(h => h.index === id) && !discarded.includes(id));
                        if (extra) {
                            animateSaveToHand(extra, () => addToHand(extra, null));
                            // Si era del mazo, quitarla
                            let deckIdx = deck.findIndex(c => c.index === id);
                            if (deckIdx !== -1) {
                                deck.splice(deckIdx, 1);
                                updateDrawButton();
                            }
                        }
                    }
                }
                $('#draw-btn').show();
                $('#card-area').empty();
                $('#card-area').removeClass("mb-4");
                $('#options-area').empty();
                $('#options-area').removeClass("mb-4");
                $('#info-area').empty();
                $('#info-area').removeClass("mb-4");
                $('#random-area').empty();
                $('#random-area').removeClass("mb-4");
                $('#final-options-area').empty();
                $('#final-options-area').removeClass("mb-4");
            });
        }, document.documentElement.scrollTop > 0 ? 700 : 0);
    });
}

// Muestra botón para descartar carta
function showDiscardButton(card, opt, optIdx) {
    $('#final-options-area').html(`
        <button class="btn btn-danger" id="discard-card-btn">Descartar</button>
    `);
    $('#final-options-area').addClass("mb-4");
    scrollDown();
    $('#discard-card-btn').off('click').on('click', function () {
        $('#discard-card-btn')[0].disabled = true;
        scrollUp();
        setTimeout(() => {
            animateDiscardCard(card, () => {
                discarded.push(card.index);
                // Cartas adicionales a descartar de la mano
                if (opt.additional_discard && opt.additional_discard.length > 0) {
                    discardFromHand(opt.additional_discard, 0, () => {
                        $('#draw-btn').show();
                    });
                } else {
                    $('#draw-btn').show();
                }
                $('#card-area').empty();
                $('#card-area').removeClass("mb-4");
                $('#options-area').empty();
                $('#options-area').removeClass("mb-4");
                $('#info-area').empty();
                $('#info-area').removeClass("mb-4");
                $('#random-area').empty();
                $('#random-area').removeClass("mb-4");
                $('#final-options-area').empty();
                $('#final-options-area').removeClass("mb-4");
            });
        }, document.documentElement.scrollTop > 0 ? 700 : 0);
    });
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $('#final-options-area').offset().top - 50 }, 300);
}

function scrollUp() {
    $('html, body').animate({ scrollTop: $('#card-area').offset().top - 50 }, 300);
}

// Lanza dado con animación
function showDice(opt, card, optIdx) {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    $('#random-area').html(`
      <div class="result-reveal-container" style="position:relative; display:inline-block; width:120px; height:70px;">
        <img src="images/dice.png" alt="Dado" id="dice-img" class="result-img" style="width:70px; position:absolute; left:25px; top:0; z-index:2;">
        <span id="dice-result" class="fs-4 result-value" style="position:absolute; left:25px; top:18px; z-index:1; opacity:0;"></span>
      </div>
    `);
    $('#random-area').addClass("mb-4");
    scrollDown();
    setTimeout(() => {
        $('#dice-img').addClass('dice-anim');
        setTimeout(() => {
            $('#dice-img').removeClass('dice-anim');
            $('#dice-result').text(diceValue);

            // Animación: resultado sale de detrás del dado
            $('#dice-img').addClass('reveal-move');
            $('#dice-result').addClass('reveal-move');

            setTimeout(() => {
                if (opt.dice_values && opt.dice_values.includes(diceValue)) {
                    showStoreButton(card, opt, optIdx);
                } else {
                    showDiscardButton(card, opt, optIdx);
                }
            }, 900);
        }, 810);
    }, document.documentElement.scrollTop < (document.documentElement.scrollHeight - document.documentElement.clientHeight) ? 400 : 0);
}

// Lanza moneda con animación
function showCoin(opt, card, optIdx) {
    let coinVal = Math.random() < 0.5 ? "cara" : "cruz";
    $('#random-area').html(`
      <div class="result-reveal-container" style="position:relative; display:inline-block; width:120px; height:70px;">
        <img src="images/coin.png" alt="Moneda" id="coin-img" class="result-img" style="width:70px; position:absolute; left:25px; top:0; z-index:2;">
        <span id="coin-result" class="fs-4 result-value" style="position:absolute; left:25px; top:18px; z-index:1; opacity:0;"></span>
      </div>
    `);
    $('#random-area').addClass("mb-4");
    scrollDown();
    setTimeout(() => {
        $('#coin-img').addClass('coin-anim');
        setTimeout(() => {
            $('#coin-img').removeClass('coin-anim');
            $('#coin-result').text(coinVal === "cara" ? "CARA" : "CRUZ");

            $('#coin-img').addClass('reveal-move');
            $('#coin-result').addClass('reveal-move');

            setTimeout(() => {
                if (opt.coin_value && coinVal === opt.coin_value) {
                    showStoreButton(card, opt, optIdx);
                } else {
                    showDiscardButton(card, opt, optIdx);
                }
            }, 900);
        }, 1010);
    }, document.documentElement.scrollTop < (document.documentElement.scrollHeight - document.documentElement.clientHeight) ? 400 : 0);
}

// Comprueba si tienes las cartas en mano requeridas
function checkOwnRequirement(ownList) {
    let handTypes = hand.map(h => h.tipo);
    let handCopy = [...handTypes];
    for (let req of ownList) {
        if (req === "any") {
            if (handCopy.length === 0) return false;
            handCopy.pop();
        } else {
            let idx = handCopy.indexOf(req);
            if (idx === -1) return false;
            handCopy.splice(idx, 1);
        }
    }
    return true;
}

// Añade carta a la mano (y actualiza icono)
function addToHand(card, optionIndex) {
    let obj = {
        index: card.index,
        tipo: card.tipo,
        optionIndex: (typeof optionIndex === "number" ? optionIndex : null)
    };
    hand.push(obj);
    updateHandIcon();
}

// Animación de guardar carta en mano
function animateSaveToHand(card, cb) {
    $('.card-flip-container')[0].style.visibility = 'hidden';
    let $cardClone = $(`
        <div id="card-clone" class="card-flip-container" style="position:fixed; left:${$('#card-area').offset()?.left || 0}px; top:${$('#card-area').offset()?.top || 0}px; z-index:2000;">
            <div class="card-flip${cardFlipped ? ' flipped' : ''}">
                <div class="card-face front"><img src="images/cards/${card.index}-front.jpg"></div>
                <div class="card-face back"><img src="images/cards/${card.index}-back.jpg"></div>
            </div>
        </div>
    `).appendTo('body');
    const handContainerRect = $('#hand-container')[0].getBoundingClientRect();
    const cardCloneRect = $('#card-clone')[0].getBoundingClientRect();
    $('#card-clone')[0].style.top = `${handContainerRect.top + (handContainerRect.height / 2) - (cardCloneRect.height / 2)}px`;
    $('#card-clone')[0].style.left = `${handContainerRect.left + (handContainerRect.width / 2) - (cardCloneRect.width / 2)}px`;
    setTimeout(() => {
        $cardClone.addClass('save-to-hand');
        setTimeout(() => { $cardClone.remove(); if (cb) cb(); }, 710);
    }, 10);
}

// Animación de descartar carta (romperse)
function animateDiscardCard(card, cb) {
    $('.card-flip-container')[0].style.visibility = 'hidden';
    let $container = $('<div class="card-flip-container" style="position:fixed; z-index:2000;"></div>').appendTo('body');
    let pos = $('#card-area').offset() || { left: 0, top: 0 };
    $container.css({ left: pos.left, top: pos.top });
    let side = cardFlipped ? 'back' : 'front';
    let imgSrc = `images/cards/${card.index}-${side}.jpg`;
    let $left = $(`<div class="card-face" style="width:50%;height:100%;left:0;position:absolute;overflow:hidden;"><img src="${imgSrc}" style="width:200%;height:100%;object-fit:cover;object-position:left;"></div>`);
    let $right = $(`<div class="card-face" style="width:50%;height:100%;left:50%;position:absolute;overflow:hidden;"><img src="${imgSrc}" style="width:200%;height:100%;object-fit:cover;object-position:right;"></div>`);
    $left.addClass('break-left');
    $right.addClass('break-right');
    $container.append($left, $right);
    setTimeout(() => { $container.remove(); if (cb) cb(); }, 600);
}

// Descarta cartas de la mano según lista (con animación)
function discardFromHand(list, idx, cb) {
    if (idx >= list.length) { if (cb) cb(); return; }
    let type = list[idx];
    let foundIdx = -1;

    // Buscar una carta aleatoria del tipo correspondiente
    if (type === "any") {
        if (hand.length > 0) {
            foundIdx = Math.floor(Math.random() * hand.length);
        }
    } else {
        // Buscar todas las cartas de ese tipo
        let indices = hand
            .map((c, i) => c.tipo === type ? i : -1)
            .filter(i => i !== -1);
        if (indices.length > 0) {
            let rand = Math.floor(Math.random() * indices.length);
            foundIdx = indices[rand];
        }
    }

    if (foundIdx === -1) {
        // No se encontró carta, pasar a la siguiente
        discardFromHand(list, idx + 1, cb);
        return;
    }

    // Animación
    let card = hand[foundIdx];
    openHandModal(() => {
        // TODO: scroll horizontal to card index
        let $thumb = $(`#hand-card-thumb-${card.index}`);
        if ($thumb.length) {
            let pos = $thumb.offset();
            let width = $thumb.width();
            let height = $thumb.height();

            let $container = $(`
                <div class="card-flip-container" style="position:fixed; z-index:3000; left:${pos.left}px; top:${pos.top}px; width:${width}px; height:${height}px;">
                </div>
            `).appendTo('body');

            let imgSrc = `images/cards/${card.index}-front.jpg`;

            // Crear mitades izquierda y derecha
            let $left = $(`
                <div class="card-face" style="width:50%;height:100%;left:0;position:absolute;overflow:hidden;">
                    <img src="${imgSrc}" style="width:200%;height:100%;object-fit:cover;object-position:left;">
                </div>
            `);
            let $right = $(`
                <div class="card-face" style="width:50%;height:100%;left:50%;position:absolute;overflow:hidden;">
                    <img src="${imgSrc}" style="width:200%;height:100%;object-fit:cover;object-position:right;">
                </div>
            `);

            // Añadir animaciones
            $left.addClass('break-left');
            $right.addClass('break-right');
            $container.append($left, $right);

            $thumb.css('visibility', 'hidden');

            setTimeout(() => {
                $container.remove();
                $thumb.css('opacity', 1).css('visibility', 'hidden');
                hand.splice(foundIdx, 1);
                updateHandIcon();
                updateHandModal();
                discardFromHand(list, idx + 1, cb);
            }, 700);
        }
    });
}

// Actualiza el icono de la mano
function updateHandIcon() {
    $('#hand-count').text(hand.length);
}

// === MODAL DE MANO ===

function openHandModal(cb) {
    $('#hand-modal').addClass('active');
    updateHandModal();
    if (cb) setTimeout(cb, 200);
}
function closeHandModal() {
    $('#hand-modal').removeClass('active');
}
function updateHandModal() {
    let $hand = $('#hand-cards');
    $hand.empty();
    if (hand.length === 0) {
        $('#hand-empty').removeClass('d-none');
    } else {
        $('#hand-empty').addClass('d-none');
        hand.forEach((c, i) => {
            $hand.append(`
                <img src="images/cards/${c.index}-front.jpg" class="hand-card-thumb me-2" id="hand-card-thumb-${c.index}" data-idx="${i}" alt="Carta ${c.index}">
            `);
        });
        $('.hand-card-thumb').off('click').on('click', function (e) {
            let idx = Number($(this).data('idx'));
            openCardDetailModal(hand[idx]);
        });
    }
}

// === MODAL DETALLE CARTA EN MANO ===

function openCardDetailModal(cardObj) {
    $('#card-detail-modal').addClass('active');
    let card = options.find(c => c.index === cardObj.index);
    let flipped = false;
    let $area = $('#card-detail-area');
    $area.html(`
        <div class="card-flip-container" id="detail-flip-container">
            <div class="card-flip" id="detail-card-flip">
                <div class="card-face front"><img src="images/cards/${card.index}-front.jpg"></div>
                <div class="card-face back"><img src="images/cards/${card.index}-back.jpg"></div>
            </div>
        </div>
    `);
    $('#detail-card-flip').off('click').on('click', function () {
        flipped = !flipped;
        $(this).toggleClass('flipped');
    });
    // Mostrar opción elegida
    let opt = cardObj.optionIndex !== null ? card.opciones[cardObj.optionIndex] : null;
    $('#card-detail-option').text('Elegiste: ' + (opt ? opt.text : ''));
    $('#card-detail-info').text(opt ? opt.info : '');
}
function closeCardDetailModal() {
    $('#card-detail-modal').removeClass('active');
}
