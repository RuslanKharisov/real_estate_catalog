import favourirtesCards from "../favouritesCards/favourirtesCardsCtrl";

export default function(){
    document.querySelector("#app").innerHTML = "";
    favourirtesCards(state);
}