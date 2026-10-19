console.log("=== app.js v3 С ОТЛАДКОЙ ===");

let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";
console.log("Начальное значение item: '" + item + "'");

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
            console.log("=== КНОПКА " + btn.name + " НАЖАТА ===");
            if(tg.MainButton.isVisible){
                tg.MainButton.hide();
                console.log("MainButton скрыта");
            } else {
                tg.MainButton.setText("Вывести информацию о " + btn.name);
                item = btn.data;
                console.log("Установлено item = '" + item + "'");
                tg.MainButton.show();
                console.log("MainButton показана");
            }
        });
    } else {
        console.error("ОШИБКА: Кнопка " + btn.id + " не найдена!");
    }
});

tg.MainButton.onClick(function(){
    console.log("=== MAIN BUTTON CLICKED ===");
    console.log("Текущее значение item: '" + item + "'");
    
    if (item && item.length > 0) {
        console.log("Отправляем через sendData: '" + item + "'");
        tg.sendData(item);
        console.log("sendData вызван!");
    } else {
        console.error("ОШИБКА: item пустой! Не отправляем.");
        tg.showAlert("Ошибка: выберите породу сначала!");
    }
});

console.log("=== app.js v3 ГОТОВ ===");
