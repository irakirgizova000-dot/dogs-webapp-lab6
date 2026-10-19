console.log("=== app.js ЗАГРУЖЕН v2 ===");

let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";

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
            console.log("=== КНОПКА НАЖАТА: " + btn.name + " ===");
            if(tg.MainButton.isVisible){
                tg.MainButton.hide();
            } else {
                tg.MainButton.setText("Вывести информацию о " + btn.name);
                item = btn.data;
                tg.MainButton.show();
                console.log("MainButton показана. Данные: " + item);
            }
        });
    }
});

// НОВЫЙ СПОСОБ: используем tg.MainButton.onClick()
tg.MainButton.onClick(function(){
    console.log("=== MAIN BUTTON CLICKED (onClick) ===");
    console.log("Отправляем данные: " + item);
    if (item) {
        tg.sendData(item);
        console.log("Данные отправлены!");
    } else {
        console.error("ОШИБКА: item пустой!");
    }
});

console.log("=== app.js v2 ГОТОВ ===");
