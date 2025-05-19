let totalCards = Object.keys(cardOptionsData).map(Number); // Array con los IDs de todas las cartas
let remainingCards = [...totalCards];
let hand = [];
let currentCardId = null;

const drawCardBtn = document.getElementById("draw-card-btn");
const cardContainer = document.getElementById("card-container");
const optionsContainer = document.getElementById("options-container");
const handIcon = document.getElementById("hand-icon");
const handContainer = document.getElementById("hand-container");
const handCountSpan = document.getElementById("hand-count");
const modal = document.getElementById("modal");
const modalCard = document.getElementById("modal-card");
const modalOptionText = document.getElementById("modal-option-text");

(function init() {
    remainingCards = [...totalCards];
    updateDrawButton();
})();

drawCardBtn.addEventListener("click", () => {
    if (remainingCards.length === 0) return;

    drawCardBtn.style.display = "none";
    handIcon.disabled = true;
    handContainer.style.display = "none";
    cardContainer.innerHTML = "";
    optionsContainer.innerHTML = "";

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const cardId = remainingCards.splice(randomIndex, 1)[0];
    currentCardId = cardId;

    const card = document.createElement("div");
    card.className = "card";

    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        if (!optionsContainer.hasChildNodes()) {
            loadOptions(cardId);
        }
    });

    const front = document.createElement("div");
    front.className = "card-face card-front";
    const imgFront = document.createElement("img");
    imgFront.src = `images/cards/${cardId}-front.jpg`;
    front.appendChild(imgFront);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const imgBack = document.createElement("img");
    imgBack.src = `images/cards/${cardId}-back.jpg`;
    back.appendChild(imgBack);

    card.appendChild(front);
    card.appendChild(back);
    cardContainer.appendChild(card);

    updateDrawButton();
});

function loadOptions(cardId) {
    const options = cardOptionsData[cardId] || [{ text: "...", info: "", canStore: false }];
    showDecisionOptions(options, cardId);
}

function showDecisionOptions(options, cardId) {
    optionsContainer.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => showFinalChoice(cardId, option);
        optionsContainer.appendChild(btn);
    });
}

function showFinalChoice(cardId, option) {
    optionsContainer.innerHTML = "";

    if (option.info) {
        const infoDiv = document.createElement("div");
        infoDiv.style.marginBottom = "10px";
        infoDiv.style.fontStyle = "italic";
        infoDiv.textContent = option.info;
        optionsContainer.appendChild(infoDiv);
    }

    const animateAndCleanupToHand = (callback, targetElement = null) => {
        const card = cardContainer.querySelector(".card");
        if (!card) return callback();

        // Deshabilitar botones durante animación
        disableOptionButtons(true);

        const rect = card.getBoundingClientRect();

        // Detectar si está volteada la carta para elegir la cara visible
        const isFlipped = card.classList.contains("flipped");
        const faceSelector = isFlipped ? ".card-back img" : ".card-front img";
        const img = card.querySelector(faceSelector);

        // Crear clon de la imagen visible en lugar de toda la carta
        const clone = img.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.transition = "all 0.4s ease-in-out";
        clone.style.zIndex = 9999;

        document.body.appendChild(clone);
        card.style.visibility = "hidden"; // Oculta la carta original

        requestAnimationFrame(() => {
            const targetRect = targetElement.getBoundingClientRect();
            const deltaX = targetRect.left + targetRect.width / 2 - rect.left - rect.width / 2;
            const deltaY = targetRect.top + targetRect.height / 2 - rect.top - rect.height / 2;

            clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
            clone.style.transitionTimingFunction = "ease-in";

            setTimeout(() => {
                clone.style.opacity = 0;
            }, 300);
        });

        setTimeout(() => {
            document.body.removeChild(clone);
            cardContainer.innerHTML = "";
            disableOptionButtons(false);
            callback();
        }, 400);
    };

    const animateAndCleanupDestroy = (callback, targetElement = null) => {
        const card = cardContainer.querySelector(".card");
        if (!card) return callback();

        disableOptionButtons(true);

        const rect = card.getBoundingClientRect();
        card.style.visibility = "hidden";

        const leftHalf = document.createElement("div");
        const rightHalf = document.createElement("div");

        // Detectar si está flipped para elegir la imagen correcta
        const isFlipped = card.classList.contains("flipped");
        const bgImage = isFlipped
            ? `url(images/cards/${cardId}-back.jpg)`
            : `url(images/cards/${cardId}-front.jpg)`;

        [leftHalf, rightHalf].forEach(half => {
            half.className = "card-half";
            half.style.backgroundImage = bgImage;
            half.style.backgroundSize = `${rect.width}px ${rect.height}px`;
            half.style.position = "absolute";
            half.style.top = `${rect.top}px`;
            half.style.width = `${rect.width / 2}px`;
            half.style.height = `${rect.height}px`;
            half.style.zIndex = 9999;
            half.style.opacity = "1";
        });

        leftHalf.style.left = `${rect.left}px`;
        leftHalf.style.backgroundPosition = `left top`;

        rightHalf.style.left = `${rect.left + rect.width / 2}px`;
        rightHalf.style.backgroundPosition = `right top`;

        document.body.appendChild(leftHalf);
        document.body.appendChild(rightHalf);

        // Forzar reflujo para asegurar que las transiciones se apliquen
        void leftHalf.offsetWidth;
        void rightHalf.offsetWidth;

        requestAnimationFrame(() => {
            leftHalf.style.transition = "transform 0.5s ease, opacity 0.5s ease";
            rightHalf.style.transition = "transform 0.5s ease, opacity 0.5s ease";

            leftHalf.style.transform = "rotate(-30deg) translateX(-60px) translateY(-20px)";
            rightHalf.style.transform = "rotate(30deg) translateX(60px) translateY(-20px)";
            leftHalf.style.opacity = "0";
            rightHalf.style.opacity = "0";
        });

        setTimeout(() => {
            leftHalf.remove();
            rightHalf.remove();
            cardContainer.innerHTML = "";
            disableOptionButtons(false);
            callback();
        }, 500);
    };

    if (option.canStore) {
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Guardar en mi mano";
        saveBtn.onclick = () => {
            animateAndCleanupToHand(() => {
                hand.push({ cardId, optionText: option.text });
                updateHandIcon();
                cardContainer.innerHTML = `<p>¡Carta guardada en tu mano!</p>`;
                optionsContainer.innerHTML = "";
                updateAfterChoice();
            }, handIcon);
        };
        optionsContainer.appendChild(saveBtn);
    }

    if (option.canDiscard) {
        const discardBtn = document.createElement("button");
        discardBtn.textContent = "Descartar";
        discardBtn.onclick = () => {
            animateAndCleanupDestroy(() => {
                cardContainer.innerHTML = "<p>¡Carta descartada!</p>";
                optionsContainer.innerHTML = "";
                updateAfterChoice();
            });
        };
        optionsContainer.appendChild(discardBtn);
    }
}

function disableOptionButtons(disabled) {
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = disabled);
}

function updateHandIcon() {
    handCountSpan.textContent = hand.length;
}

function updateDrawButton() {
    drawCardBtn.textContent = `Sacar carta (${remainingCards.length}/${totalCards.length})`;
    drawCardBtn.disabled = remainingCards.length === 0;
    if (!drawCardBtn.disabled && drawCardBtn.style.display !== "none") {
        drawCardBtn.style.display = "block";
    }
}

function updateAfterChoice() {
    updateDrawButton();
    handIcon.disabled = false;
    drawCardBtn.style.display = "block";
}

handIcon.addEventListener("click", () => {
    const visible = handContainer.style.display === "block";
    handContainer.style.display = visible ? "none" : "block";
    if (!visible) {
        renderHand();
    }
});

function renderHand() {
    handContainer.innerHTML = "";
    hand.forEach(({ cardId, optionText }) => {
        const img = document.createElement("img");
        img.src = `images/cards/${cardId}-front.jpg`;
        img.onclick = () => openModal(cardId, optionText);
        handContainer.appendChild(img);
    });
}

function openModal(cardId, optionText) {
    modal.style.display = "flex";
    modalCard.classList.remove("flipped");

    const front = document.createElement("div");
    front.className = "card-face card-front";
    const imgFront = document.createElement("img");
    imgFront.src = `images/cards/${cardId}-front.jpg`;
    front.appendChild(imgFront);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const imgBack = document.createElement("img");
    imgBack.src = `images/cards/${cardId}-back.jpg`;
    back.appendChild(imgBack);

    modalCard.innerHTML = "";
    modalCard.appendChild(front);
    modalCard.appendChild(back);

    const options = cardOptionsData[cardId] || [];
    const optionObj = options.find(opt => opt.text === optionText);
    const additionalInfo = optionObj ? optionObj.info : "";

    modalOptionText.innerHTML = `Opción elegida: <strong>${optionText}</strong>`;
    if (additionalInfo) {
        modalOptionText.innerHTML += `<br><em>${additionalInfo}</em>`;
    }

    modalCard.addEventListener("click", () => modalCard.classList.toggle("flipped"));
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("click", (e) => {
    const isClickInsideHand = handContainer.contains(e.target) || handIcon.contains(e.target);
    const isModalVisible = modal.style.display === "flex";

    if (!isClickInsideHand && !isModalVisible) {
        handContainer.style.display = "none";
    }
});
