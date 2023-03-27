import { async } from "regenerator-runtime";
import FavouritesCards from "./favourirtesCardsModel";
import * as view from "./favourirtesCardsView"

export default async function(state){

    // получить список объектов которые в избранном
    const favList = state.favourites.favs;
    const favouridCards = new FavouritesCards(favList);
    await favouridCards.getFavs();

    // Рендерим компонент избранное
    view.renderPage(favouridCards.cards);

    // прослушка клика на иконке в избранное при активном фильтре
    addToFavouritesListener();


    // Функция для работы иконок (сердечек) 
    function addToFavouritesListener(){
        Array.from(document.getElementsByClassName("card__like")).forEach((item)=>{
        item.addEventListener("click", (e)=>{

            e.preventDefault();
            // находим ID объекта по которому был КЛИК
            const currentId = e.target.closest(".card").dataset.id

            // добавляем или убираем элемент в избранное по клику
            state.favourites.toggleFav(currentId);

            // изменяем цвет иконки по клику 
            view.toggleFavIconColor(e.target.closest(".card__like"), state.favourites.isFav(currentId))
            
        })
    });
    }

}

