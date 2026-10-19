
"use strict";

// Telegram Web Apps API
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Соответствие идентификаторов названиям пород
const dogNames = {
    labrador: "Лабрадор",
    shepherd: "Немецкая овчарка",
    husky: "Хаски",
    pug: "Мопс",
    bulldog: "Бульдог",
    dachshund: "Такса",
    poodle: "Пудель",
    chihuahua: "Чихуахуа"
};

let selectedDog = null;

const cards = document.querySelectorAll(".dog-card");
const selectButtons = document.querySelectorAll(".select-button");
const status = document.getElementById("selection-status");
const confirmButton = document.getElementById("confirm-button");

// Показывает выбранную породу
function selectDog(dogId) {
    if (!Object.prototype.hasOwnProperty.call(dogNames, dogId)) {
        console.error("Неизвестный идентификатор породы:", dogId);
        return;
    }

    selectedDog = dogId;

    cards.forEach((card) => {
        const button = card.querySelector(".select-button");
        if (!button) return;

        const isSelected = button.dataset.dog === dogId;

        card.classList.toggle("selected", isSelected);
        button.textContent = isSelected ? "✓ Выбрано" : "Выбрать";
    });

    if (status) {
        status.textContent = `Выбрана порода: ${dogNames[dogId]}`;
    }

    if (confirmButton) {
        confirmButton.disabled = false;
        confirmButton.textContent =
            `Вывести информацию о породе «${dogNames[dogId]}»`;
    }
}

// Обработчики кнопок на карточках
selectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectDog(button.dataset.dog);
    });
});

// Отправляет выбранную породу Telegram-боту
function confirmSelection() {
    // Если интерфейс предназначен для вывода информации о таксе,
    // такса будет выбрана по умолчанию, если пользователь
    // не выбрал другую карточку.
    if (!selectedDog) {
        selectDog("dachshund");
    }

    // sendData работает, когда Web App запущено через
    // специальную Web App-кнопку в клавиатуре Telegram.
    if (!tg || typeof tg.sendData !== "function") {
        if (status) {
            status.textContent =
                "Не удалось подключиться к Telegram. Открой приложение из бота.";
        }
        return;
    }

    if (!tg.initData) {
        if (status) {
            status.textContent =
                "Открой мини-приложение через кнопку в Telegram, чтобы отправить выбор.";
        }
        return;
    }

    try {
        tg.sendData(selectedDog);
        // Telegram закрывает Web App после успешного sendData.
    } catch (error) {
        console.error("Ошибка отправки данных в Telegram:", error);

        if (status) {
            status.textContent =
                "Не удалось отправить выбор. Попробуй открыть приложение заново.";
        }
    }
}

// Основная зелёная кнопка страницы
if (confirmButton) {
    confirmButton.addEventListener("click", confirmSelection);
} else {
    console.error(
        'Не найдена кнопка с id="confirm-button". Проверь index.html.'
    );
}

// Если в интерфейсе используется встроенная главная кнопка Telegram,
// она также подтверждает выбор.
if (tg && tg.MainButton) {
    tg.MainButton.setText("Вывести информацию о породе");
    tg.MainButton.onClick(confirmSelection);
    tg.MainButton.hide();
}

// Поддержка смены темы Telegram
if (tg && typeof tg.onEvent === "function") {
    tg.onEvent("themeChanged", () => {
        document.documentElement.dataset.theme = tg.colorScheme || "light";
    });
}
