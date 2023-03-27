import singleItem from "../singleItem/singleItemCtrl";

export default function(state){

    // очистка контейнера приложения
    document.querySelector("#app").innerHTML = "";

    // запуск компонента singleItem
    singleItem(state);
}