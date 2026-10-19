let tg = window.Telegram.WebApp;
tg.expand();

let item = "";
let sendBtn = document.getElementById("sendBtn");

let buttons = [
    {id: "btn1", name: "Лабрадор", data: "Лабрадор"},
    {id: "btn2", name: "Немецкая овчарка", data: "Немецкая овчарка"},
    {id: "btn3", name: "Хаски", data: "Хаски"},
    {id: "btn4", name: "Мопс", data: "Мопс"},
    {id: "btn5", name: "Бульдог", data: "Бульдог"},
    {id: "btn6", name: "Такса", data: "Такса"},
    {id: "btn7", name: "Пудель", data: "Пудель"},
    {id: "btn8", name: "Чихуахуа", data: "Чихуахуа"}
];

buttons.forEach(function(btn) {
    let button = document.getElementById(btn.id);
    if (button) {
        button.addEventListener("click", function(){
            item = btn.data;
            sendBtn.textContent = "Вывести информацию о " + btn.name;
            sendBtn.style.display = "block";
            console.log("Выбрана порода: " + item);
        });
    }
});

// Обработчик клика на обычную кнопку
sendBtn.addEventListener("click", function(){
    console.log("=== КНОПКА ОТПРАВИТЬ НАЖАТА ===");
    console.log("Отправляем: " + item);
    if (item) {
        tg.sendData(item);
        console.log("Данные отправлены!");
    }
});

// Также пробуем MainButton (на всякий случай)
tg.MainButton.onClick(function(){
    console.log("MainButton clicked");
    if (item) {
        tg.sendData(item);
    }
});
