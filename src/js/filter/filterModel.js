export default class Filter {
    constructor(){
        this.query = "";
    }

    // метод для получения данных от сервера по апросу 
    async getParams(){
        try {

            const queryString = "https://jsproject.webcademy.ru/itemsinfo";
            const response = await fetch(queryString); 
            const data = await response.json();
            this.params = await data
            
            } catch (error) {
                alert(error);
            }
            
        }

    // метод получения данных с сервера
    async getResults(){
        try {
            const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = await data;
        } catch (error) {
            alert(error);
        }
    }
}