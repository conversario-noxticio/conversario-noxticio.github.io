// Decks
let deckNox = [];
let deckStory = [];

// Piles
let hand = [];
let trash = [];

// Random
let diceResult = 0;
let coinResult = ""


// Init ----------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    deckNox = cards.filter(c => c.type !== CardType.Historia);
    deckStory = cards.filter(c => c.type === CardType.Historia);

    updatePileCount("#hand-count", hand);
    updatePileCount("#trash-count", trash);

    bindEvents();
});

function bindEvents() {
    $('#deck-nox').off('click').on('click', () => renderPileNox());
    $('#deck-story').off('click').on('click', () => renderPileStory());

    $('#hand-container').off('click').on('click', () => renderPileHand());
    $('#trash-container').off('click').on('click', () => renderPileTrash());

    $('#close-deck-modal').off('click').on('click', closeDeckModal);
    $('#close-card-detail-modal').off('click').on('click', closeCardDetailModal);

    // Close modals clicking outside
    $('#deck-modal').on('mousedown', e => { if (e.target === e.currentTarget) closeDeckModal(); });
    $('#card-detail-modal').on('mousedown', e => { if (e.target === e.currentTarget) closeCardDetailModal(); });

    $(document).off('keydown').on('keydown', e => {
        if (e.key === "Escape") {
            closeDeckModal();
            closeCardDetailModal();
        }
    });
}


// Interaction ---------------------------------------------------------------------------------------------------------

function setInteractionBlocked(isBlocked) {
    const buttons = $('#deck-nox, #deck-story, #hand-container, #trash-container, #close-deck-modal, #close-card-detail-modal, .hand-card-thumb, .btn');
    const flip = $('#main-card-flip, #detail-card-flip');
    const modals = $('#deck-modal, #card-detail-modal');
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


// Decks ---------------------------------------------------------------------------------------------------------------

function drawCardRandom(deck) {
    if (deck.length === 0) return;

    $('#deck-nox, #deck-story').hide();
    $('#card-area, #options-area, #info-area, #random-area, #final-options-area').empty().removeClass("mb-4");

    let idx = Math.floor(Math.random() * deck.length);
    let card = deck[idx];
    deck.splice(idx, 1);

    let $clone = $(`
        <div class="card-flip-container draw-card">
            <div class="card-flip" id="main-card-flip">
                <div class="card-face front">
                    <img src="images/cards/${card.index}-front.jpg" alt="Anverso">
                </div>
                <div class="card-face back">
                    <img src="images/cards/${card.index}-back.jpg" alt="Reverso">
                </div>
            </div>
        </div>
    `).appendTo('#card-area');

    setInteractionBlocked(true);
    setInteractionBlocked(false);
    setTimeout(() => {
        $('#card-area').html($clone.clone().removeClass('draw-card'));
        $clone.remove();
    }, 520);

    let isCardFlipped = false;
    let areCardOptionsShown = false;
    $(document).off('click', '#main-card-flip').on('click', '#main-card-flip', function () {
        isCardFlipped = !isCardFlipped;
        $(this).toggleClass('flipped');
        if (isCardFlipped && !areCardOptionsShown) {
            setInteractionBlocked(true);
            setTimeout(() => {
                setInteractionBlocked(false);
                showCardOptions(card);
            }, 400);
            areCardOptionsShown = true;
        }
    });
}

function discardCardRandom(deck, type, obtainingMethod) {
    if (deck.length === 0) return;

    let deckFiltered = deck.filter(c => (type === "" || c.type === type));
    if (deckFiltered.length === 0) return;

    const cardFilteredIndex = Math.floor(Math.random() * deckFiltered.length);
    const card = deckFiltered[cardFilteredIndex];
    const deckIndex = deck.findIndex(c => c.index === card.index);
    setInteractionBlocked(true);
    animateCardThumbMovementScroll(cardFilteredIndex, "#trash-container", () => {
        setInteractionBlocked(false);
        addToTrash(deck[deckIndex], null, obtainingMethod);
        removeFromPile(hand, card, "#hand-count");
        renderPileHand();
    });
}


// Types ---------------------------------------------------------------------------------------------------------------

function getCardTypeImage(type) {
    switch (type) {
        case CardType.Ataque:
            return "images/types/ataque.png";
        case CardType.Apoyo:
            return "images/types/apoyo.png";
        case CardType.Defensa:
            return "images/types/defensa.png";
        case CardType.Magia:
            return "images/types/magia.png";
        default:
            return "";
    }
}


// Card options --------------------------------------------------------------------------------------------------------

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

    setInteractionBlocked(true);
    animateTypeWriter('#info-area', opt.info, 800, () => {
        setInteractionBlocked(false);
        scrollDown();
        handleOptionOutcome(card, opt, optIdx);
    });
}

function handleOptionOutcome(card, opt, optIdx) {
    const handleOptionOutcomeButtons = () => {
        if (opt.save()) {
            createActionButton("#final-options-area", "Guardar en tu mano", "main-save-card-btn", "save-card-btn", "#hand-container", '#card-area', card, () => {
                addToHand(card, optIdx, ObtainingMethod.FromPlayToHand);
            });
        }
        if (opt.discard()) {
            createActionButton("#final-options-area", "Descartar", "main-discard-card-btn", "discard-card-btn", "#trash-container", '#card-area', card, () => {
                addToTrash(card, optIdx, ObtainingMethod.FromPlayToTrash);
            });
        }
    };

    if (opt.dice) {
        showDice(opt, card, optIdx, handleOptionOutcomeButtons);
    } else if (opt.coin) {
        showCoin(opt, card, optIdx, handleOptionOutcomeButtons);
    } else {
        handleOptionOutcomeButtons();
    }
}

function createActionButton(areaId, label, btnId, btnClass, moveToId, cardAreaId, card, action) {
    let area = $(areaId);
    area.append(`<button id="${btnId}" class="btn ${btnClass}">${label}</button>`);
    area.addClass("mb-4");
    scrollDown();

    $(`#${btnId}`).off('click').on('click', function () {
        if (card != null) {
            setInteractionBlocked(true);
            scrollUp();
            setTimeout(() => {
                animateCardMovement(card, moveToId, cardAreaId, () => {
                    setInteractionBlocked(false);
                    action();
                    resetAreas();
                });
            }, isScrollUpPending() ? 700 : 0);
        } else {
            action();
        }
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

function addToPile(pile, card, chosenOptionIndex, obtainingMethod, counterSelector) {
    pile.push({
        index: card.index,
        type: card.type,
        chosenOptionIndex: (typeof chosenOptionIndex === "number" ? chosenOptionIndex : null),
        obtainingMethod: obtainingMethod
    });
    updatePileCount(counterSelector, pile);
}

function removeFromPile(pile, card, counterSelector) {
    const index = pile.findIndex(c => c.index === card.index);
    if (index >= 0) {
        pile.splice(index, 1);
        updatePileCount(counterSelector, pile);
    }
}

function addToHand(card, chosenOptionIndex, obtainingMethod) {
    addToPile(hand, card, chosenOptionIndex, obtainingMethod, "#hand-count");
}

function addToTrash(card, chosenOptionIndex, obtainingMethod) {
    addToPile(trash, card, chosenOptionIndex, obtainingMethod, "#trash-count");
}

function renderPile(pile, title, titleClass) {
    $('#deck-modal').addClass('active');

    let titleElement = $('#deck-modal-title');
    titleElement.text(title);
    titleElement.removeClass();
    titleElement.addClass("mb-4 " + titleClass);

    $('#deck-modal-options').empty();

    let $container = $('#deck-modal-cards').empty();
    if (pile.length === 0) {
        $('#deck-modal-empty').text("No hay ninguna carta").removeClass('d-none');
    } else {
        $('#deck-modal-empty').addClass('d-none');
        pile.forEach((c, i) => {
            $container.append(`
                <img src="images/cards/${c.index}-front.jpg" class="hand-card-thumb" data-idx="${i}" alt="Carta ${c.index}">
            `);
        });
        $('#deck-modal-cards .hand-card-thumb').off('click').on('click', function () {
            let idx = Number($(this).data('idx'));
            openCardDetailModal(pile[idx]);
        });
    }
}

function closeDeckModal() {
    $('#deck-modal').removeClass('active');
}

function renderPileNox() {
    renderPile(deckNox, "Mazo NOX", "nox-modal-title");
    if (deckNox.length > 0) {
        createActionButton("#deck-modal-options", "Sacar aleatoria", "pile-random-btn", "save-card-btn", "#trash-container", '#detail-flip-container', null, () => {
            drawCardRandom(deckNox)
            closeCardDetailModal();
            closeDeckModal();
        });
    }
}

function renderPileStory() {
    renderPile(deckStory, "Mazo de historia", "story-modal-title");
}

function renderPileHand() {
    renderPile(hand, "Tu mano", "hand-modal-title");
    let currentTypes = []
    if (hand.length > 0) {
        currentTypes.push({type: "", img: ""});
    }
    [CardType.Ataque, CardType.Apoyo, CardType.Defensa, CardType.Magia, CardType.Historia].forEach(type => {
        if (hand.filter(c => c.type === type).length > 0) {
            let typeImg = getCardTypeImage(type);
            let img = (typeImg === "") ? "" : `<img src="${typeImg}" alt="Card Type" class="card-type-mini">`;
            currentTypes.push({type: type, img: img});
        }
    })
    currentTypes.forEach(currentType => {
        let type = currentType.type;
        createActionButton("#deck-modal-options", "Descartar aleatoria" + ((type !== "") ? (" " + type + currentType.img) : ""), ((type !== "") ? (type + "-") : "") + "pile-discard-random-btn", "discard-card-btn", "#trash-container", '#detail-flip-container', null, () => {
            discardCardRandom(hand, type, ObtainingMethod.FromHandToTrash);
        });
    });
}

function renderPileTrash() {
    renderPile(trash, "Cartas descartadas", "trash-modal-title");
}

// Card detail ---------------------------------------------------------------------------------------------------------

function openCardDetailModal(cardObj) {
    $('#card-detail-modal').addClass('active');
    let card = cards.find(c => c.index === cardObj.index);

    $('#card-detail-area').html(`
        <div class="card-flip-container" id="detail-flip-container">
            <div class="card-flip" id="detail-card-flip">
                <div class="card-face front"><img src="images/cards/${card.index}-front.jpg" alt="Front"></div>
                <div class="card-face back"><img src="images/cards/${card.index}-back.jpg" alt="Back"></div>
            </div>
        </div>
    `);

    let isCardFlipped = false;
    $('#detail-card-flip').off('click').on('click', function () {
        isCardFlipped = !isCardFlipped;
        $(this).toggleClass('flipped');
    });

    let obtainingMethod = "";
    if (hand.find(c => c.index === cardObj.index) || trash.find(c => c.index === cardObj.index)) {
        obtainingMethod = cardObj.obtainingMethod;
    }
    $('#card-detail-obtaining-method').text(obtainingMethod);

    let optIndex = cardObj.chosenOptionIndex;
    if (cardObj.obtainingMethod === ObtainingMethod.FromPlayToHand || cardObj.obtainingMethod === ObtainingMethod.FromPlayToTrash) {
        let opt = optIndex !== null ? card.options[optIndex] : null;
        $('#card-detail-option').html(`<b>Elegiste</b>: ${opt ? opt.text : ''}`);
        $('#card-detail-info').text(opt ? opt.info : '');
    }

    if (hand.find(c => c.index === cardObj.index)) {
        createActionButton("#card-detail-options", "Descartar", "detail-discard-card-btn", "discard-card-btn", "#trash-container", '#detail-flip-container', card, () => {
            addToTrash(card, optIndex, ObtainingMethod.FromHandToTrash);
            removeFromPile(hand, card,"#hand-count");
            closeCardDetailModal();
            renderPileHand();
        });
    } else if (trash.find(c => c.index === cardObj.index)) {
        createActionButton("#card-detail-options", "Guardar en tu mano", "detail-save-card-btn", "save-card-btn", "#hand-container", '#detail-flip-container', card, () => {
            addToHand(card, optIndex, ObtainingMethod.FromTrashToHand);
            removeFromPile(trash, card,"#trash-count");
            closeCardDetailModal();
            renderPileTrash();
        });
    } else if (deckStory.find(c => c.index === cardObj.index)) {
        createActionButton("#card-detail-options", "Guardar en tu mano", "detail-save-card-btn", "save-card-btn", "#hand-container", '#detail-flip-container', card, () => {
            addToHand(card, optIndex, ObtainingMethod.FromStory);
            removeFromPile(deckStory, card,"");
            closeCardDetailModal();
            renderPileStory();
        });
    }
}

function closeCardDetailModal() {
    $('#card-detail-modal').removeClass('active');
    $('#card-detail-area, #card-detail-option, #card-detail-info, #card-detail-options').empty();
}


// Text anim -----------------------------------------------------------------------------------------------------------

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

function isScrollDownPending() {
    return document.documentElement.scrollTop < (document.documentElement.scrollHeight - document.documentElement.clientHeight);
}

function isScrollUpPending() {
    return ($('#card-detail-modal').hasClass('active') ? $(".card-detail-modal-content").scrollTop() : document.documentElement.scrollTop) > 0;
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $('#final-options-area').offset().top - 50 }, 300);
}

function scrollUp() {
    $('html, body').animate({ scrollTop: $('#card-area').offset().top - 50 }, 300);
    $('.modal-content').animate({ scrollTop: $('#close-card-detail-modal').offset().top - 50 }, 300);
}


// Card anim -----------------------------------------------------------------------------------------------------------

function animateCardMovement(card, moveToId, cardAreaId, callback) {
    let container = $('.card-flip-container');
    container[0].style.visibility = 'hidden';
    let cardArea = $(cardAreaId);
    let isCardFlipped = container.children()[0].classList.contains('flipped');
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
        setTimeout(() => {
            $clone.remove();
            if (callback) callback();
        }, 710);
    }, 10);
}

function animateCardThumbMovementScroll(cardIndex, moveToId, callback) {
    let cardThumb = $(`#deck-modal-cards .hand-card-thumb[data-idx="${cardIndex}"]`);
    if (cardThumb.length === 0) {
        if (callback) callback();
        return;
    }

    let container = $('.hand-modal-content');
    let containerTop = container.scrollTop();
    let containerBottom = containerTop + container.height();

    let thumbTop = cardThumb.position().top + containerTop;
    let thumbBottom = thumbTop + cardThumb.outerHeight(true);

    if (thumbTop < containerTop || thumbBottom > containerBottom) {
        container.animate({
            scrollTop: thumbTop - (container.height() / 2) + (cardThumb.outerHeight(true) / 2)
        }, 400, () => {
            animateCardThumbMovement(cardIndex, moveToId, callback);
        });
    } else {
        animateCardThumbMovement(cardIndex, moveToId, callback);
    }
}

function animateCardThumbMovement(cardIndex, moveToId, callback) {
    const cardThumb = $(`#deck-modal-cards .hand-card-thumb[data-idx="${cardIndex}"]`);
    cardThumb[0].style.visibility = 'hidden';
    const cloneRect = cardThumb[0].getBoundingClientRect();
    const $clone = $(`
        <img id="card-clone" src="${cardThumb.attr("src")}" class="hand-card-thumb" style="position:fixed; left:${cloneRect.left}px; top:${cloneRect.top}px; z-index:2000;">
    `).appendTo('body');

    const targetRect = $(moveToId)[0].getBoundingClientRect();
    $clone[0].style.top = `${targetRect.top + (targetRect.height / 2) - (cloneRect.height / 2)}px`;
    $clone[0].style.left = `${targetRect.left + (targetRect.width / 2) - (cloneRect.width / 2)}px`;

    setTimeout(() => {
        $clone.addClass('save-card');
        setTimeout(() => {
            $clone.remove();
            if (callback) callback();
        }, 710);
    }, 10);
}


// Random --------------------------------------------------------------------------------------------------------------

function showDice(opt, card, optIdx, callback) {
    diceResult = Math.floor(Math.random() * 6) + 1;
    let randomArea = $('#random-area');
    randomArea.html(`
      <div class="result-reveal-container">
        <img src="images/random/dice.png" alt="Dado" id="dice-img" class="result-img">
        <span id="dice-result" class="fs-4 result-value"></span>
      </div>
    `).addClass("mb-4");

    scrollDown();
    setInteractionBlocked(true);
    setTimeout(() => {
        let diceImg = $('#dice-img');
        let diceResult = $('#dice-result');
        diceImg.addClass('dice-anim');
        setTimeout(() => {
            diceImg.removeClass('dice-anim');
            diceResult.text(diceResult);
            diceImg.addClass('reveal-move');
            diceResult.addClass('reveal-move');
            setTimeout(() => {
                setInteractionBlocked(false);
                if (callback) callback();
            }, 900);
        }, 810);
    }, isScrollDownPending() ? 400 : 0);
}

function showCoin(opt, card, optIdx, callback) {
    coinResult = Math.random() < 0.5 ? "CARA" : "CRUZ";
    let randomArea = $('#random-area');
    randomArea.html(`
      <div class="result-reveal-container">
        <img src="images/random/coin.png" alt="Moneda" id="coin-img" class="result-img">
        <span id="coin-result" class="fs-4 result-value"></span>
      </div>
    `).addClass("mb-4");

    scrollDown();
    setInteractionBlocked(true);
    setTimeout(() => {
        let coinImg = $('#coin-img');
        let coinResult = $('#coin-result');
        coinImg.addClass('coin-anim');
        setTimeout(() => {
            coinImg.removeClass('coin-anim');
            coinResult.text(coinResult);
            coinImg.addClass('reveal-move');
            coinResult.addClass('reveal-move');
            setTimeout(() => {
                setInteractionBlocked(false);
                if (callback) callback();
            }, 900);
        }, 1010);
    }, isScrollDownPending() ? 400 : 0);
}
