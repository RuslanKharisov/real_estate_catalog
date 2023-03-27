import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function(state){
    state.singleItem = new SingleItem(state.routeParams);

    // Получение данных с сервера
    await state.singleItem.getItem();

    // Передаем на рендер данные из state.singleItem.result
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // .......... Прослушка событий............

    // Отображение модального окна
    document.querySelector(".button-order").addEventListener("click", ()=>{
        view.showModal();
    })

    // Скрытие модального окна - клик по кнопке Закрыть
    document.querySelector(".modal__close").addEventListener("click", ()=>{
        view.hideModal();
    })

    // Скрытие модального окна - клик за пределами окна
    document.querySelector(".modal-wrapper").addEventListener("click", (e)=>{
        if(e.target.closest(".modal")){
            return null;
        } else {
            view.hideModal();
        }
    });

    // отправка формы
    document.querySelector(".modal__form").addEventListener("submit", async function(e){
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);

        const response = state.singleItem.response;

        if(response.message === "Bid Created"){
            alert("Ваша заявка успешно отправлена");
            view.hideModal();
            view.clearInputFields();
        } else if (response.message === "Bid Not Created") {
            // console.log(response.errors);
            response.errors.forEach(element => {
                alert(element);
            });
        }
    });

    // клик по "Добавить в избранное"

    document.querySelector(".button-favourite").addEventListener("click", ()=>{
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavsButton(state.favourites.isFav(state.singleItem.id));
    })


}

