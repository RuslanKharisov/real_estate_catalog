export default class Favourites {
    constructor (){
        this.favs = [];
        this.readSrorage();
    }

    addFav(id) {
        this.favs.push(id);
        this.saveData();
    }

    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        this.saveData();
    }

    // передаем id, функция возвращает true или false по результатам нахождения в this.favs перданного id.
    isFav(id){
        return this.favs.indexOf(id) !== -1 ? true : false;
    }

    toggleFav(id){
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    saveData(){
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }

    readSrorage(){
        const storage = JSON.parse(localStorage.getItem("favs"));
        if(storage) this.favs = storage;
    }


}