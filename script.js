// Decks
let deckNox = [];
let deckStory = [];

// Piles
let hand = [];
let trash = [];

// Flags
let isCardFlipped = false;
let areCardOptionsShown = false;


// Init ----------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    deckNox = cards.filter(opt => opt.type !== CardType.Historia);
    deckStory = cards.filter(opt => opt.type === CardType.Historia);

    updatePileCount("#hand-count", hand);
    updatePileCount("#trash-count", trash);

    bindEvents();
});

function bindEvents() {
    $('#deck-nox').off('click').on('click', () => drawCardRandom(deckNox));
    $('#deck-story').off('click').on('click', () => drawCardRandom(deckStory));

    $('#hand-container').off('click').on('click', () => renderPile(hand, '#hand-modal', '#hand-cards', '#hand-empty'));
    $('#trash-container').off('click').on('click', () => renderPile(trash, '#trash-modal', '#trash-cards', '#trash-empty'));

    $('#close-hand-modal').off('click').on('click', closeHandModal);
    $('#close-trash-modal').off('click').on('click', closeTrashModal);

    $('#close-card-detail-modal').off('click').on('click', closeCardDetailModal);

    // Close modals clicking outside
    $('#hand-modal').on('mousedown', function (e) {
        if (e.target === this) closeHandModal();
    });
    $('#trash-modal').on('mousedown', function (e) {
        if (e.target === this) closeTrashModal();
    });
    $('#card-detail-modal').on('mousedown', function (e) {
        if (e.target === this) closeCardDetailModal();
    });

    $(document).off('keydown').on('keydown', function (e) {
        if (e.key === "Escape") {
            closeHandModal();
            closeTrashModal();
            closeCardDetailModal();
        }
    });
}


// Interaction ---------------------------------------------------------------------------------------------------------

function setInteractionBlocked(isBlocked) {
    const buttons = $('#deck-nox, #deck-story, #hand-container, #close-hand-modal, #trash-container, #close-trash-modal, #close-card-detail-modal, #save-card-btn, #discard-card-btn');
    const flip = $('#main-card-flip, #detail-card-flip');
    const modals = $('#hand-modal, #trash-modal, #card-detail-modal');
    if (isBlocked) {
        buttons.css('pointer-events', 'none').attr('disabled', true);
        flip.css('pointer-events', 'none');
        modals.off('mousedown').css('pointer-events', 'none');
        $(document).off('keydown');
    } else {
        buttons.css('pointer-events', 'auto').removeAttr('disabled');
        flip.css('pointer-events', 'auto');
        modals.css('pointer-events', 'auto');
        bindEvents();
    }
}


// Deck NOX ------------------------------------------------------------------------------------------------------------

function drawCardRandom(deck) {
    if (deck.length === 0) return;
    $('#deck-nox, #deck-story').hide();
    const elements = $('#card-area, #options-area, #info-area, #random-area, #final-options-area');
    elements.empty();
    elements.removeClass("mb-4");

    isCardFlipped = false;
    areCardOptionsShown = false;

    let idx = Math.floor(Math.random() * deck.length);
    let currentCard = deck[idx];
    deck.splice(idx, 1);

    showCard(currentCard, false);
}


// Card options --------------------------------------------------------------------------------------------------------

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
        isCardFlipped = !isCardFlipped;
        $(this).toggleClass('flipped');
        if (isCardFlipped && !areCardOptionsShown) {
            setTimeout(() => showCardOptions(card), 400);
            areCardOptionsShown = true;
        }
    });
}

function showCardOptions(card) {
    let html = '';
    card.options.forEach((opt, i) => {
        html += `<button class="btn card-option-btn" data-idx="${i}">${opt.text}</button>`;
    });
    $('#options-area').html(html).addClass("mb-4");
    $('#card-area').addClass("mb-4");

    scrollDown();

    $('.card-option-btn').off('click').on('click', function () {
        let optIdx = Number($(this).data('idx'));
        chooseOption(card, optIdx);
    });
}

function chooseOption(card, optIdx) {
    $('#options-area').empty().removeClass("mb-4");
    $('#info-area').addClass("mb-4");

    let opt = card.options[optIdx];
    card._chosenOption = optIdx;

    scrollDown();
    [200, 400, 600].forEach(t => setTimeout(scrollDown, t));

    animateTypeWriter('#info-area', opt.info, 1000, () => {
        scrollDown();
        handleOptionOutcome(card, opt, optIdx);
    });
}

function handleOptionOutcome(card, opt, optIdx) {
    if (opt.dice) {
        showDice(opt, card, optIdx);
    } else if (opt.coin) {
        showCoin(opt, card, optIdx);
    } else {
        showStoreDiscardButtons(card, opt, optIdx);
    }
}

function showStoreDiscardButtons(card, opt, optIdx) {
    showStoreButton(card, opt, optIdx);
    showDiscardButton(card, opt, optIdx);
}

function showStoreButton(card, opt, optIdx) {
    let finalOptionsArea = $('#final-options-area');
    finalOptionsArea.append(`<button class="btn" id="save-card-btn">Guardar</button>`);
    finalOptionsArea.addClass("mb-4");
    scrollDown();
    $('#save-card-btn').off('click').on('click', function () {
        setInteractionBlocked(true);
        scrollUp();
        setTimeout(() => {
            animateCardMovement(card, '#hand-container', () => {
                addToHand(card, optIdx);
                resetAreas();
                setInteractionBlocked(false);
            });
        }, document.documentElement.scrollTop > 0 ? 700 : 0);
    });
}

function showDiscardButton(card, opt, optIdx) {
    let finalOptionsArea = $('#final-options-area');
    finalOptionsArea.append(`<button class="btn" id="discard-card-btn">Descartar</button>`);
    finalOptionsArea.addClass("mb-4");
    scrollDown();
    $('#discard-card-btn').off('click').on('click', function () {
        setInteractionBlocked(true);
        scrollUp();
        setTimeout(() => {
            animateCardMovement(card, '#trash-container', () => {
                addToTrash(card, optIdx);
                resetAreas();
                setInteractionBlocked(false);
            });
        }, document.documentElement.scrollTop > 0 ? 700 : 0);
    });
}

function resetAreas() {
    $('#deck-nox, #deck-story').show();
    $('#card-area, #options-area, #info-area, #random-area, #final-options-area').empty();
}


// Hand & Trash --------------------------------------------------------------------------------------------------------

function updatePileCount(selector, pile) {
    $(selector).text(pile.length);
}

function addToPile(pile, card, chosenOptionIndex, counterSelector) {
    pile.push({
        index: card.index,
        type: card.type,
        chosenOptionIndex: (typeof chosenOptionIndex === "number" ? chosenOptionIndex : null)
    });
    updatePileCount(counterSelector, pile);
}

function addToHand(card, chosenOptionIndex) {
    addToPile(hand, card, chosenOptionIndex, "#hand-count");
}

function addToTrash(card, chosenOptionIndex) {
    addToPile(trash, card, chosenOptionIndex, "#trash-count");
}

function renderPile(pile, modalSelector, containerSelector, emptySelector) {
    $(modalSelector).addClass('active');
    let $container = $(containerSelector).empty();
    if (pile.length === 0) {
        $(emptySelector).removeClass('d-none');
    } else {
        $(emptySelector).addClass('d-none');
        pile.forEach((c, i) => {
            $container.append(`
                <img src="images/cards/${c.index}-front.jpg" class="hand-card-thumb me-2" data-idx="${i}" alt="Carta ${c.index}">
            `);
        });
        $(`${containerSelector} .hand-card-thumb`).off('click').on('click', function () {
            let idx = Number($(this).data('idx'));
            openCardDetailModal(pile[idx]);
        });
    }
}

function closeHandModal() {
    $('#hand-modal').removeClass('active');
}

function closeTrashModal() {
    $('#trash-modal').removeClass('active');
}


// Card detail ---------------------------------------------------------------------------------------------------------

function openCardDetailModal(cardObj) {
    $('#card-detail-modal').addClass('active');
    let card = cards.find(c => c.index === cardObj.index);
    let flipped = false;

    $('#card-detail-area').html(`
        <div class="card-flip-container" id="detail-flip-container">
            <div class="card-flip" id="detail-card-flip">
                <div class="card-face front"><img src="images/cards/${card.index}-front.jpg" alt="Front"></div>
                <div class="card-face back"><img src="images/cards/${card.index}-back.jpg" alt="Back"></div>
            </div>
        </div>
    `);

    $('#detail-card-flip').off('click').on('click', function () {
        flipped = !flipped;
        $(this).toggleClass('flipped');
    });

    let opt = cardObj.chosenOptionIndex !== null ? card.options[cardObj.chosenOptionIndex] : null;
    $('#card-detail-option').text('Elegiste: ' + (opt ? opt.text : ''));
    $('#card-detail-info').text(opt ? opt.info : '');
}

function closeCardDetailModal() {
    $('#card-detail-modal').removeClass('active');
}


// Text anims ----------------------------------------------------------------------------------------------------------

function animateTypeWriter(selector, text, duration, callback) {
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
        } else if (callback) callback();
    }
    nextWord();
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $('#final-options-area').offset().top - 50 }, 300);
}
function scrollUp() {
    $('html, body').animate({ scrollTop: $('#card-area').offset().top - 50 }, 300);
}


// Card anims ----------------------------------------------------------------------------------------------------------

function animateCardMovement(card, moveToId, cb) {
    $('.card-flip-container')[0].style.visibility = 'hidden';
    let cardArea = $('#card-area');
    let $clone = $(`
        <div id="card-clone" class="card-flip-container" style="position:fixed; left:${cardArea.offset()?.left || 0}px; top:${cardArea.offset()?.top || 0}px; z-index:2000;">
            <div class="card-flip${isCardFlipped ? ' flipped' : ''}">
                <div class="card-face front"><img src="images/cards/${card.index}-front.jpg" alt="Front"></div>
                <div class="card-face back"><img src="images/cards/${card.index}-back.jpg" alt="Back"></div>
            </div>
        </div>
    `).appendTo('body');

    const targetRect = $(moveToId)[0].getBoundingClientRect();
    const cloneRect = $clone[0].getBoundingClientRect();
    $clone[0].style.top = `${targetRect.top + (targetRect.height / 2) - (cloneRect.height / 2)}px`;
    $clone[0].style.left = `${targetRect.left + (targetRect.width / 2) - (cloneRect.width / 2)}px`;

    setTimeout(() => {
        $clone.addClass('save-card');
        setTimeout(() => { $clone.remove(); if (cb) cb(); }, 710);
    }, 10);
}


// Random --------------------------------------------------------------------------------------------------------------

function showDice(opt, card, optIdx) {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    let randomArea = $('#random-area');
    randomArea.html(`
      <div class="result-reveal-container" style="position:relative; display:inline-block; width:120px; height:70px;">
        <img src="images/random/dice.png" alt="Dado" id="dice-img" class="result-img" style="width:70px; position:absolute; left:25px; top:0; z-index:2;">
        <span id="dice-result" class="fs-4 result-value" style="position:absolute; left:25px; top:18px; z-index:1; opacity:0;"></span>
      </div>
    `).addClass("mb-4");

    scrollDown();
    setTimeout(() => {
        let diceImg = $('#dice-img');
        let diceResult = $('#dice-result');
        diceImg.addClass('dice-anim');
        setTimeout(() => {
            diceImg.removeClass('dice-anim');
            diceResult.text(diceValue);
            diceImg.addClass('reveal-move');
            diceResult.addClass('reveal-move');
            setTimeout(() => showStoreDiscardButtons(card, opt, optIdx), 900);
        }, 810);
    }, isScrollPending() ? 400 : 0);
}

function showCoin(opt, card, optIdx) {
    let coinValue = Math.random() < 0.5 ? "CARA" : "CRUZ";
    let randomArea = $('#random-area');
    randomArea.html(`
      <div class="result-reveal-container" style="position:relative; display:inline-block; width:120px; height:70px;">
        <img src="images/random/coin.png" alt="Moneda" id="coin-img" class="result-img" style="width:70px; position:absolute; left:25px; top:0; z-index:2;">
        <span id="coin-result" class="fs-4 result-value" style="position:absolute; left:25px; top:18px; z-index:1; opacity:0;"></span>
      </div>
    `).addClass("mb-4");

    scrollDown();
    setTimeout(() => {
        let coinImg = $('#coin-img');
        let coinResult = $('#coin-result');
        coinImg.addClass('coin-anim');
        setTimeout(() => {
            coinImg.removeClass('coin-anim');
            coinResult.text(coinValue);
            coinImg.addClass('reveal-move');
            coinResult.addClass('reveal-move');
            setTimeout(() => showStoreDiscardButtons(card, opt, optIdx), 900);
        }, 1010);
    }, isScrollPending() ? 400 : 0);
}

function isScrollPending() {
    return document.documentElement.scrollTop < (document.documentElement.scrollHeight - document.documentElement.clientHeight);
}
