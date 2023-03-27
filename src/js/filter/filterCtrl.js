import { async } from 'regenerator-runtime';
import Filter from './filterModel'
import * as view from './filterView'




export default async function(state){

    // Создаем объект класса фильтр если полученный объект пустой!
    if(!state.filter) state.filter = new Filter;

    // вызываем метод .getParams() у созданного объекта
    await state.filter.getParams(); 
    view.render(state.filter.params);


    await state.filter.getResults();
    // Делаем запрос на сервер
    state.results = state.filter.result;
    
    // Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length)


    const form = document.querySelector("#filter-form");

    // form change event
    form.addEventListener("change", async function(e){
        e.preventDefault();
        state.filter.query = view.getInput()
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length); 
    })

    form.addEventListener("reset", async function(){
        state.filter.query = ""
        await state.filter.getResults();
        view.changeButtonText(state.filter.result.length);
    })

    form.addEventListener("submit", function(e){
        e.preventDefault();
        console.log("Show Button pressed")
        state.emitter.emit("event:render-listing", {})
    });
}