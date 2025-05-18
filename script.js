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

    // Aquí añadimos el evento click para voltear la carta y cargar opciones
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        // Sólo cargar opciones la primera vez que se voltea la carta
        if (!optionsContainer.hasChildNodes()) {
            loadOptions(cardId);
        }
    });

    const front = document.createElement("div");
    front.className = "card-face card-front";
    const imgFront = document.createElement("img");
    imgFront.src = `images/${cardId}-front.jpg`;
    front.appendChild(imgFront);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const imgBack = document.createElement("img");
    imgBack.src = `images/${cardId}-back.jpg`;
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

    if (option.canStore) {
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Guardar en mi mano";
        saveBtn.onclick = () => {
            hand.push({ cardId, optionText: option.text });
            updateHandIcon();
            cardContainer.innerHTML = `<p>¡Carta guardada en tu mano!</p>`;
            optionsContainer.innerHTML = "";
            updateAfterChoice();
        };
        optionsContainer.appendChild(saveBtn);
    }
    if (option.canDiscard) {
        const returnBtn = document.createElement("button");
        returnBtn.textContent = "Devolver al mazo";
        returnBtn.onclick = () => {
            remainingCards.push(cardId);
            cardContainer.innerHTML = "<p>¡Carta devuelta al mazo!</p>";
            optionsContainer.innerHTML = "";
            updateAfterChoice();
        };
        optionsContainer.appendChild(returnBtn);
    }

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
        img.src = `images/${cardId}-front.jpg`;
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
    imgFront.src = `images/${cardId}-front.jpg`;
    front.appendChild(imgFront);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const imgBack = document.createElement("img");
    imgBack.src = `images/${cardId}-back.jpg`;
    back.appendChild(imgBack);

    modalCard.innerHTML = "";
    modalCard.appendChild(front);
    modalCard.appendChild(back);

    // Buscar el texto adicional asociado a la opción elegida
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
