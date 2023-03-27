import "url-search-params-polyfill"

const elements = {
    complexSelector: document.getElementsByClassName("filter__dropdown"),
    roomQtyCheckbox: document.getElementsByClassName("rooms__checkbox"),
    filterFields: document.getElementsByClassName("range__input"),
    showButton: document.getElementsByClassName("filter__show"),
}

// console.log("элементы" ,elements)

export function render(params) {


// console.log("🚀 ~ file: filterView.js:2 ~ render ~ params:", params)


        let complexList = '';
        params.complexNames.forEach((elem) => {
            complexList += `<option value="${elem}">ЖК ${elem}</option>`; 
        });

        let roomQty = '';
        params.roomValues.forEach((num) => {
            roomQty += `
                <input
                    name="rooms"
                    type="checkbox"
                    id="rooms_${num}"
                    class="rooms__checkbox"
                    value="${num}"
                /><label for="rooms_${num}" class="rooms__btn">${num}</label>`
        });

        // рендер страницы
    const markup = `
    <!-- Filter -->
    <form id="filter-form" method="GET" class="container p-0">
        <div class="heading-1">Выбор квартир:</div>
        <div class="filter">
            <div class="filter__col">
                <div class="filter__label">Выбор проекта:</div>
                <select name="complex" id="" class="filter__dropdown">
                    <option value="all">Все проекты</option>
                    ${complexList}
                </select>
            </div>
            <div class="filter__col rooms">
                <div class="filter__label">Комнат:</div>
                <div class="rooms__wrapper">
                    ${roomQty}                    
                </div>
            </div>
            <div class="filter__col">
                <div class="filter__label">Площадь:</div>
                <div class="range__wrapper">
                    <label class="range">
                        <div for="" class="range__label">от</div>
                        <input
                            name="sqmin"
                            min="0"
                            type="number"
                            class="range__input"
                            placeholder="${params.squareMin}"
                            value = "${params.squareMin}"
                        />
                        <div class="range__value">м2</div>
                    </label>
                    <label class="range">
                        <div for="" class="range__label">до</div>
                        <input
                            name="sqmax"
                            min="0"
                            type="number"
                            class="range__input"
                            placeholder="${params.squareMax}"
                            value = "${params.squareMax}"
                        />
                        <div class="range__value">м2</div>
                    </label>
                </div>
            </div>
            <div class="filter__col">
                <div class="filter__label">Стоимость:</div>
                <div class="range__wrapper">
                    <div class="range">
                        <label for="" class="range__label">от</label>
                        <input
                            type="number"
                            name="pricemin"
                            min="0"
                            class="range__input range__input--price"
                            placeholder="${params.priceMin}"
                            value = "${params.priceMin}"
                        />
                        <div class="range__value">₽</div>
                    </div>
                    <div class="range">
                        <label for="" class="range__label">до</label>
                        <input
                            type="number"
                            name="pricemax"
                            min="0"
                            class="range__input range__input--price"
                            placeholder="${params.priceMax}"
                            value = "${params.priceMax}"
                        />
                        <div class="range__value">₽</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter__buttons">
            <button class="filter__show">Показать объекты</button>
            <button type = "reset" class="filter__reset">Сбросить фильтр</button>
        </div>
    </form>
    <!-- // Filter -->
    `;

    document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}


export function changeButtonText(num){
    const  showBtn = elements.showButton[0];
    let message;
    if (num > 0) {
        message = `Показать ${num} об.`;
    } else {
        message = "Объекты на найдены. Измените условия поиска";
    }    
    showBtn.innerHTML = message;

    if (num === 0){
        showBtn.disabled = true;
    }else {
        showBtn.disabled = false;
    }
}


export function getInput(){
    const searchParams = new URLSearchParams();

    // console.log("complexSelector:", elements.complexSelector[0])
    if( elements.complexSelector.value !== "all" ){
        searchParams.append(
            elements.complexSelector[0].name,
            elements.complexSelector[0].value
            );        
    }

    const roomsValues = [];
    Array.from(elements.roomQtyCheckbox).forEach((checkbox) => {
        if (checkbox.value !== "" && checkbox.checked){
            roomsValues.push(checkbox.value);
        }
    });

    const roomsValuesString = roomsValues.join(',');
    if(roomsValuesString !== ""){
        searchParams.append("rooms", roomsValuesString)
    }


    Array.from(elements.filterFields).forEach((input) => {
        if(input.value !== ""){
            searchParams.append(input.name, input.value)
        }
    });


    const queryString = searchParams.toString();

    if(queryString) {
        return "?" + queryString;
    } else {
        return "";
    }


    console.log("queryString: ", queryString)


}
