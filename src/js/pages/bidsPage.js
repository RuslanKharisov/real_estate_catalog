import bids from "../bids/bidsctrl";



export default function(state){
    // очищаем страницу
    document.querySelector("#app").innerHTML = "";
    // вызываем компонент
    bids(state);
    
}