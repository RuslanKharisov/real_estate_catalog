export default class FavouritesCards {
    constructor(favsList){
        this.favsList = favsList;
    }

    async getFavs(){
        const ids = this.favsList.toString(); 
        const querystring = `https://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(querystring);
        const data = result.json();
        this.cards = await data;
        
    }
        
}