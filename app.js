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
            if(tg.MainButton.isVisible){
                tg.MainButton.hide();
            } else {
                tg.MainButton.setText("Вывести информацию о " + btn.name);
                item = btn.data;
                tg.MainButton.show();
            }
        });
    }
});

// ИСПРАВЛЕННЫЙ ОБРАБОТЧИК - используем tg.onEvent вместо Telegram.WebApp.onEvent
tg.onEvent("mainButtonClicked", function(){
    console.log("=== MAIN BUTTON CLICKED ===");
    console.log("Отправляем данные: " + item);
    tg.sendData(item);
});
