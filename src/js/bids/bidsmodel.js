export default class Bids {
    constructor(){
      // TODO document why this constructor is empty   

    }


    async getBids(){
        try {
            const queryString = `https://jsproject.webcademy.ru/bids`;
            const result = await fetch(queryString);
            const data = await result.json();
            this.bids = await data;
        } catch (error) {
            alert("error getBids")
            console.log(error);
        }
    }
}