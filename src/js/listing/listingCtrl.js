import * as view from "./listingView";

export default function(state){

    // console.log("listing started")

    view.render();

    // рендер карточек
    state.results.forEach(element => {
        view.renderCards(element, state.favourites.isFav(element.id))
    });

    // прослушка клика на иконке в избранное
    addToFavouritesListener();


    state.emitter.subscribe("event:render-listing", () => {
        // console.log("event:render-listing")
        console.log(state.results);
        
        // очистка предыдущего рендера
        view.clearListingContainer()
        
        // отрисовка карточек после применения фильтра
        state.results.forEach(element => {
            view.renderCards(element, state.favourites.isFav(element.id))
        });
        // прослушка клика на иконке в избранное при активном фильтре
        addToFavouritesListener();
    });

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